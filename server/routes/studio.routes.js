import express from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';
import OpenAI from 'openai';

const studioRouter = express.Router();

const client = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

function extractUsername(url, type) {
  try {
    const parsed = new URL(url);
    const parts = parsed.pathname.split('/').filter(Boolean);
    if (!parts.length) return '';
    if (type === 'github') return parts[0];
    if (type === 'leetcode') return parts[parts.length - 1];
    if (type === 'codechef') return parts[parts.length - 1];
    if (type === 'hackerrank') return parts[0];
    return '';
  } catch {
    return '';
  }
}

function extractLinkedInUsername(url) {
  try {
    const parsed = new URL(url);
    const parts = parsed.pathname.split('/').filter(Boolean);
    const inIdx = parts.indexOf('in');
    if (inIdx !== -1 && parts[inIdx + 1]) {
      return parts[inIdx + 1].split('?')[0].replace(/\/$/, '');
    }
    return '';
  } catch {
    return '';
  }
}

async function fetchLinkedIn(url) {
  const username = extractLinkedInUsername(url);
  if (!username) {
    return { source: 'LinkedIn', error: 'Invalid LinkedIn URL. Use https://www.linkedin.com/in/your-name/' };
  }
  const normalizedUrl = `https://www.linkedin.com/in/${username}/`;
  try {
    const resp = await axios.get(normalizedUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      timeout: 18000,
      maxRedirects: 5,
      validateStatus: (s) => s >= 200 && s < 400,
    });
    const $ = cheerio.load(resp.data);
    const ogTitle = ($('meta[property="og:title"]').attr('content') || '').trim();
    const ogDescription = ($('meta[property="og:description"]').attr('content') || '').trim();
    const titleFallback = ($('title').text() || '').trim();
    const name = (ogTitle || titleFallback).replace(/\s*\|\s*LinkedIn.*$/i, '').trim() || username;
    const headline = ogDescription || null;
    return {
      source: 'LinkedIn',
      username,
      url: normalizedUrl,
      name,
      headline,
    };
  } catch {
    return {
      source: 'LinkedIn',
      username,
      url: normalizedUrl,
      name: username,
      headline: null,
      error:
        'LinkedIn blocks automated reads for many profiles. Your link will still be included-add GitHub or other profiles for richer data.',
    };
  }
}

async function fetchGitHub(url) {
  const username = extractUsername(url, 'github');
  if (!username) return { source: 'GitHub', error: 'Invalid GitHub URL' };
  try {
    const [userResp, repoResp] = await Promise.all([
      axios.get(`https://api.github.com/users/${username}`),
      axios.get(`https://api.github.com/users/${username}/repos`, {
        params: { sort: 'updated', per_page: 6 },
      }),
    ]);
    const user = userResp.data;
    const repos = repoResp.data || [];
    return {
      source: 'GitHub',
      username,
      bio: user.bio || '',
      followers: user.followers || 0,
      publicRepos: user.public_repos || 0,
      skills: [...new Set(repos.map((r) => r.language).filter(Boolean))],
      projects: repos.map((r) => ({
        name: r.name,
        description: r.description || '',
        stars: r.stargazers_count || 0,
        language: r.language || '',
        url: r.html_url,
      })),
    };
  } catch {
    return { source: 'GitHub', username, error: 'Unable to fetch GitHub data.' };
  }
}

async function fetchLeetCode(url) {
  const username = extractUsername(url, 'leetcode');
  if (!username) return { source: 'LeetCode', error: 'Invalid LeetCode URL' };
  const query = `
    query userPublicProfile($username: String!) {
      matchedUser(username: $username) {
        username
        profile {
          ranking
          skillTags
        }
        submitStats: submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
    }
  `;
  try {
    const resp = await axios.post(
      'https://leetcode.com/graphql',
      { query, variables: { username } },
      { headers: { 'Content-Type': 'application/json' } }
    );
    const user = resp.data?.data?.matchedUser;
    if (!user) {
      return { source: 'LeetCode', username, error: 'LeetCode profile not found.' };
    }
    const solvedStats = user.submitStats?.acSubmissionNum || [];
    const solvedMap = solvedStats.reduce((acc, item) => {
      acc[item.difficulty] = item.count;
      return acc;
    }, {});
    return {
      source: 'LeetCode',
      username,
      ranking: user.profile?.ranking || null,
      skills: user.profile?.skillTags || [],
      solved: {
        all: solvedMap.All || 0,
      },
    };
  } catch {
    return { source: 'LeetCode', username, error: 'Unable to fetch LeetCode data.' };
  }
}

async function fetchCodeChef(url) {
  const username = extractUsername(url, 'codechef');
  if (!username) return { source: 'CodeChef', error: 'Invalid CodeChef URL' };
  try {
    const resp = await axios.get(`https://www.codechef.com/users/${username}`);
    const $ = cheerio.load(resp.data);
    const ratingText = $('.rating-number').first().text().trim();
    const starsText = $('.rating-star').first().text().trim();
    return {
      source: 'CodeChef',
      username,
      rating: ratingText || null,
      stars: starsText || null,
    };
  } catch {
    return { source: 'CodeChef', username, error: 'Unable to fetch CodeChef data.' };
  }
}

