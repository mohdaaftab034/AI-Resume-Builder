import { Loader2, Sparkles, Wand2, Quote } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../configs/api';
import toast from 'react-hot-toast';

const ProfessionalSummaryForm = ({ data, onChange, setResumeData }) => {
    const { token } = useSelector(state => state.auth);
    const [isGenerating, setIsGenerating] = useState(false);

    const generateSummary = async () => {
        if (!data) return toast.error("Please write a rough draft first");
        try {
            setIsGenerating(true);
            const prompt = `enhance professional summary "${data}"`
            const response = await api.post('/api/ai/enhance-pro-sum', { userContent: prompt }, {
                headers: { Authorization: token }
            })
            setResumeData(prev => ({ ...prev, professional_summary: response.data.enhanceContent }))
            toast.success("Summary enhanced successfully!");
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        } finally {
            setIsGenerating(false);
        }
    }

    return (
        <div className='flex flex-col gap-6 h-full'>
            <div className="space-y-1">
                <h2 className="text-2xl font-bold text-slate-800">Professional Summary</h2>
                <p className="text-sm text-slate-500">Craft a compelling introduction for your resume.</p>
            </div>

            {/* AI Assistant Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 p-6 text-white shadow-xl shadow-indigo-200">
                <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>

                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-indigo-100 font-semibold text-xs uppercase tracking-wider">
                            <Sparkles className="size-3.5 text-yellow-300" />
                            AI Powered
                        </div>
                        <h3 className="font-bold text-lg leading-tight">Refine with AI</h3>
                        <p className="text-xs text-indigo-100/80 max-w-xs">
                            Write a rough draft, and let our AI polish the tone, grammar, and impact.
                        </p>
                    </div>

                    <button
                        onClick={generateSummary}
                        disabled={isGenerating || !data}
                        className='group shrink-0 flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-indigo-700 text-sm font-bold rounded-xl hover:bg-indigo-50 active:scale-95 disabled:opacity-70 disabled:scale-100 transition-all shadow-sm'
                    >
                        {isGenerating ? (
                            <Loader2 className='size-4 animate-spin' />
                        ) : (
                            <Wand2 className='size-4 group-hover:rotate-12 transition-transform' />
                        )}
                        {isGenerating ? "Magic in progress..." : "Enhance Writing"}
                    </button>
                </div>
            </div>

            {/* Input Area */}
            <div className='flex-1 flex flex-col gap-3 relative group'>
                <div className="flex justify-between items-end px-1">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <Quote className="size-4 text-slate-400" />
                        Summary Text
                    </label>
                    <span className={`text-xs font-medium transition-colors ${data?.length > 400 ? 'text-amber-500' : 'text-slate-400'}`}>
                        {data?.length || 0} / 500 chars
                    </span>
                </div>

                <div className="relative">
                    <textarea
                        value={data || ""}
                        onChange={(e) => onChange(e.target.value)}
                        className='w-full p-5 min-h-[280px] text-sm leading-relaxed text-slate-700 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all resize-none shadow-sm placeholder:text-slate-300'
                        placeholder='e.g. Creative and detail-oriented Full Stack Developer with 3 years of experience in building scalable web applications...'
                    />
                    {/* Corner Accent */}
                    <div className="absolute bottom-4 right-4 pointer-events-none">
                        <div className="w-4 h-4 border-b-2 border-r-2 border-slate-200 rounded-br-lg group-focus-within:border-indigo-400 transition-colors"></div>
                    </div>
                </div>

                <div className="flex gap-3 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                    <p className='text-xs text-slate-600 leading-relaxed'>
                        <span className="font-semibold text-blue-700 block mb-0.5">Pro Tip</span>
                        Keep it concise (3-4 sentences). Mention your years of experience, key industries, and one major achievement.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ProfessionalSummaryForm