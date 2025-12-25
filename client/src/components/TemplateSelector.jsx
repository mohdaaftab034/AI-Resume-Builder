import { Check, ChevronDown, LayoutTemplate } from 'lucide-react';
import React, { useState } from 'react';

const TemplateSelector = ({ selectedTemplate, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const templates = [
        { id: "classic", name: "Classic", type: "Standard" },
        { id: "modern", name: "Modern", type: "Sidebar" },
        { id: "minimal-image", name: "Profile", type: "Creative" },
        { id: "minimal", name: "Minimal", type: "Clean" },
    ];

    // Helper to render a mini CSS representation of the resume layout
    const renderMiniPreview = (id) => {
        switch (id) {
            case 'modern': // Sidebar Layout
                return (
                    <div className="w-full h-16 bg-slate-50 border border-slate-200 rounded flex overflow-hidden">
                        <div className="w-1/3 bg-slate-200 h-full"></div>
                        <div className="w-2/3 p-1 space-y-1">
                            <div className="w-1/2 h-1 bg-slate-300 rounded"></div>
                            <div className="w-full h-0.5 bg-slate-200 rounded"></div>
                            <div className="w-full h-0.5 bg-slate-200 rounded"></div>
                        </div>
                    </div>
                );
            case 'minimal-image': // Top Image Layout
                return (
                    <div className="w-full h-16 bg-slate-50 border border-slate-200 rounded p-1 flex flex-col gap-1 overflow-hidden">
                        <div className="flex gap-1 items-center">
                            <div className="size-4 rounded-full bg-slate-300 shrink-0"></div>
                            <div className="w-full h-1 bg-slate-300 rounded"></div>
                        </div>
                        <div className="space-y-1 mt-1">
                            <div className="w-full h-0.5 bg-slate-200 rounded"></div>
                            <div className="w-full h-0.5 bg-slate-200 rounded"></div>
                        </div>
                    </div>
                );
            case 'minimal': // Text Only Layout
                return (
                    <div className="w-full h-16 bg-slate-50 border border-slate-200 rounded p-1.5 flex flex-col items-center gap-1 overflow-hidden">
                        <div className="w-1/2 h-1 bg-slate-300 rounded mb-1"></div>
                        <div className="w-full h-0.5 bg-slate-200 rounded"></div>
                        <div className="w-full h-0.5 bg-slate-200 rounded"></div>
                        <div className="w-full h-0.5 bg-slate-200 rounded"></div>
                    </div>
                );
            default: // Classic Layout
                return (
                    <div className="w-full h-16 bg-slate-50 border border-slate-200 rounded p-1 overflow-hidden">
                        <div className="w-full h-2 bg-slate-200 border-b border-slate-300 mb-1"></div>
                        <div className="w-1/3 h-1 bg-slate-300 rounded mb-1"></div>
                        <div className="space-y-0.5">
                            <div className="w-full h-0.5 bg-slate-200 rounded"></div>
                            <div className="w-3/4 h-0.5 bg-slate-200 rounded"></div>
                        </div>
                    </div>
                );
        }
    }

    return (
        <div className='relative'>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className='flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-blue-300 hover:ring-2 hover:ring-blue-100 transition-all outline-none'
            >
                <LayoutTemplate size={16} className="text-slate-600" />
                <span className='text-sm font-medium text-slate-700 max-sm:hidden'>Template</span>
                <ChevronDown size={14} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Panel */}
            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>

                    <div className='absolute top-full left-0 mt-2 w-72 bg-white border border-slate-100 rounded-xl shadow-xl z-50 p-2 animate-in fade-in zoom-in-95 duration-200'>
                        <div className="flex items-center justify-between px-2 py-2 mb-2 border-b border-slate-100">
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Select Layout</span>
                        </div>

                        <div className='grid grid-cols-2 gap-2'>
                            {templates.map((template) => {
                                const isActive = selectedTemplate === template.id;
                                return (
                                    <div
                                        key={template.id}
                                        onClick={() => { onChange(template.id); setIsOpen(false); }}
                                        className={`relative p-2 rounded-lg cursor-pointer border transition-all duration-200 group ${isActive ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500' : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-md'}`}
                                    >
                                        {/* Visual Preview */}
                                        <div className={`mb-2 opacity-80 group-hover:opacity-100 transition-opacity ${isActive ? 'opacity-100' : ''}`}>
                                            {renderMiniPreview(template.id)}
                                        </div>

                                        {/* Label */}
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className={`text-xs font-bold ${isActive ? 'text-blue-700' : 'text-slate-700'}`}>{template.name}</h4>
                                                <p className="text-[10px] text-slate-400">{template.type}</p>
                                            </div>
                                            {isActive && (
                                                <div className='size-4 bg-blue-500 rounded-full flex items-center justify-center shadow-sm'>
                                                    <Check className='size-2.5 text-white' />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default TemplateSelector