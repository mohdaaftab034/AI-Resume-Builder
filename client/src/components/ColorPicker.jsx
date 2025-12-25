import { Check, ChevronDown, Palette } from 'lucide-react';
import React, { useState } from 'react';

const ColorPicker = ({ onChange, selectedColor }) => {
    const [isOpen, setIsOpen] = useState(false);

    const colors = [
        { name: "Blue", value: "#3B82F6" },
        { name: "Indigo", value: "#6366F1" },
        { name: "Purple", value: "#8B5CF6" },
        { name: "Green", value: "#10B981" },
        { name: "Red", value: "#EF4444" },
        { name: "Orange", value: "#F97316" },
        { name: "Teal", value: "#14B8A6" },
        { name: "Pink", value: "#EC4899" },
        { name: "Gray", value: "#4B5563" },
        { name: "Black", value: "#1F2937" },
    ];

    return (
        <div className='relative'>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className='flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-indigo-300 hover:ring-2 hover:ring-indigo-100 transition-all outline-none'
            >
                <div className="flex items-center gap-2">
                    <div
                        className="size-4 rounded-full border border-slate-200 shadow-sm"
                        style={{ backgroundColor: selectedColor }}
                    />
                    <span className='text-sm font-medium text-slate-700 max-sm:hidden'>Accent</span>
                </div>
                <ChevronDown size={14} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Panel */}
            {isOpen && (
                <>
                    {/* Invisible backdrop to close on click outside */}
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>

                    <div className='absolute top-full left-0 mt-2 p-4 w-64 bg-white border border-slate-100 rounded-xl shadow-xl z-50 animate-in fade-in zoom-in-95 duration-200'>
                        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-100">
                            <Palette size={14} className="text-slate-400" />
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Choose Accent</span>
                        </div>

                        <div className='grid grid-cols-5 gap-3'>
                            {colors.map((color) => (
                                <button
                                    key={color.value}
                                    onClick={() => { onChange(color.value); setIsOpen(false); }}
                                    className='group relative flex flex-col items-center gap-1 focus:outline-none'
                                    title={color.name}
                                >
                                    <div
                                        className={`size-8 rounded-full shadow-sm transition-all duration-200 group-hover:scale-110 group-hover:shadow-md flex items-center justify-center ${selectedColor === color.value ? 'ring-2 ring-offset-2 ring-slate-400' : ''}`}
                                        style={{ backgroundColor: color.value }}
                                    >
                                        {selectedColor === color.value && (
                                            <Check className='size-4 text-white drop-shadow-md' strokeWidth={3} />
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default ColorPicker