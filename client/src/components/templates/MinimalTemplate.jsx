import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe, Calendar } from "lucide-react";

const PolishedMinimalTemplate = ({ data, accentColor = '#1f2937' }) => {

    // Helper to format dates
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        const date = new Date(year, month - 1);
        return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
    };

    return (
        <div className="w-full max-w-[210mm] min-h-[297mm] mx-auto bg-white p-12 text-slate-800 shadow-xl font-sans leading-relaxed">

            {/* --- HEADER --- */}
            <header className="text-center mb-10 border-b pb-10 border-slate-100">
                <h1 className="text-4xl font-extrabold tracking-tight uppercase mb-3 text-slate-900">
                    {data.personal_info?.full_name || "Your Name"}
                </h1>
                <p className="text-xl font-medium text-slate-500 mb-6 tracking-wide">
                    {data.personal_info?.job_title || "Professional Title"}
                </p>

                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-600 font-medium">
                    {data.personal_info?.email && (
                        <div className="flex items-center gap-1.5">
                            <Mail size={14} style={{ color: accentColor }} />
                            <span>{data.personal_info.email}</span>
                        </div>
                    )}
                    {data.personal_info?.phone && (
                        <div className="flex items-center gap-1.5">
                            <Phone size={14} style={{ color: accentColor }} />
                            <span>{data.personal_info.phone}</span>
                        </div>
                    )}
                    {data.personal_info?.location && (
                        <div className="flex items-center gap-1.5">
                            <MapPin size={14} style={{ color: accentColor }} />
                            <span>{data.personal_info.location}</span>
                        </div>
                    )}
                    {data.personal_info?.linkedin && (
                        <div className="flex items-center gap-1.5">
                            <Linkedin size={14} style={{ color: accentColor }} />
                            <span className="truncate max-w-[150px]">{data.personal_info.linkedin}</span>
                        </div>
                    )}
                    {data.personal_info?.website && (
                        <div className="flex items-center gap-1.5">
                            <Globe size={14} style={{ color: accentColor }} />
                            <span className="truncate max-w-[150px]">{data.personal_info.website}</span>
                        </div>
                    )}
                </div>
            </header>

            <div className="space-y-10 px-4">

                {/* --- SUMMARY --- */}
                {data.professional_summary && (
                    <section>
                        <h2 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: accentColor }}>
                            Professional Profile
                        </h2>
                        <p className="text-slate-700 leading-7 text-[15px]">
                            {data.professional_summary}
                        </p>
                    </section>
                )}

                {/* --- EXPERIENCE --- */}
                {data.experience && data.experience.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2" style={{ color: accentColor }}>
                            Work Experience
                        </h2>

                        <div className="space-y-8">
                            {data.experience.map((exp, index) => (
                                <div key={index} className="relative">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                                        <h3 className="font-bold text-lg text-slate-900">{exp.position}</h3>
                                        <div className="flex items-center gap-1 text-sm font-medium text-slate-500 whitespace-nowrap">
                                            <Calendar size={12} />
                                            <span>{formatDate(exp.start_date)} — {exp.is_current ? "Present" : formatDate(exp.end_date)}</span>
                                        </div>
                                    </div>

                                    <div className="text-base font-semibold text-slate-600 mb-3">
                                        {exp.company}
                                    </div>

                                    {exp.description && (
                                        <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-line pl-1 border-l-2 border-slate-100">
                                            {exp.description}
                                        </div>
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
                            Projects
                        </h2>
                        <div className="grid grid-cols-1 gap-6">
                            {data.project.map((proj, index) => (
                                <div key={index} className="border border-slate-100 rounded-lg p-5 bg-slate-50/50">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-slate-900">{proj.name}</h3>
                                        <span className="text-xs font-medium px-2 py-1 bg-white border border-slate-200 rounded text-slate-500">
                                            {proj.type || "Project"}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        {proj.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* --- EDUCATION & SKILLS GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                    {/* Education */}
                    {data.education && data.education.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2" style={{ color: accentColor }}>
                                Education
                            </h2>
                            <div className="space-y-6">
                                {data.education.map((edu, index) => (
                                    <div key={index}>
                                        <div className="font-bold text-slate-900">{edu.degree}</div>
                                        <div className="text-sm text-slate-600 font-medium">{edu.institution}</div>
                                        <div className="text-xs text-slate-400 mt-1">
                                            Graduated: {formatDate(edu.graduation_date)}
                                            {edu.gpa ? ` • GPA: ${edu.gpa}` : ''}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills */}
                    {data.skills && data.skills.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2" style={{ color: accentColor }}>
                                Core Competencies
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {data.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1.5 bg-slate-100 text-slate-700 text-sm font-medium rounded-md border border-slate-200"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

            </div>
        </div>
    );
}

export default PolishedMinimalTemplate;