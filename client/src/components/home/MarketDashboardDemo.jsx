import React, { useEffect, useState } from 'react';
import api from '../../configs/api';

const fallbackData = {
  roleDemand: [
    { role: 'Frontend Developer', openings: 1200, growth: '+16%' },
    { role: 'Backend Developer', openings: 900, growth: '+13%' },
    { role: 'Data Analyst', openings: 700, growth: '+19%' },
    { role: 'AI/ML Intern', openings: 500, growth: '+24%' }
  ],
  topSkills: ['React', 'Node.js', 'SQL', 'Python', 'AWS', 'Docker'],
  avgCtcLpa: {
    fresher: 5.4,
    oneToThreeYears: 9.1,
    threePlusYears: 15.7
  }
};

const MarketDashboardDemo = () => {
  const [data, setData] = useState(fallbackData);
  const [usingFallback, setUsingFallback] = useState(true);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const { data: response } = await api.get('/api/system/market-demo');
        if (!mounted || !response) return;
        setData(response);
        setUsingFallback(false);
      } catch {
        if (!mounted) return;
        setData(fallbackData);
        setUsingFallback(true);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-10">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-xl md:text-2xl font-bold text-slate-900">Market Job Analysis (Demo)</h3>
          {usingFallback && (
            <span className="text-xs px-3 py-1 rounded-full bg-orange-100 text-orange-700">
              Prototype data mode
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs text-slate-500">Avg CTC (Fresher)</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{data.avgCtcLpa.fresher} LPA</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs text-slate-500">Avg CTC (1-3 Years)</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{data.avgCtcLpa.oneToThreeYears} LPA</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs text-slate-500">Avg CTC (3+ Years)</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{data.avgCtcLpa.threePlusYears} LPA</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <p className="font-semibold text-slate-800 mb-3">Top Hiring Roles</p>
            <div className="space-y-2">
              {data.roleDemand.map((item) => (
                <div key={item.role} className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2">
                  <span className="text-sm text-slate-700">{item.role}</span>
                  <span className="text-sm font-semibold text-slate-900">{item.openings}</span>
                  <span className="text-xs text-emerald-600">{item.growth}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="font-semibold text-slate-800 mb-3">Most Requested Skills</p>
            <div className="flex flex-wrap gap-2">
              {data.topSkills.map((skill) => (
                <span key={skill} className="text-sm px-3 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-100">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketDashboardDemo;
