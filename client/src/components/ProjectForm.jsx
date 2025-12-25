import { FileText, FolderOpen, Layers, Plus, Trash2 } from 'lucide-react';
import React from 'react'

const ProjectForm = ({ data, onChange }) => {

    const addProjects = () => {
        const newProject = {
            name: "",
            type: "",
            description: "",
        }
        onChange([...data, newProject]);
    }

    const removeProject = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated)
    }

    const updateProject = (index, field, value) => {
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
                        <FolderOpen className="size-6 text-indigo-600" />
                        Key Projects
                    </h3>
                    <p className='text-sm text-slate-500'>Showcase your best work and technical achievements.</p>
                </div>
                <button
                    onClick={addProjects}
                    className='group flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5 transition-all'
                >
                    <Plus className='size-4 group-hover:rotate-90 transition-transform' />
                    Add Project
                </button>
            </div>

            {/* Empty State */}
            {data.length === 0 ? (
                <div className='flex flex-col items-center justify-center py-16 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer group' onClick={addProjects}>
                    <div className="size-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform duration-300">
                        <FolderOpen className='size-8 text-slate-300 group-hover:text-indigo-500 transition-colors' />
                    </div>
                    <p className='text-slate-600 font-medium'>No projects added yet</p>
                    <p className='text-slate-400 text-sm mt-1'>Click to add a project you are proud of</p>
                </div>
            ) : (
                <div className='space-y-6'>
                    {data.map((project, index) => (
                        <div key={index} className='group relative bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden'>

                            {/* Delete Button */}
                            <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => removeProject(index)}
                                    className='p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors'
                                    title="Delete Project"
                                >
                                    <Trash2 className='size-4' />
                                </button>
                            </div>

                            <div className='p-6 space-y-5'>
                                {/* Row 1: Name & Type */}
                                <div className='grid md:grid-cols-2 gap-5'>
                                    <div className='space-y-1.5'>
                                        <label className='text-xs font-semibold text-slate-500 uppercase tracking-wide'>Project Name</label>
                                        <div className="relative">
                                            <FolderOpen className="absolute left-3 top-3 size-4 text-slate-400" />
                                            <input
                                                value={project.name || ""}
                                                onChange={(e) => updateProject(index, "name", e.target.value)}
                                                type="text"
                                                placeholder='e.g. E-Commerce Dashboard'
                                                className='w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all'
                                            />
                                        </div>
                                    </div>

                                    <div className='space-y-1.5'>
                                        <label className='text-xs font-semibold text-slate-500 uppercase tracking-wide'>Project Type / Tech Stack</label>
                                        <div className="relative">
                                            <Layers className="absolute left-3 top-3 size-4 text-slate-400" />
                                            <input
                                                value={project.type || ""}
                                                onChange={(e) => updateProject(index, "type", e.target.value)}
                                                type="text"
                                                placeholder='e.g. React, Node.js, MongoDB'
                                                className='w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all'
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Row 2: Description */}
                                <div className='space-y-2 pt-2'>
                                    <label className='text-xs font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-2'>
                                        <FileText className="size-3.5" />
                                        Description
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={project.description || ""}
                                        onChange={(e) => updateProject(index, "description", e.target.value)}
                                        className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm leading-relaxed text-slate-700 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all resize-none'
                                        placeholder='Briefly explain what the project does, the challenges you solved, and the impact it had...'
                                    />
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ProjectForm