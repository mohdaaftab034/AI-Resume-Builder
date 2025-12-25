import { Briefcase, Building2, Calendar, Loader2, Plus, Sparkles, Trash2, X } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../configs/api';
import toast from 'react-hot-toast';

const ExperienceForm = ({ data, onChange }) => {

    const { token } = useSelector(state => state.auth);
    const [generatingIndex, setGeneratingIndex] = useState(-1);

    const addExperience = () => {
        const newExperience = {
            company: "",
            position: "",
            start_date: "",
            end_date: "",
            description: "",
            is_current: false
        };
        onChange([...data, newExperience])
    }

    const removeExperience = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated)
    }

    const updateExperience = (index, field, value) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value }
        onChange(updated)
    }

    const generateDescription = async (index) => {
        const experience = data[index];
        if (!experience.position || !experience.company) {
            toast.error("Please enter Job Title and Company first.");
            return;
        }

        setGeneratingIndex(index);
        const prompt = `enhance this job description ${experience.description} for the position of ${experience.position} at ${experience.company}.`
        try {
            const { data } = await api.post('/api/ai/enhance-job-desc', { userContent: prompt }, { headers: { Authorization: token } })
            updateExperience(index, "description", data.enhancedContent);
            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        }
        finally {
            setGeneratingIndex(-1);
        }
    }

    return (
        <div className='max-w-3xl mx-auto space-y-8 pb-10'>

            {/* Header Section */}
            <div className='flex items-end justify-between border-b border-slate-200 pb-4'>
                <div className="space-y-1">
                    <h3 className='text-2xl font-bold text-slate-800 flex items-center gap-2'>
                        <Briefcase className="size-6 text-indigo-600" />
                        Professional Experience
                    </h3>
                    <p className='text-sm text-slate-500'>Highlight your career journey and key achievements.</p>
                </div>
                <button
                    onClick={addExperience}
                    className='group flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5 transition-all'
                >
                    <Plus className='size-4 group-hover:rotate-90 transition-transform' />
                    Add Position
                </button>
            </div>

            {/* Empty State */}
            {data.length === 0 ? (
                <div className='flex flex-col items-center justify-center py-16 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer group' onClick={addExperience}>
                    <div className="size-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Briefcase className='size-8 text-slate-300 group-hover:text-indigo-500 transition-colors' />
                    </div>
                    <p className='text-slate-600 font-medium'>No experience listed yet</p>
                    <p className='text-slate-400 text-sm mt-1'>Click to add your first job role</p>
                </div>
            ) : (
                <div className='space-y-6'>
                    {data.map((experience, index) => (
                        <div key={index} className='group relative bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden'>

                            {/* Card Header / Delete Button */}
                            <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => removeExperience(index)}
                                    className='p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors'
                                    title="Remove this position"
                                >
                                    <Trash2 className='size-4' />
                                </button>
                            </div>

                            <div className='p-6 space-y-5'>
                                {/* Row 1: Title & Company */}
                                <div className='grid md:grid-cols-2 gap-5'>
                                    <div className='space-y-1.5'>
                                        <label className='text-xs font-semibold text-slate-500 uppercase tracking-wide'>Job Title</label>
                                        <div className="relative">
                                            <Briefcase className="absolute left-3 top-3 size-4 text-slate-400" />
                                            <input
                                                value={experience.position || ""}
                                                onChange={(e) => updateExperience(index, "position", e.target.value)}
                                                type="text"
                                                placeholder='e.g. Senior Frontend Developer'
                                                className='w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all'
                                            />
                                        </div>
                                    </div>

                                    <div className='space-y-1.5'>
                                        <label className='text-xs font-semibold text-slate-500 uppercase tracking-wide'>Company</label>
                                        <div className="relative">
                                            <Building2 className="absolute left-3 top-3 size-4 text-slate-400" />
                                            <input
                                                value={experience.company || ""}
                                                onChange={(e) => updateExperience(index, "company", e.target.value)}
                                                type="text"
                                                placeholder='e.g. Google'
                                                className='w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all'
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Row 2: Dates */}
                                <div className='grid md:grid-cols-2 gap-5'>
                                    <div className='grid grid-cols-2 gap-4'>
                                        <div className='space-y-1.5'>
                                            <label className='text-xs font-semibold text-slate-500 uppercase tracking-wide'>Start Date</label>
                                            <div className="relative">
                                                <input
                                                    value={experience.start_date || ""}
                                                    onChange={(e) => updateExperience(index, "start_date", e.target.value)}
                                                    type="month"
                                                    className='w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all'
                                                />
                                            </div>
                                        </div>

                                        <div className={`space-y-1.5 transition-opacity ${experience.is_current ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                                            <label className='text-xs font-semibold text-slate-500 uppercase tracking-wide'>End Date</label>
                                            <div className="relative">
                                                <input
                                                    value={experience.end_date || ""}
                                                    onChange={(e) => updateExperience(index, "end_date", e.target.value)}
                                                    type="month"
                                                    disabled={experience.is_current}
                                                    className='w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all'
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex items-center md:pt-6'>
                                        <label className='flex items-center gap-3 cursor-pointer group/check'>
                                            <div className="relative">
                                                <input
                                                    type="checkbox"
                                                    checked={experience.is_current || false}
                                                    onChange={(e) => updateExperience(index, "is_current", e.target.checked)}
                                                    className="peer sr-only"
                                                />
                                                <div className="w-5 h-5 border-2 border-slate-300 rounded transition-colors peer-checked:bg-indigo-600 peer-checked:border-indigo-600"></div>
                                                <svg className="absolute w-3 h-3 text-white left-1 top-1 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                            </div>
                                            <span className='text-sm font-medium text-slate-600 group-hover/check:text-indigo-600 transition-colors'>I currently work here</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Row 3: Description & AI */}
                                <div className='space-y-2 pt-2'>
                                    <div className='flex items-center justify-between'>
                                        <label className='text-xs font-semibold text-slate-500 uppercase tracking-wide'>
                                            Responsibilities & Achievements
                                        </label>

                                        <button
                                            onClick={() => generateDescription(index)}
                                            disabled={generatingIndex === index || !experience.position || !experience.company}
                                            className='flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full shadow-sm hover:shadow-md hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 disabled:shadow-none transition-all'
                                        >
                                            {generatingIndex === index ? (
                                                <Loader2 className='size-3 animate-spin' />
                                            ) : (
                                                <Sparkles className='size-3 text-yellow-300' />
                                            )}
                                            {generatingIndex === index ? "Improving..." : "Enhance with AI"}
                                        </button>
                                    </div>

                                    <textarea
                                        value={experience.description || ""}
                                        onChange={(e) => updateExperience(index, "description", e.target.value)}
                                        rows={5}
                                        className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm leading-relaxed text-slate-700 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all resize-none'
                                        placeholder='• Led a team of 5 developers...&#10;• Increased system performance by 20%...&#10;• Managed project timelines using Agile methodology...'
                                    />
                                    <p className="text-[10px] text-slate-400 text-right">
                                        Tip: Use bullet points for better readability.
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ExperienceForm