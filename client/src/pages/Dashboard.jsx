import {
  FileText,
  Loader2,
  MoreVertical,
  PenLine,
  Plus,
  Search,
  Trash2,
  UploadCloud,
  X,
  FileUp,
  Sparkles,
  ClipboardList
} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import api from '../configs/api';
import toast from 'react-hot-toast';
import pdfToText from 'react-pdftotext'

const Dashboard = () => {
  const { user, token } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  const gradients = [
    'from-pink-500 to-rose-500',
    'from-blue-500 to-cyan-500',
    'from-emerald-500 to-teal-500',
    'from-violet-500 to-purple-500',
    'from-amber-500 to-orange-500'
  ];

  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState('');
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [greeting, setGreeting] = useState('Welcome');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  const loadAllResumes = async () => {
    setIsPageLoading(true);
    try {
      const { data } = await api.get('/api/users/resumes', {
        headers: { Authorization: token }
      });
      setAllResumes(data.resumes);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load resumes");
    } finally {
      setIsPageLoading(false);
    }
  };

  const createResume = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await api.post('/api/resumes/create', { title }, {
        headers: { Authorization: token }
      });
      setAllResumes([...allResumes, data.resume]);
      setTitle('');
      setShowCreateResume(false);
      navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create resume");
    } finally {
      setIsLoading(false);
    }
  };

  const uploadResume = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const resumeText = await pdfToText(resume);
      const { data } = await api.post('/api/ai/upload-resume', { resumeText, title }, {
        headers: { Authorization: token }
      });
      navigate(`/app/builder/${data.resumeId}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to upload resume");
    } finally {
      setIsLoading(false);
    }
  };

  const editTitle = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.put(`/api/resumes/update`, { resumeId: editResumeId, resumeData: { title } }, { headers: { Authorization: token } });
      setAllResumes(allResumes.map(r => r._id === editResumeId ? { ...r, title } : r));
      setTitle('');
      setEditResumeId("");
      toast.success("Title updated!");
    } catch (error) {
      toast.error("Failed to update title");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteResume = async (resumeId, e) => {
    e.stopPropagation();
    try {
      if (window.confirm('Delete this resume forever?')) {
        await api.delete(`/api/resumes/delete/${resumeId}`, {
          headers: { Authorization: token }
        });
        setAllResumes(allResumes.filter(r => r._id !== resumeId));
        toast.success("Resume deleted");
      }
    } catch (error) {
      toast.error("Deletion failed");
    }
  };

  useEffect(() => {
    if (token) loadAllResumes();
  }, [token]);

  const filteredResumes = allResumes.filter(r => r.title.toLowerCase().includes(searchQuery.toLowerCase()));

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
          const isActive = location.pathname === tab.path || (tab.path === '/app' && location.pathname === '/app/');
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
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            {greeting}, <span className="text-primary-accent">{user?.name || 'Creator'}</span>
          </h1>
          <p className="text-slate-500 font-medium italic">Craft your story, one resume at a time.</p>
        </div>

        <div className="relative group w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400 group-focus-within:text-primary-accent transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search resumes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-accent outline-none shadow-sm transition-all"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <button onClick={() => setShowCreateResume(true)} className="flex items-center gap-4 p-6 bg-white border border-slate-100 rounded-2xl shadow-lg hover:border-primary-accent/30 transition-all text-left">
          <div className="p-3 bg-orange-50 text-primary-accent rounded-xl"><Plus className="w-6 h-6" /></div>
          <div><h3 className="font-black text-slate-900">Create New</h3><p className="text-xs text-slate-500 font-medium">Build from scratch with AI</p></div>
        </button>

        <button onClick={() => setShowUploadResume(true)} className="flex items-center gap-4 p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-lg hover:shadow-slate-900/20 transition-all text-left">
          <div className="p-3 bg-white/10 text-white rounded-xl"><UploadCloud className="w-6 h-6" /></div>
          <div><h3 className="font-black text-white">Import PDF</h3><p className="text-xs text-slate-400 font-medium">Auto-fill from existing resume</p></div>
        </button>

        <button onClick={() => navigate('/app/ats-analyzer')} className="flex items-center gap-4 p-6 bg-white border border-slate-100 rounded-2xl shadow-lg hover:border-emerald-500/30 transition-all text-left">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><ClipboardList className="w-6 h-6" /></div>
          <div><h3 className="font-black text-slate-900">ATS Analyzer</h3><p className="text-xs text-slate-500 font-medium">Check job compatibility</p></div>
        </button>
      </div>

      {/* Documents List */}
      <div className="space-y-6">
          <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
            <FileText className="w-6 h-6 text-primary-accent" />
            Recent Documents
          </h2>

          {isPageLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-pulse">
              {[1, 2, 3, 4].map(i => <div key={i} className="h-64 bg-slate-100 rounded-2xl"></div>)}
            </div>
          ) : filteredResumes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredResumes.map((res, index) => {
                const gradient = gradients[index % gradients.length];
                return (
                  <div key={res._id} onClick={() => navigate(`/app/builder/${res._id}`)} className="group relative bg-white rounded-2xl border border-slate-100 hover:border-primary-accent/30 hover:shadow-2xl transition-all h-72 flex flex-col overflow-hidden cursor-pointer">
                    <div className="h-36 bg-slate-50 relative flex items-center justify-center">
                       <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${gradient}`}></div>
                       <FileText className="w-10 h-10 text-slate-200" />
                       <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 bg-primary-accent rounded-lg text-white"><PenLine className="size-4" /></div>
                    </div>
                    <div className="p-5 flex flex-col justify-between flex-1">
                       <div>
                         <h3 className="font-black text-slate-800 truncate">{res.title}</h3>
                         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Modified {new Date(res.updatedAt).toLocaleDateString()}</p>
                       </div>
                       <div className="flex justify-end gap-2">
                         <button onClick={(e) => { e.stopPropagation(); setEditResumeId(res._id); setTitle(res.title); }} className="p-2 text-slate-300 hover:text-primary-accent transition-colors"><PenLine className="w-4 h-4" /></button>
                         <button onClick={(e) => deleteResume(res._id, e)} className="p-2 text-slate-300 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                       </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="py-20 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
               <FileText className="w-12 h-12 text-slate-200 mx-auto mb-4" />
               <h3 className="font-black text-slate-900">No resumes yet</h3>
               <p className="text-slate-400 text-sm italic mt-1">Start your career journey with a single page.</p>
            </div>
          )}
      </div>

      {/* --- MODALS --- */}
      {showCreateResume && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
           <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl animate-in zoom-in-95">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-slate-900">Create Resume</h2>
                <button onClick={() => setShowCreateResume(false)} className="p-2 hover:bg-slate-100 rounded-full"><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={createResume} className="space-y-4">
                <input required type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Software Engineer 2024" className="w-full px-5 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-accent" />
                <button disabled={isLoading} className="w-full py-4 bg-primary-accent text-white rounded-xl font-black flex items-center justify-center gap-2">
                  {isLoading && <Loader2 className="animate-spin w-5 h-5" />} Create Resume
                </button>
              </form>
           </div>
        </div>
      )}

      {showUploadResume && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
           <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl animate-in zoom-in-95">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-slate-900">Import PDF</h2>
                <button onClick={() => setShowUploadResume(false)} className="p-2 hover:bg-slate-100 rounded-full"><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={uploadResume} className="space-y-4">
                <input required type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Document Title" className="w-full px-5 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-accent" />
                <input required type="file" accept=".pdf" onChange={(e) => setResume(e.target.files[0])} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-orange-50 file:text-primary-accent" />
                <button disabled={isLoading || !resume} className="w-full py-4 bg-slate-900 text-white rounded-xl font-black flex items-center justify-center gap-2">
                  {isLoading && <Loader2 className="animate-spin w-5 h-5" />} Import & Polish
                </button>
              </form>
           </div>
        </div>
      )}

      {editResumeId && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
           <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl animate-in zoom-in-95">
              <h2 className="text-2xl font-black text-slate-900 mb-6">Rename Document</h2>
              <form onSubmit={editTitle} className="space-y-4">
                <input required autoFocus type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-5 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-accent" />
                <div className="flex gap-4">
                  <button type="button" onClick={() => setEditResumeId('')} className="flex-1 py-3 border border-slate-200 rounded-xl font-bold">Cancel</button>
                  <button type="submit" className="flex-1 py-3 bg-primary-accent text-white rounded-xl font-bold">Save</button>
                </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;