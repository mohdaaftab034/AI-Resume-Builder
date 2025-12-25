import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, Briefcase, ChevronLeft, ChevronRight, Download, Eye,
  EyeOff, FileText, FolderOpen, GraduationCap, LayoutTemplate,
  Palette, Share2, Sparkles, User, Save, PenTool, Monitor
} from 'lucide-react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import api from '../configs/api';

// Components
import PersonalInfoForm from '../components/PersonalInfoForm';
import ProfessionalSummaryForm from '../components/ProfessionalSummaryForm';
import ExperienceForm from '../components/ExperienceForm';
import EducationForm from '../components/EducationForm';
import ProjectForm from '../components/ProjectForm';
import SkillsForm from '../components/SkillsForm';
import ResumePreview from '../components/ResumePreview';
import TemplateSelector from '../components/TemplateSelector';
import ColorPicker from '../components/ColorPicker';

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const { token } = useSelector(state => state.auth);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('editor'); // 'editor' | 'preview'

  const [resumeData, setResumeData] = useState({
    _id: '',
    title: '',
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: '#3B82F6',
    public: false
  });

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  // Sections Configuration
  const sections = [
    { id: 'personal', name: "Personal", icon: User, desc: "Basic info" },
    { id: 'summary', name: "Summary", icon: FileText, desc: "Profile overview" },
    { id: 'experience', name: "Experience", icon: Briefcase, desc: "Work history" },
    { id: 'education', name: "Education", icon: GraduationCap, desc: "Academics" },
    { id: 'projects', name: "Projects", icon: FolderOpen, desc: "Key works" },
    { id: 'skills', name: "Skills", icon: Sparkles, desc: "Abilities" },
  ];

  const activeSection = sections[activeSectionIndex];

  useEffect(() => {
    loadExistingResume();
  }, []);

  const loadExistingResume = async () => {
    try {
      const { data } = await api.get(`/api/resumes/get/${resumeId}`, {
        headers: { Authorization: token }
      });
      if (data) {
        setResumeData(data);
        document.title = data.title || "Resume Builder";
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      let updatedResumeData = structuredClone(resumeData);
      if (typeof resumeData.personal_info.image === 'object') {
        delete updatedResumeData.personal_info.image;
      }

      const formData = new FormData();
      formData.append('resumeId', resumeId);
      formData.append('resumeData', JSON.stringify(updatedResumeData));
      removeBackground && formData.append('removeBackground', "yes");

      if (typeof resumeData.personal_info.image === 'object') {
        formData.append('image', resumeData.personal_info.image);
      }

      const { data } = await api.put('/api/resumes/update', formData, {
        headers: { Authorization: token }
      });

      setResumeData(data.resume);
      toast.success("Resume saved successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save");
    } finally {
      setIsSaving(false);
    }
  };

  const changeResumeVisibility = async () => {
    try {
      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append("resumeData", JSON.stringify({ public: !resumeData.public }));

      await api.put('/api/resumes/update', formData, {
        headers: { Authorization: token }
      });

      setResumeData({ ...resumeData, public: !resumeData.public });
      toast.success(`Resume is now ${!resumeData.public ? 'Public' : 'Private'}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleShare = () => {
    const frontendUrl = window.location.origin;
    const resumeUrl = `${frontendUrl}/view/${resumeId}`;
    if (navigator.share) {
      navigator.share({ url: resumeUrl, text: "Check out my resume!" });
    } else {
      navigator.clipboard.writeText(resumeUrl);
      toast.success("Link copied to clipboard");
    }
  };

  // --- Render Helpers ---
  const renderForm = () => {
    switch (activeSection.id) {
      case 'personal': return <PersonalInfoForm data={resumeData.personal_info} onChange={(d) => setResumeData(p => ({ ...p, personal_info: d }))} removeBackground={removeBackground} setRemoveBackground={setRemoveBackground} />;
      case 'summary': return <ProfessionalSummaryForm data={resumeData.professional_summary} onChange={(d) => setResumeData(p => ({ ...p, professional_summary: d }))} setResumeData={setResumeData} />;
      case 'experience': return <ExperienceForm data={resumeData.experience} onChange={(d) => setResumeData(p => ({ ...p, experience: d }))} />;
      case 'education': return <EducationForm data={resumeData.education} onChange={(d) => setResumeData(p => ({ ...p, education: d }))} />;
      case 'projects': return <ProjectForm data={resumeData.project} onChange={(d) => setResumeData(p => ({ ...p, project: d }))} />;
      case 'skills': return <SkillsForm data={resumeData.skills} onChange={(d) => setResumeData(p => ({ ...p, skills: d }))} />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden">

      {/* Top Header */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 shrink-0 z-20">
        <div className="flex items-center gap-3 lg:gap-4">
          <Link to="/app" className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
            <ArrowLeft className="size-5" />
          </Link>
          <div className='pt-1 lg:pt-0'>
            <h1 className="font-bold text-slate-800 text-sm lg:text-lg truncate max-w-[150px] lg:max-w-xs">{resumeData.title || "Untitled"}</h1>
            <p className="hidden lg:block text-xs text-slate-500">Last edited just now</p>
          </div>
        </div>

        {/* Mobile View Toggle */}
        <div className="lg:hidden flex bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('editor')}
            className={`p-1.5 rounded-md transition-all ${activeTab === 'editor' ? 'bg-white shadow text-slate-800' : 'text-slate-500'}`}
          >
            <PenTool className="size-4" />
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`p-1.5 rounded-md transition-all ${activeTab === 'preview' ? 'bg-white shadow text-slate-800' : 'text-slate-500'}`}
          >
            <Monitor className="size-4" />
          </button>
        </div>

        <div className="flex items-center gap-2 lg:gap-3">
          {resumeData.public && (
            <button onClick={handleShare} className="hidden sm:flex p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Share">
              <Share2 className="size-5" />
            </button>
          )}

          <button onClick={changeResumeVisibility} className={`hidden md:flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all ${resumeData.public ? 'text-green-600 bg-green-50' : 'text-slate-600 hover:bg-slate-100'}`}>
            {resumeData.public ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
            <span className="hidden xl:inline">{resumeData.public ? 'Public' : 'Private'}</span>
          </button>

          <button onClick={() => window.print()} className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
            <Download className="size-4" />
            <span className="hidden xl:inline">PDF</span>
          </button>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-3 lg:px-5 py-2 lg:py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 disabled:opacity-70 transition-all shadow-lg shadow-slate-200"
          >
            {isSaving ? <Sparkles className="size-4 animate-spin" /> : <Save className="size-4" />}
            <span className="hidden sm:inline">Save</span>
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex flex-1 overflow-hidden relative">

        {/* LEFT PANEL: Editor 
            Logic: Hidden on mobile if activeTab is 'preview'. Always visible on Desktop (lg).
        */}
        <div className={`w-full lg:w-[45%] xl:w-[40%] flex-col bg-white border-r border-slate-200 relative z-10 ${activeTab === 'editor' ? 'flex' : 'hidden lg:flex'}`}>

          {/* Stepper Navigation */}
          <div className="px-4 lg:px-6 py-4 overflow-x-auto border-b border-slate-100 no-scrollbar">
            <div className="flex items-center min-w-max gap-3 lg:gap-4">
              {sections.map((sec, idx) => {
                const isActive = activeSectionIndex === idx;
                const isCompleted = activeSectionIndex > idx;
                const Icon = sec.icon;
                return (
                  <button
                    key={sec.id}
                    onClick={() => setActiveSectionIndex(idx)}
                    className={`group flex flex-col items-center gap-2 min-w-[4rem] lg:min-w-[4.5rem] transition-all ${isActive ? 'opacity-100 scale-105' : 'opacity-60 hover:opacity-100'}`}
                  >
                    <div className={`size-9 lg:size-10 rounded-xl flex items-center justify-center transition-all ${isActive ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' : isCompleted ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                      <Icon className="size-4 lg:size-5" />
                    </div>
                    <span className={`text-[10px] font-semibold uppercase tracking-wide ${isActive ? 'text-slate-900' : 'text-slate-500'}`}>{sec.name}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Configuration Bar */}
          <div className="px-4 lg:px-6 py-3 bg-slate-50/50 border-b border-slate-100 flex flex-wrap items-center gap-3 lg:gap-4">
            <div className="flex items-center gap-2">
              <LayoutTemplate className="size-4 text-slate-400" />
              <TemplateSelector selectedTemplate={resumeData.template} onChange={(t) => setResumeData(prev => ({ ...prev, template: t }))} />
            </div>
            <div className="h-4 w-px bg-slate-200 hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <Palette className="size-4 text-slate-400" />
              <ColorPicker selectedColor={resumeData.accent_color} onChange={(c) => setResumeData(prev => ({ ...prev, accent_color: c }))} />
            </div>
          </div>

          {/* Form Area */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-6 scroll-smooth">
            <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {renderForm()}
            </div>
          </div>

          {/* Navigation Footer */}
          <div className="p-4 border-t border-slate-200 bg-white flex justify-between items-center z-20">
            <button
              onClick={() => setActiveSectionIndex(prev => Math.max(0, prev - 1))}
              disabled={activeSectionIndex === 0}
              className="flex items-center gap-2 px-3 lg:px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50 rounded-lg transition-colors"
            >
              <ChevronLeft className="size-4" /> Back
            </button>
            <button
              onClick={() => setActiveSectionIndex(prev => Math.min(sections.length - 1, prev + 1))}
              disabled={activeSectionIndex === sections.length - 1}
              className="flex items-center gap-2 px-4 lg:px-6 py-2 text-sm font-medium bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50 rounded-lg shadow-md transition-all"
            >
              Next <span className='hidden sm:inline'>Step</span> <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        {/* RIGHT PANEL: Preview 
            Logic: Hidden on mobile if activeTab is 'editor'. Always visible on Desktop (lg).
        */}
        <div className={`flex-1 bg-slate-100/80 items-center justify-center p-4 lg:p-8 overflow-hidden relative ${activeTab === 'preview' ? 'flex' : 'hidden lg:flex'}`}>
          <div className="absolute inset-0 pattern-grid-lg text-slate-200/50 opacity-20 pointer-events-none" />

          <div className="h-full w-full flex flex-col items-center justify-start overflow-y-auto no-scrollbar pb-20">
            <div className="scale-[0.5] sm:scale-[0.65] md:scale-[0.75] lg:scale-[0.85] xl:scale-95 origin-top transition-transform duration-300 w-fit">
              <div className="shadow-2xl shadow-slate-400/20 bg-white">
                <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ResumeBuilder