async function fetchHackerRank(url) {
  const username = extractUsername(url, 'hackerrank');
  if (!username) return { source: 'HackerRank', error: 'Invalid HackerRank URL' };
  try {
    const resp = await axios.get(url);
    const $ = cheerio.load(resp.data);
    const badgeTitles = $('.hacker-badge .badge-title')
      .map((_, el) => $(el).text().trim())
      .get()
      .filter(Boolean);
    return {
      source: 'HackerRank',
      username,
      badges: badgeTitles,
    };
  } catch {
    return { source: 'HackerRank', username, error: 'Unable to fetch HackerRank data.' };
  }
}

function uniqStrings(items) {
  const seen = new Set();
  const out = [];
  for (const item of items || []) {
    const value = String(item || '').trim();
    if (!value) continue;
    const key = value.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(value);
  }
  return out;
}

function buildBaseResume(combined) {
  const github = combined.find((d) => d.source === 'GitHub') || {};
  const leetcode = combined.find((d) => d.source === 'LeetCode') || {};
  const codechef = combined.find((d) => d.source === 'CodeChef') || {};
  const hackerrank = combined.find((d) => d.source === 'HackerRank') || {};
  const linkedin = combined.find((d) => d.source === 'LinkedIn') || {};

  const skills = uniqStrings([
    ...(github.skills || []),
    ...(leetcode.skills || []),
    ...(hackerrank.badges || []).map((b) => `${b} (HackerRank)`),
  ]);

  const projects = (github.projects || [])
    .slice(0, 4)
    .map((p) => ({
      title: p.name,
      description: p.description || `Built and maintained ${p.name}.`,
      impact: `${p.stars || 0} GitHub stars`,
      link: p.url,
    }));

  const summary = github.bio
    ? `${github.bio} Software developer focused on building reliable applications.`
    : 'Software developer focused on building reliable applications.';

  return {
    summary,
    skills,
    projects,
    professionalLinks: {
      linkedin: {
        url: linkedin.url || (linkedin.username ? `https://www.linkedin.com/in/${linkedin.username}/` : ''),
        displayName: linkedin.name || linkedin.username || '',
        headline: linkedin.headline || '',
      },
    },
    codingProfiles: {
      github: {
        username: github.username || '',
        followers: github.followers || 0,
        publicRepos: github.publicRepos || 0,
      },
      leetcode: {
        username: leetcode.username || '',
        solved: leetcode.solved?.all || 0,
        ranking: leetcode.ranking || null,
      },
      codechef: {
        username: codechef.username || '',
        rating: codechef.rating || null,
        stars: codechef.stars || null,
      },
      hackerrank: {
        username: hackerrank.username || '',
        badges: hackerrank.badges || [],
      },
    },
    achievements: [],
  };
}

function atsScore(resume) {
  let score = 45;
  const suggestions = [];
  if (resume.summary && resume.summary.length > 100) score += 12;
  else suggestions.push('Expand summary to highlight domain, impact, and goals.');
  if ((resume.skills || []).length >= 8) score += 16;
  else suggestions.push('Add more relevant technical skills and tools.');
  if ((resume.projects || []).length >= 3) score += 12;
  else suggestions.push('Include at least 3 projects with measurable outcomes.');
  score = Math.max(0, Math.min(100, score));
  return { score, suggestions: suggestions.slice(0, 4) };
}

async function improveResumeWithAI(baseResume) {
  if (!client) {
    return {
      resume: baseResume,
      usedAI: false,
      note: 'OPENAI_API_KEY not configured. Showing rule-based resume output.',
    };
  }
  try {
    const completion = await client.responses.create({
      model: 'gpt-4.1-mini',
      input: `Improve this resume JSON for ATS. Return valid JSON only:\n${JSON.stringify(baseResume)}`,
      temperature: 0.3,
    });
    const text = completion.output_text || '';
    const cleaned = text.replace(/^```json/i, '').replace(/```$/i, '').trim();
    const parsed = JSON.parse(cleaned);
    return { resume: parsed, usedAI: true };
  } catch {
    return {
      resume: baseResume,
      usedAI: false,
      note: 'AI enhancement failed. Showing base generated resume.',
    };
  }
}

studioRouter.post('/generate-resume', async (req, res) => {
  const { github, leetcode, codechef, hackerrank, linkedin } = req.body || {};
  if (!github && !leetcode && !codechef && !hackerrank && !linkedin) {
    return res.status(400).json({ error: 'Please provide at least one profile link.' });
  }
  try {
    const tasks = [];
    if (github) tasks.push(fetchGitHub(github));
    if (leetcode) tasks.push(fetchLeetCode(leetcode));
    if (codechef) tasks.push(fetchCodeChef(codechef));
    if (hackerrank) tasks.push(fetchHackerRank(hackerrank));
    if (linkedin) tasks.push(fetchLinkedIn(linkedin));

    const fetchedData = await Promise.all(tasks);
    const baseResume = buildBaseResume(fetchedData);
    const improved = await improveResumeWithAI(baseResume);
    const ats = atsScore(improved.resume);

    res.json({
      fetchedData,
      resume: improved.resume,
      ats,
      usedAI: improved.usedAI,
      note: improved.note || null,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to generate resume.',
      details: error.message,
    });
  }
});

export default studioRouter;
