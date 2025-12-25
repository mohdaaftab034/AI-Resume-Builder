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
  Sparkles
} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../configs/api';
import toast from 'react-hot-toast';
import pdfToText from 'react-pdftotext'

const Dashboard = () => {

  const { user, token } = useSelector(state => state.auth);
  const navigate = useNavigate();

  // Vibrant gradients for the document previews
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

  // Determine greeting based on time
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  const loadAllResumes = async () => {
    setIsPageLoading(true);
    try {
      // Simulate slight delay for animation smoothness
      // await new Promise(r => setTimeout(r, 800)); 
      const { data } = await api.get('/api/users/resumes', {
        headers: { Authorization: token }
      })
      setAllResumes(data.resumes)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsPageLoading(false);
    }
  }

  const createResume = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await api.post('/api/resumes/create', { title }, {
        headers: { Authorization: token }
      })
      setAllResumes([...allResumes, data.resume])
      setTitle('')
      setShowCreateResume(false)
      navigate(`/app/builder/${data.resume._id}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const uploadResume = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const resumeText = await pdfToText(resume);
      const { data } = await api.post('/api/ai/upload-resume', { resumeText, title }, {
        headers: { Authorization: token }
      })
      setTitle('')
      setResume(null)
      setShowUploadResume(false)
      navigate(`/app/builder/${data.resumeId}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const editTitle = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await api.put(`/api/resumes/update`, { resumeId: editResumeId, resumeData: { title } }, { headers: { Authorization: token } })
      setAllResumes(allResumes.map(resume => resume._id === editResumeId ? { ...resume, title } : resume))
      setTitle('')
      setEditResumeId("")
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const deleteResume = async (resumeId, e) => {
    e.stopPropagation();
    try {
      if (window.confirm('Are you sure you want to delete this resume?')) {
        const { data } = await api.delete(`/api/resumes/delete/${resumeId}`, {
          headers: { Authorization: token }
        })
        setAllResumes(allResumes.filter(resume => resume._id !== resumeId));
        toast.success(data.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  }

  useEffect(() => {
    loadAllResumes();
  }, [])

  const filteredResumes = allResumes.filter(r => r.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-10 font-sans selection:bg-green-100 selection:text-green-800">

      {/* Dynamic Background */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-slate-50">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-[500px] w-[500px] rounded-full bg-gradient-to-b from-green-50 to-transparent blur-3xl opacity-60"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-[500px] w-[500px] rounded-full bg-gradient-to-t from-blue-50 to-transparent blur-3xl opacity-60"></div>
      </div>

      <div className="max-w-7xl mx-auto space-y-10">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 animate-in fade-in slide-in-from-top-4 duration-700">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              {greeting}, <span className="text-green-600">{user?.name || 'Creator'}</span>
            </h1>
            <p className="text-slate-500 mt-2">Manage your resumes and create new opportunities.</p>
          </div>

          {/* Search Bar */}
          <div className="relative group w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400 group-focus-within:text-green-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search resumes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all shadow-sm group-hover:shadow-md"
            />
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => setShowCreateResume(true)}
            className="group relative overflow-hidden bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-green-300 transition-all duration-300 text-left"
          >
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-green-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10 flex items-start justify-between">
              <div>
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Plus className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Create New Resume</h3>
                <p className="text-slate-500 mt-1 text-sm">Start from scratch with our AI builder.</p>
              </div>
              <div className="bg-slate-50 p-2 rounded-full opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">
                <ArrowRightIcon className="w-5 h-5 text-slate-400" />
              </div>
            </div>
          </button>

          <button
            onClick={() => setShowUploadResume(true)}
            className="group relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-slate-900/20 transition-all duration-300 text-left"
          >
            <div className="absolute top-0 right-0 w-full h-full bg-white/5 opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/10 text-white rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm group-hover:scale-110 transition-transform">
                <UploadCloud className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Upload Existing PDF</h3>
              <p className="text-slate-300 mt-1 text-sm">Let AI analyze and format your current resume.</p>
            </div>
          </button>
        </div>

        {/* Resume Grid */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <FileText className="w-5 h-5 text-green-600" />
            My Documents
            <span className="text-sm font-normal text-slate-400 ml-2 bg-slate-100 px-2 py-0.5 rounded-full">{filteredResumes.length}</span>
          </h2>

          {isPageLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-64 bg-white rounded-2xl animate-pulse border border-slate-100"></div>
              ))}
            </div>
          ) : filteredResumes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
              {filteredResumes.map((res, index) => {
                const gradient = gradients[index % gradients.length];
                return (
                  <div
                    key={res._id}
                    onClick={() => navigate(`/app/builder/${res._id}`)}
                    className="group relative bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-64"
                  >
                    {/* Document Preview (Top) */}
                    <div className={`h-32 bg-gradient-to-br ${gradient} opacity-10 group-hover:opacity-20 transition-opacity relative flex items-center justify-center overflow-hidden`}>
                      {/* Decorative patterns */}
                      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>
                      <FileText className={`w-12 h-12 text-slate-400/50 absolute -bottom-4 -right-4 rotate-[-15deg] group-hover:scale-125 transition-transform`} />

                      {/* Center Icon */}
                      <div className="bg-white p-3 rounded-xl shadow-sm z-10 group-hover:scale-110 transition-transform duration-300">
                        <FileText className="w-8 h-8 text-slate-700" />
                      </div>
                    </div>

                    {/* Content (Bottom) */}
                    <div className="p-5 flex flex-col justify-between flex-1">
                      <div>
                        <h3 className="font-bold text-slate-800 truncate pr-6 group-hover:text-green-600 transition-colors">{res.title}</h3>
                        <p className="text-xs text-slate-400 mt-1">Edited {new Date(res.updatedAt).toLocaleDateString()}</p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-end gap-2 mt-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <button
                          onClick={(e) => { e.stopPropagation(); setEditResumeId(res._id); setTitle(res.title); }}
                          className="p-2 text-slate-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Rename"
                        >
                          <PenLine className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => deleteResume(res._id, e)}
                          className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-dashed border-slate-300">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-900">No resumes found</h3>
              <p className="text-slate-500 max-w-sm mt-2">You haven't created any resumes yet. Start by creating a new one or uploading an existing PDF.</p>
            </div>
          )}
        </div>

      </div>

      {/* --- MODALS --- */}

      {/* Create Resume Modal */}
      {showCreateResume && (
        <Modal onClose={() => setShowCreateResume(false)}>
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className='text-2xl font-bold text-slate-900'>Name your Resume</h2>
            <p className="text-slate-500 text-sm mt-1">Give your new resume a memorable name.</p>
          </div>

          <form onSubmit={createResume} className="space-y-4">
            <input
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              placeholder='e.g. Full Stack Developer 2024'
              className='w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all font-medium text-slate-900 placeholder:text-slate-400'
              required
            />
            <button
              disabled={isLoading}
              className='w-full py-3.5 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 active:scale-95 transition-all shadow-lg shadow-green-600/20 flex items-center justify-center gap-2'
            >
              {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Create Resume'}
            </button>
          </form>
        </Modal>
      )}

      {/* Upload Resume Modal */}
      {showUploadResume && (
        <Modal onClose={() => { setShowUploadResume(false); setResume(null); setTitle('') }}>
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
              <FileUp className="w-6 h-6" />
            </div>
            <h2 className='text-2xl font-bold text-slate-900'>Upload PDF</h2>
            <p className="text-slate-500 text-sm mt-1">We'll extract the data for you.</p>
          </div>

          <form onSubmit={uploadResume} className="space-y-4">
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              placeholder='Resume Name'
              className='w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-900 placeholder:text-slate-400'
              required
            />

            <label className={`block w-full border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${resume ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50'}`}>
              <input type="file" accept='.pdf' hidden onChange={(e) => setResume(e.target.files[0])} />
              {resume ? (
                <div className="flex items-center justify-center gap-2 text-blue-700 font-medium">
                  <FileText className="w-5 h-5" />
                  {resume.name}
                </div>
              ) : (
                <div className="text-slate-500">
                  <UploadCloud className="w-10 h-10 mx-auto mb-2 text-slate-400" />
                  <p className="font-medium">Click to upload</p>
                  <p className="text-xs mt-1 text-slate-400">PDF files only (Max 5MB)</p>
                </div>
              )}
            </label>

            <button
              disabled={isLoading || !resume}
              className='w-full py-3.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 active:scale-95 transition-all shadow-lg shadow-slate-900/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed'
            >
              {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Process & Create'}
            </button>
          </form>
        </Modal>
      )}

      {/* Edit Title Modal */}
      {editResumeId && (
        <Modal onClose={() => { setEditResumeId(''); setTitle('') }}>
          <h2 className='text-xl font-bold text-slate-900 mb-6'>Rename Resume</h2>
          <form onSubmit={editTitle} className="space-y-4">
            <input
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              className='w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all font-medium'
              required
            />
            <button
              disabled={isLoading}
              className='w-full py-3.5 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg'
            >
              {isLoading ? <Loader2 className="animate-spin w-5 h-5 mx-auto" /> : 'Save Changes'}
            </button>
          </form>
        </Modal>
      )}

      <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
          * { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}</style>

    </div>
  )
}

// Reusable Modal Component with Backdrop Blur
const Modal = ({ children, onClose }) => (
  <div className='fixed inset-0 z-50 flex items-center justify-center p-4' style={{ animation: 'fadeIn 0.2s ease-out' }}>
    <div className='absolute inset-0 bg-slate-900/60 backdrop-blur-sm' onClick={onClose}></div>
    <div className='relative bg-white w-full max-w-md p-6 md:p-8 rounded-3xl shadow-2xl transform transition-all' style={{ animation: 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}>
      <button onClick={onClose} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all">
        <X className="w-5 h-5" />
      </button>
      {children}
    </div>
    <style>{`
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes scaleIn { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        `}</style>
  </div>
)

// Helper Icon
const ArrowRightIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
)

export default Dashboard