const form = document.getElementById("profileForm");
const statusEl = document.getElementById("status");
const resultCard = document.getElementById("resultCard");
const resumeOutput = document.getElementById("resumeOutput");
const atsBox = document.getElementById("atsBox");
const extractSummaryBox = document.getElementById("extractSummaryBox");
const downloadPdfBtn = document.getElementById("downloadPdfBtn");
const editToggleBtn = document.getElementById("editToggleBtn");
const editHint = document.getElementById("editHint");
const themeToggle = document.getElementById("themeToggle");
const themeToggleIcon = document.getElementById("themeToggleIcon");
const themeToggleLabel = document.getElementById("themeToggleLabel");
const keyNoticeEl = document.getElementById("keyNotice");

const THEME_KEY = "resume-theme";
const STUDIO_API_BASE =
  window.location.port === "5173" ? "http://localhost:3000" : "";

let editMode = false;

function clean(value) {
  return (value || "").trim();
}

function isDark() {
  return document.documentElement.classList.contains("dark");
}

function applyTheme(dark) {
  document.documentElement.classList.toggle("dark", dark);
  localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
  if (themeToggleIcon) {
    themeToggleIcon.textContent = dark ? "☀️" : "🌙";
  }
  if (themeToggleLabel) {
    themeToggleLabel.textContent = dark ? "Light" : "Dark";
  }
}

function initTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === "dark") applyTheme(true);
  else if (stored === "light") applyTheme(false);
  else applyTheme(window.matchMedia("(prefers-color-scheme: dark)").matches);
}

