import {
  Plus,
  Trash2,
  Globe,
  Code,
  ExternalLink,
  BrainCircuit,
  RefreshCcw,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Loader2,
  ClipboardList
} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import axios from 'axios';
import api from '../configs/api';
import toast from 'react-hot-toast';

const ProgressTracker = () => {
  const [platforms, setPlatforms] = useState([]);
  const [showAddPlatform, setShowAddPlatform] = useState(false);
  const [newPlatform, setNewPlatform] = useState({ name: 'LeetCode', username: '', url: '' });
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState('');
  const { user, token } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const loadPlatforms = async () => {
    try {
      const { data } = await api.get('/api/users/platforms', {
        headers: { Authorization: token }
      });
      setPlatforms(data.platforms);
    } catch (error) {
      toast.error("Failed to load platforms");
    }
  };

  const addPlatform = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/api/users/platforms/add', newPlatform, {
        headers: { Authorization: token }
      });
      setPlatforms(data.platforms);
      setShowAddPlatform(false);
      setNewPlatform({ name: 'LeetCode', username: '', url: '' });
      toast.success("Platform connected!");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add platform");
    }
  };

  const deletePlatform = async (id) => {
    try {
      const { data } = await api.delete(`/api/users/platforms/${id}`, {
        headers: { Authorization: token }
      });
      setPlatforms(data.platforms);
      toast.success("Platform removed");
    } catch (error) {
      toast.error("Failed to remove platform");
    }
  };

  const verifyPlatform = async (platformId) => {
    try {
      const { data } = await api.put(`/api/users/platforms/verify/${platformId}`, {}, {
        headers: { Authorization: token }
      });
      setPlatforms(data.platforms);
      toast.success("Platform status updated");
    } catch (error) {
      toast.error("Verification failed");
    }
  };

  const refreshPlatform = async (platformId) => {
    try {
      const { data } = await api.put(`/api/users/platforms/refresh/${platformId}`, {}, {
        headers: { Authorization: token }
      });
      setPlatforms(data.platforms);
      toast.success("Data refreshed!");
    } catch (error) {
      toast.error("Refresh failed");
    }
  };

  const getSuggestions = async () => {
    setIsAiLoading(true);
    try {
      const { data } = await axios.post('http://localhost:3000/api/users/platforms/ai-analysis', {}, {
        headers: { Authorization: token }
      });
      setAiSuggestions(data.suggestions);
      if (data.message) toast.success(data.message, { duration: 5000 });
    } catch (error) {
      toast.error(`${error?.response?.data?.message || "AI Generation failed"} (Status: ${error?.response?.status || 'Net Error'})`);
    } finally {
      setIsAiLoading(false);
    }
  };

  useEffect(() => {
    if (token) loadPlatforms();
  }, [token]);

  const location = useLocation();
  const tabs = [
    { name: 'My Resumes', path: '/app' },
    { name: 'Progress Tracker', path: '/app/progress' },
    { name: 'ATS Analyzer', path: '/app/ats-analyzer' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Premium Pill Tabs */}
      <div className="flex bg-slate-100/50 p-1.5 rounded-2xl w-fit mb-12 backdrop-blur-md border border-slate-200/50">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <Link
              key={tab.name}
              to={tab.path}
              className={`relative px-6 py-2.5 text-sm font-bold transition-all duration-300 rounded-xl ${isActive ? 'text-white' : 'text-slate-500 hover:text-slate-800'}`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-slate-900 rounded-xl shadow-lg shadow-slate-900/10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{tab.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Progress Tracker</h1>
          <p className="text-slate-500 font-medium">Connect your coding profiles and let AI boost your resume metrics.</p>
        </div>
        <button 
          onClick={() => setShowAddPlatform(true)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Add Platform
        </button>
      </div>

      {/* AI Suggestions Box */}
      {aiSuggestions && (
        <div className="mb-10 p-6 bg-white rounded-2xl border border-orange-100 shadow-xl shadow-orange-500/5 relative overflow-hidden">
           <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-50 rounded-full blur-3xl opacity-50"></div>
           <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary-accent" />
                AI Recruiter Highlights
              </h3>
              <button onClick={() => setAiSuggestions('')} className="text-[10px] font-black text-slate-400 hover:text-slate-900 uppercase tracking-widest">Dismiss</button>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 italic">
                  "Synthesized from {platforms.length} platforms for maximum ATS impact."
                </p>
              </div>
              <div className="md:col-span-2 space-y-2">
                {aiSuggestions.split('\n').filter(s => s.trim()).map((s, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 bg-orange-50/30 rounded-lg border border-transparent hover:border-orange-100 transition-colors">
                    <div className="mt-1.5 size-1 rounded-full bg-primary-accent shrink-0"></div>
                    <p className="text-xs font-bold text-slate-700 leading-tight">{s.replace(/^[-*•\d.]\s*/, '')}</p>
                  </div>
                ))}
              </div>
           </div>
        </div>
      )}

      {/* Platforms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platforms.length > 0 ? (
          platforms.map(p => (
            <div key={p._id} className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-lg hover:border-primary-accent/30 transition-all duration-300">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-orange-50 rounded-xl text-primary-accent">
                    {p.name === 'Other' ? <Globe className="w-5 h-5" /> : <Code className="w-5 h-5" />}
                  </div>
                  <h4 className="font-black text-slate-900">{p.name === 'Other' ? 'External Profile' : p.name}</h4>
                </div>
                <button onClick={() => deletePlatform(p._id)} className="p-2 text-slate-300 hover:text-red-500 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-2 mb-4">
                 {p.status === 'verified' ? (
                   <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md"><CheckCircle2 className="w-3 h-3" />Verified</span>
                 ) : p.status === 'failed' ? (
                   <span className="flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md"><AlertCircle className="w-3 h-3" />Failed</span>
                 ) : (
                   <button onClick={() => verifyPlatform(p._id)} className="text-[10px] font-bold text-slate-400 hover:text-primary-accent border border-slate-200 px-2 py-0.5 rounded-md transition-colors">Verify Now</button>
                 )}
              </div>
              <div className="space-y-3">
                <div className="flex flex-col">
                  <div className="flex items-center justify-between">
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Username</span>
                     <button onClick={() => refreshPlatform(p._id)} className="text-slate-300 hover:text-primary-accent transition-colors"><RefreshCcw className="w-3 h-3" /></button>
                  </div>
                  <span className="text-sm font-bold text-slate-700 truncate">{p.username}</span>
                </div>
                <div className="pt-3 border-t border-slate-50 grid grid-cols-2 gap-2">
                   {Object.entries(p.data || {}).slice(0, 4).map(([key, value]) => (
                     <div key={key} className="flex flex-col">
                       <span className="text-[9px] font-bold text-slate-400 uppercase truncate">{key.replace(/_/g, ' ')}</span>
                       <span className="text-xs font-black text-primary-accent">{typeof value === 'object' ? '...' : value}</span>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-16 text-center bg-white/50 rounded-2xl border-2 border-dashed border-slate-200">
             <p className="text-slate-400 font-medium">No platforms connected yet.</p>
          </div>
        )}

        {platforms.length > 0 && (
          <button 
            onClick={getSuggestions}
            disabled={isAiLoading}
            className="col-span-full mt-4 w-full p-4 bg-slate-900 text-white rounded-xl font-black flex items-center justify-center gap-3 hover:shadow-xl transition-all disabled:opacity-70"
          >
            {isAiLoading ? <Loader2 className="animate-spin w-5 h-5 text-orange-400" /> : <BrainCircuit className="w-5 h-5 text-orange-400" />}
            <span>{isAiLoading ? 'Analyzing...' : 'Generate AI Resume Points'}</span>
          </button>
        )}
      </div>

      {/* Add Platform Modal */}
      {showAddPlatform && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 border border-white animate-in zoom-in-95">
            <h3 className="text-2xl font-black text-slate-900 mb-2">Connect Platform</h3>
            <p className="text-slate-500 mb-6 text-sm">We'll fetch your metrics to enhance your resume.</p>
            <form onSubmit={addPlatform} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Select Platform</label>
                <select 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-accent outline-none"
                  value={newPlatform.name}
                  onChange={(e) => setNewPlatform({...newPlatform, name: e.target.value})}
                >
                  <option value="LeetCode">LeetCode</option>
                  <option value="GitHub">GitHub</option>
                  <option value="Codeforces">Codeforces</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Other">Other Platform</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{newPlatform.name === 'Other' ? 'External Profile URL' : 'Username'}</label>
                <input 
                  type="text"
                  required
                  placeholder={newPlatform.name === 'Other' ? 'https://example.com/profile' : 'e.g. janesmith123'}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-accent outline-none"
                  value={newPlatform.username}
                  onChange={(e) => setNewPlatform({...newPlatform, username: e.target.value})}
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowAddPlatform(false)} className="flex-1 px-6 py-3 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors">Connect</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressTracker;
