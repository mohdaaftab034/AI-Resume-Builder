import { Award, BookOpen, Calendar, GraduationCap, Plus, School, Trash2 } from 'lucide-react';
import React from 'react'

const EducationForm = ({ data, onChange }) => {

    const addEducation = () => {
        const newEduaction = {
            institution: "",
            degree: "",
            field: "",
            graduation_date: "",
            gpa: ""
        };
        onChange([...data, newEduaction])
    }

    const removeEducation = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated)
    }

    const updateEducation = (index, field, value) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value }
        onChange(updated)
    }

    return (
        <div className='max-w-3xl mx-auto space-y-8 pb-10'>

            {/* Header */}
            <div className='flex items-end justify-between border-b border-slate-200 pb-4'>
                <div className="space-y-1">
                    <h3 className='text-2xl font-bold text-slate-800 flex items-center gap-2'>
                        <GraduationCap className="size-6 text-indigo-600" />
                        Education
                    </h3>
                    <p className='text-sm text-slate-500'>Add your academic background.</p>
                </div>
                <button
                    onClick={addEducation}
                    className='group flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5 transition-all'
                >
                    <Plus className='size-4 group-hover:rotate-90 transition-transform' />
                    Add Education
                </button>
            </div>

            {/* Empty State */}
            {data.length === 0 ? (
                <div className='flex flex-col items-center justify-center py-16 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer group' onClick={addEducation}>
                    <div className="size-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform duration-300">
                        <GraduationCap className='size-8 text-slate-300 group-hover:text-indigo-500 transition-colors' />
                    </div>
                    <p className='text-slate-600 font-medium'>No education listed yet</p>
                    <p className='text-slate-400 text-sm mt-1'>Click to add your school or university</p>
                </div>
            ) : (
                <div className='space-y-6'>
                    {data.map((education, index) => (
                        <div key={index} className='group relative bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden'>

                            {/* Delete Button */}
                            <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => removeEducation(index)}
                                    className='p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors'
                                    title="Remove this entry"
                                >
                                    <Trash2 className='size-4' />
                                </button>
                            </div>

                            <div className='p-6 space-y-5'>
                                {/* Row 1: Institution Name */}
                                <div className='space-y-1.5'>
                                    <label className='text-xs font-semibold text-slate-500 uppercase tracking-wide'>Institution / University</label>
                                    <div className="relative">
                                        <School className="absolute left-3 top-3 size-4 text-slate-400" />
                                        <input
                                            value={education.institution || ""}
                                            onChange={(e) => updateEducation(index, "institution", e.target.value)}
                                            type="text"
                                            placeholder='e.g. Stanford University'
                                            className='w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all'
                                        />
                                    </div>
                                </div>

                                {/* Row 2: Degree & Field */}
                                <div className='grid md:grid-cols-2 gap-5'>
                                    <div className='space-y-1.5'>
                                        <label className='text-xs font-semibold text-slate-500 uppercase tracking-wide'>Degree</label>
                                        <div className="relative">
                                            <GraduationCap className="absolute left-3 top-3 size-4 text-slate-400" />
                                            <input
                                                value={education.degree || ""}
                                                onChange={(e) => updateEducation(index, "degree", e.target.value)}
                                                type="text"
                                                placeholder="e.g. Bachelor's"
                                                className='w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all'
                                            />
                                        </div>
                                    </div>
                                    <div className='space-y-1.5'>
                                        <label className='text-xs font-semibold text-slate-500 uppercase tracking-wide'>Field of Study</label>
                                        <div className="relative">
                                            <BookOpen className="absolute left-3 top-3 size-4 text-slate-400" />
                                            <input
                                                value={education.field || ""}
                                                onChange={(e) => updateEducation(index, "field", e.target.value)}
                                                type="text"
                                                placeholder='e.g. Computer Science'
                                                className='w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all'
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Row 3: Date & GPA */}
                                <div className='grid md:grid-cols-2 gap-5'>
                                    <div className='space-y-1.5'>
                                        <label className='text-xs font-semibold text-slate-500 uppercase tracking-wide'>Graduation Date</label>
                                        <div className="relative">
                                            <input
                                                value={education.graduation_date || ""}
                                                onChange={(e) => updateEducation(index, "graduation_date", e.target.value)}
                                                type="month"
                                                className='w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all'
                                            />
                                        </div>
                                    </div>

                                    <div className='space-y-1.5'>
                                        <label className='text-xs font-semibold text-slate-500 uppercase tracking-wide'>GPA (Optional)</label>
                                        <div className="relative">
                                            <Award className="absolute left-3 top-3 size-4 text-slate-400" />
                                            <input
                                                value={education.gpa || ""}
                                                onChange={(e) => updateEducation(index, "gpa", e.target.value)}
                                                type="text"
                                                placeholder='e.g. 3.8/4.0'
                                                className='w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all'
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default EducationForm