function setEditMode(on) {
  editMode = on;
  resumeOutput.contentEditable = on ? "true" : "false";
  resumeOutput.classList.toggle("resume-editing", on);
  editToggleBtn.textContent = on ? "Done editing" : "Edit resume";
  editHint.classList.toggle("hidden", !on);
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function showKeyNotice(message) {
  if (!keyNoticeEl) return;
  if (!message) {
    keyNoticeEl.classList.add("hidden");
    keyNoticeEl.textContent = "";
    return;
  }
  keyNoticeEl.textContent = message;
  keyNoticeEl.classList.remove("hidden");
}

async function loadRuntimeNotice() {
  try {
    const resp = await fetch(`${STUDIO_API_BASE}/api/system/runtime-status`);
    if (!resp.ok) return;
    const data = await resp.json();
    if (data?.prototypeMode) {
      showKeyNotice("Some keys are not present currently. Prototype fallback mode is active.");
    }
  } catch {
    // Silent: form behavior continues with local fallbacks.
  }
}

function renderResume(data) {
  const resume = data.resume || {};
  const ats = data.ats || { score: 0, suggestions: [] };
  const coding = resume.codingProfiles || {};
  const prof = resume.professionalLinks || {};
  const li = prof.linkedin || {};
  const fetched = Array.isArray(data.fetchedData) ? data.fetchedData : [];
  const attempted = fetched.length;
  const successful = fetched.filter((item) => !item?.error);
  const failed = fetched.filter((item) => item?.error);
  const successNames = successful.map((item) => item.source).join(", ");
  const failedNames = failed.map((item) => item.source).join(", ");

  if (attempted > 0) {
    extractSummaryBox.classList.remove("hidden");
    extractSummaryBox.innerHTML = `
      <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
        <strong class="text-slate-900 dark:text-slate-100">Data extracted:</strong>
        <span>${successful.length}/${attempted} links succeeded</span>
        ${successNames ? `<span><strong>Used:</strong> ${escapeHtml(successNames)}</span>` : ""}
        ${failedNames ? `<span><strong>Missed:</strong> ${escapeHtml(failedNames)}</span>` : ""}
      </div>
    `;
  } else {
    extractSummaryBox.classList.add("hidden");
    extractSummaryBox.innerHTML = "";
  }

  atsBox.innerHTML = `
    <h3 class="mb-1 text-base font-semibold text-slate-900 dark:text-white">ATS score: ${ats.score}/100</h3>
    <p class="mb-2 text-sm text-slate-600 dark:text-slate-400">${
      data.usedAI ? "AI-enhanced wording applied." : "Rule-based wording applied."
    }</p>
    ${data.note ? `<p class="mb-2 text-sm italic text-slate-600 dark:text-slate-400">${escapeHtml(data.note)}</p>` : ""}
    <strong class="text-sm text-slate-800 dark:text-slate-200">Suggestions</strong>
    <ul class="mt-1 list-disc space-y-1 pl-5 text-sm text-slate-600 dark:text-slate-400">${
      (ats.suggestions || [])
        .map((s) => `<li>${escapeHtml(s)}</li>`)
        .join("") || "<li>Great baseline. Tailor keywords to each job post.</li>"
    }</ul>
  `;

  const linkedinBlock =
    li.url || li.displayName || li.headline
      ? `
    <section class="resume-section">
      <h3>Professional links</h3>
      <p>
        ${
          li.displayName
            ? `<strong>${escapeHtml(li.displayName)}</strong><br/>`
            : ""
        }
        ${
          li.headline
            ? `<span class="linkedin-headline">${escapeHtml(li.headline)}</span><br/>`
            : ""
        }
        ${
          li.url
            ? `<a href="${escapeHtml(li.url)}" target="_blank" rel="noreferrer">LinkedIn profile</a>`
            : ""
        }
      </p>
    </section>
  `
      : "";

  resumeOutput.innerHTML = `
    <section>
      <h3>Summary</h3>
      <p>${escapeHtml(resume.summary || "No summary generated.")}</p>
    </section>

    <section class="resume-section">
      <h3>Skills</h3>
      <div class="chip-list">
        ${
          (resume.skills || []).length
            ? (resume.skills || []).map((skill) => `<span class="chip">${escapeHtml(skill)}</span>`).join("")
            : "<span class='chip'>No skills extracted</span>"
        }
      </div>
    </section>

    ${linkedinBlock}

    <section class="resume-section">
      <h3>Projects</h3>
      ${
        (resume.projects || []).length
          ? (resume.projects || [])
              .map(
                (project) => `
            <div class="project">
              <strong>${escapeHtml(project.title || "Project")}</strong>
              <p>${escapeHtml(project.description || "")}</p>
              <p><strong>Impact:</strong> ${escapeHtml(project.impact || "N/A")}</p>
              ${
                project.link
                  ? `<a href="${escapeHtml(project.link)}" target="_blank" rel="noreferrer">View project</a>`
                  : ""
              }
            </div>
          `
              )
              .join("")
          : "<p>No projects found from provided data.</p>"
      }
    </section>

    <section class="resume-section">
      <h3>Coding profiles & achievements</h3>
      <ul>
        ${
          coding.github?.username
            ? `<li>GitHub: ${escapeHtml(coding.github.username)} (${coding.github.publicRepos} repos, ${coding.github.followers} followers)</li>`
            : ""
        }
        ${
          coding.leetcode?.username
            ? `<li>LeetCode: ${escapeHtml(coding.leetcode.username)} (${coding.leetcode.solved} solved${
                coding.leetcode.ranking ? `, rank ${coding.leetcode.ranking}` : ""
              })</li>`
            : ""
        }
        ${
          coding.codechef?.username
            ? `<li>CodeChef: ${escapeHtml(coding.codechef.username)}${
                coding.codechef.rating ? ` (rating ${escapeHtml(String(coding.codechef.rating))})` : ""
              }${coding.codechef.stars ? `, ${escapeHtml(String(coding.codechef.stars))}` : ""}</li>`
            : ""
        }
        ${
          coding.hackerrank?.username
            ? `<li>HackerRank: ${escapeHtml(coding.hackerrank.username)}${
                coding.hackerrank.badges?.length ? ` (${coding.hackerrank.badges.length} badges)` : ""
              }</li>`
            : ""
        }
        ${(resume.achievements || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
    </section>
  `;

  setEditMode(false);
  resultCard.classList.remove("hidden");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const payload = {
    linkedin: clean(document.getElementById("linkedin").value),
    github: clean(document.getElementById("github").value),
    leetcode: clean(document.getElementById("leetcode").value),
    codechef: clean(document.getElementById("codechef").value),
    hackerrank: clean(document.getElementById("hackerrank").value),
  };

  if (
    !payload.linkedin &&
    !payload.github &&
    !payload.leetcode &&
    !payload.codechef &&
    !payload.hackerrank
  ) {
    statusEl.textContent = "Enter at least one profile URL (including LinkedIn).";
    return;
  }

  statusEl.textContent = "Fetching profile data and generating resume...";
  resultCard.classList.add("hidden");

  try {
    const resp = await fetch(`${STUDIO_API_BASE}/api/studio/generate-resume`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await resp.json();
    if (!resp.ok) {
      statusEl.textContent = data.error || "Failed to generate resume.";
      return;
    }
    renderResume(data);
    if (data.note && /key|api/i.test(data.note)) {
      showKeyNotice("Some keys are not present currently. Prototype fallback mode is active.");
    }
    statusEl.textContent = `Resume generated at ${new Date(data.generatedAt).toLocaleTimeString()}.`;
  } catch (error) {
    statusEl.textContent = `Error: ${error.message}`;
  }
});

editToggleBtn.addEventListener("click", () => {
  setEditMode(!editMode);
});

downloadPdfBtn.addEventListener("click", () => {
  const target = document.getElementById("resumeOutput");
  const opts = {
    margin: 0.5,
    filename: "generated_resume.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  };
  window.html2pdf().set(opts).from(target).save();
});

themeToggle.addEventListener("click", () => {
  applyTheme(!isDark());
});

initTheme();
loadRuntimeNotice();
