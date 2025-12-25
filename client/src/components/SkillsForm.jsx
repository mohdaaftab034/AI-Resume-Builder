import { Lightbulb, Plus, Sparkles, Tag, X, Zap } from 'lucide-react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const SkillsForm = ({ data, onChange }) => {

    const [newSkill, setNewSkill] = useState("");

    // Optional: Static list of popular skills for quick adding
    const popularSkills = ["JavaScript", "React", "Python", "Node.js", "Leadership", "Communication", "SQL", "Design"];

    const addSkill = (skillToAdd) => {
        const skill = skillToAdd || newSkill;

        if (skill.trim()) {
            if (!data.includes(skill.trim())) {
                onChange([...data, skill.trim()])
                setNewSkill("")
            } else {
                toast.error(`${skill} is already added!`);
            }
        }
    }

    const removeSkill = (index) => {
        onChange(data.filter((_, i) => i !== index))
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addSkill();
        }
    }

    return (
        <div className='max-w-3xl mx-auto space-y-8 pb-10'>

            {/* Header */}
            <div className='flex items-end justify-between border-b border-slate-200 pb-4'>
                <div className="space-y-1">
                    <h3 className='text-2xl font-bold text-slate-800 flex items-center gap-2'>
                        <Zap className="size-6 text-indigo-600" />
                        Skills & Expertise
                    </h3>
                    <p className='text-sm text-slate-500'>Highlight your technical abilities and soft skills.</p>
                </div>
                <div className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    {data.length} Skills Added
                </div>
            </div>

            {/* Input Section */}
            <div className="space-y-4">
                <div className='flex gap-3'>
                    <div className="relative flex-1 group">
                        <Sparkles className="absolute left-4 top-3.5 size-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                        <input
                            type="text"
                            placeholder='Type a skill and press Enter (e.g. Project Management)'
                            className='w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all'
                            onChange={(e) => setNewSkill(e.target.value)}
                            value={newSkill}
                            onKeyDown={handleKeyPress}
                        />
                    </div>
                    <button
                        onClick={() => addSkill()}
                        disabled={!newSkill.trim()}
                        className='flex items-center gap-2 px-6 py-3 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:scale-100 disabled:shadow-none transition-all'
                    >
                        <Plus className='size-5' />
                        Add
                    </button>
                </div>

                {/* Quick Add Suggestions */}
                <div className="flex flex-wrap gap-2 items-center text-xs text-slate-500">
                    <span className="font-semibold mr-1">Quick Add:</span>
                    {popularSkills.map((skill) => (
                        !data.includes(skill) && (
                            <button
                                key={skill}
                                onClick={() => addSkill(skill)}
                                className="px-3 py-1 bg-white border border-slate-200 rounded-full hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 transition-colors flex items-center gap-1"
                            >
                                <Plus className="size-3" /> {skill}
                            </button>
                        )
                    ))}
                </div>
            </div>

            {/* Active Skills List */}
            <div className="min-h-[150px]">
                {data.length > 0 ? (
                    <div className='flex flex-wrap gap-3'>
                        {data.map((skill, index) => (
                            <div
                                key={index}
                                className='group flex items-center gap-2 pl-4 pr-2 py-2 bg-indigo-50/50 border border-indigo-100 text-indigo-700 rounded-lg text-sm font-medium hover:bg-indigo-100 hover:border-indigo-200 transition-all animate-in fade-in zoom-in duration-300'
                            >
                                <Tag className="size-3.5 opacity-50" />
                                {skill}
                                <button
                                    onClick={() => removeSkill(index)}
                                    className='ml-2 p-1 text-indigo-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors'
                                    title="Remove Skill"
                                >
                                    <X className='size-3.5' />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='text-center py-10 border-2 border-dashed border-slate-100 rounded-xl bg-slate-50/30'>
                        <div className="inline-flex items-center justify-center p-3 bg-slate-100 rounded-full mb-3">
                            <Sparkles className='size-6 text-slate-400' />
                        </div>
                        <p className='text-slate-600 font-medium'>No skills added yet</p>
                        <p className='text-slate-400 text-sm mt-1'>Type above or select from quick suggestions</p>
                    </div>
                )}
            </div>

            {/* Pro Tip */}
            <div className='flex gap-4 p-4 bg-amber-50 border border-amber-100 rounded-xl'>
                <div className="p-2 bg-amber-100 rounded-lg h-fit shrink-0">
                    <Lightbulb className="size-5 text-amber-600" />
                </div>
                <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-800">Optimization Tip</h4>
                    <p className='text-xs text-slate-600 leading-relaxed'>
                        Aim for <strong>8-12 relevant skills</strong>. Mix hard skills (e.g., Python, Figma) with key soft skills (e.g., Leadership). Ensure these match the keywords in the job description you are applying for.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SkillsForm