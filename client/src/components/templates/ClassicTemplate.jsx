import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe, ExternalLink } from "lucide-react";

const MinimalistTemplate = ({ data, accentColor = '#334155' }) => {

    // Helper to format dates cleanly
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        const date = new Date(year, month - 1);
        return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
    };

    return (
        <div className="max-w-[210mm] mx-auto p-10 bg-white text-slate-800 font-sans min-h-[297mm] shadow-lg">

            {/* --- HEADER --- */}
            <header className="flex justify-between items-start border-b pb-8 mb-8" style={{ borderColor: accentColor }}>
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight uppercase" style={{ color: accentColor }}>
                        {data.personal_info?.full_name || "Your Name"}
                    </h1>
                    <p className="text-lg text-slate-500 font-medium tracking-wide">
                        {data.personal_info?.job_title || "Professional Title"}
                    </p>
                </div>

                <div className="text-sm space-y-2 text-right text-slate-600">
                    {data.personal_info?.email && (
                        <div className="flex items-center justify-end gap-2">
                            <span>{data.personal_info.email}</span>
                            <Mail size={14} />
                        </div>
                    )}
                    {data.personal_info?.phone && (
                        <div className="flex items-center justify-end gap-2">
                            <span>{data.personal_info.phone}</span>
                            <Phone size={14} />
                        </div>
                    )}
                    {data.personal_info?.location && (
                        <div className="flex items-center justify-end gap-2">
                            <span>{data.personal_info.location}</span>
                            <MapPin size={14} />
                        </div>
                    )}
                    {data.personal_info?.linkedin && (
                        <div className="flex items-center justify-end gap-2">
                            <span className="truncate max-w-[200px]">{data.personal_info.linkedin}</span>
                            <Linkedin size={14} />
                        </div>
                    )}
                    {data.personal_info?.website && (
                        <div className="flex items-center justify-end gap-2">
                            <span className="truncate max-w-[200px]">{data.personal_info.website}</span>
                            <Globe size={14} />
                        </div>
                    )}
                </div>
            </header>

            <div className="space-y-8">

                {/* --- SUMMARY --- */}
                {data.professional_summary && (
                    <section>
                        <p className="text-slate-700 leading-relaxed text-[15px]">
                            {data.professional_summary}
                        </p>
                    </section>
                )}

                {/* --- SKILLS (Grid Layout) --- */}
                {data.skills && data.skills.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: accentColor }}>
                            Core Competencies
                            <span className="h-[1px] flex-grow bg-slate-200"></span>
                        </h2>
                        <div className="grid grid-cols-3 gap-y-2 gap-x-4">
                            {data.skills.map((skill, index) => (
                                <div key={index} className="flex items-center gap-2 text-sm text-slate-700">
                                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }}></div>
                                    {skill}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* --- EXPERIENCE --- */}
                {data.experience && data.experience.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2" style={{ color: accentColor }}>
                            Experience
                            <span className="h-[1px] flex-grow bg-slate-200"></span>
                        </h2>

                        <div className="space-y-6">
                            {data.experience.map((exp, index) => (
                                <div key={index} className="relative pl-4 border-l-2 border-slate-100 hover:border-slate-300 transition-colors">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-lg text-slate-800">{exp.position}</h3>
                                        <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-1 rounded">
                                            {formatDate(exp.start_date)} — {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                        </span>
                                    </div>
                                    <div className="text-sm font-medium text-slate-500 mb-3">{exp.company}</div>

                                    {exp.description && (
                                        <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                                            {exp.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* --- PROJECTS --- */}
                {data.project && data.project.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2" style={{ color: accentColor }}>
                            Key Projects
                            <span className="h-[1px] flex-grow bg-slate-200"></span>
                        </h2>

                        <div className="grid grid-cols-1 gap-4">
                            {data.project.map((proj, index) => (
                                <div key={index} className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-slate-800">{proj.name}</h3>
                                        <ExternalLink size={14} className="text-slate-400" />
                                    </div>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        {proj.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* --- EDUCATION --- */}
                {data.education && data.education.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2" style={{ color: accentColor }}>
                            Education
                            <span className="h-[1px] flex-grow bg-slate-200"></span>
                        </h2>

                        <div className="space-y-4">
                            {data.education.map((edu, index) => (
                                <div key={index} className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-slate-800">{edu.institution}</h3>
                                        <p className="text-sm text-slate-600">
                                            {edu.degree} {edu.field && `• ${edu.field}`}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-sm text-slate-500 block">{formatDate(edu.graduation_date)}</span>
                                        {edu.gpa && <span className="text-xs font-medium text-slate-400">GPA: {edu.gpa}</span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}

export default MinimalistTemplate;