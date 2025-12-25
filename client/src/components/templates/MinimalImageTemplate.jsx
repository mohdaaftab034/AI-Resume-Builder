import React from 'react';
import { MapPin, Mail, Phone, Linkedin, Globe, ExternalLink } from 'lucide-react';

const ModernSidebarTemplate = ({ data, accentColor = '#2563eb' }) => {

    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    return (
        <div className="flex w-full max-w-[210mm] min-h-[297mm] mx-auto bg-white shadow-xl font-sans text-slate-800">

            {/* --- LEFT SIDEBAR (Personal Info, Skills, Education) --- */}
            <aside className="w-[32%] bg-slate-50 border-r border-slate-200 flex flex-col">

                {/* Profile Image */}
                <div className="p-8 pb-0 flex justify-center">
                    {data.personal_info?.image && (
                        <div className="w-32 h-32 rounded-full border-4 border-white shadow-md overflow-hidden" style={{ borderColor: 'white' }}>
                            <img
                                src={typeof data.personal_info.image === 'string' ? data.personal_info.image : URL.createObjectURL(data.personal_info.image)}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                </div>

                {/* Contact Info */}
                <div className="p-8 flex flex-col gap-4 text-sm">
                    {data.personal_info?.email && (
                        <div className="flex items-start gap-3 text-slate-600 break-all">
                            <Mail size={16} className="mt-0.5 shrink-0" style={{ color: accentColor }} />
                            <span>{data.personal_info.email}</span>
                        </div>
                    )}
                    {data.personal_info?.phone && (
                        <div className="flex items-center gap-3 text-slate-600">
                            <Phone size={16} className="shrink-0" style={{ color: accentColor }} />
                            <span>{data.personal_info.phone}</span>
                        </div>
                    )}
                    {data.personal_info?.location && (
                        <div className="flex items-center gap-3 text-slate-600">
                            <MapPin size={16} className="shrink-0" style={{ color: accentColor }} />
                            <span>{data.personal_info.location}</span>
                        </div>
                    )}
                    {data.personal_info?.linkedin && (
                        <div className="flex items-start gap-3 text-slate-600 break-all">
                            <Linkedin size={16} className="mt-0.5 shrink-0" style={{ color: accentColor }} />
                            <span>{data.personal_info.linkedin}</span>
                        </div>
                    )}
                    {data.personal_info?.website && (
                        <div className="flex items-start gap-3 text-slate-600 break-all">
                            <Globe size={16} className="mt-0.5 shrink-0" style={{ color: accentColor }} />
                            <span>{data.personal_info.website}</span>
                        </div>
                    )}
                </div>

                {/* Education */}
                {data.education && data.education.length > 0 && (
                    <div className="px-8 py-4">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 border-b border-slate-200 pb-2">
                            Education
                        </h3>
                        <div className="space-y-5">
                            {data.education.map((edu, index) => (
                                <div key={index}>
                                    <div className="font-bold text-slate-700 leading-tight">{edu.degree}</div>
                                    <div className="text-sm text-slate-500 mt-1">{edu.institution}</div>
                                    <div className="text-xs text-slate-400 mt-1">{formatDate(edu.graduation_date)}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Skills */}
                {data.skills && data.skills.length > 0 && (
                    <div className="px-8 py-4 flex-grow">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 border-b border-slate-200 pb-2">
                            Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map((skill, index) => (
                                <span key={index} className="bg-white border border-slate-200 px-3 py-1 rounded text-sm text-slate-600 font-medium shadow-sm">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </aside>


            {/* --- RIGHT CONTENT (Summary, Experience, Projects) --- */}
            <main className="w-[68%] p-10">

                {/* Header */}
                <header className="mb-8 border-b border-slate-100 pb-8">
                    <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight uppercase" style={{ color: accentColor }}>
                        {data.personal_info?.full_name || "Your Name"}
                    </h1>
                    <p className="text-lg font-medium text-slate-500 mt-2 tracking-wide">
                        {data.personal_info?.profession || "Professional Title"}
                    </p>
                </header>

                {/* Summary */}
                {data.professional_summary && (
                    <section className="mb-10">
                        <h2 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2 text-slate-800">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
                            Professional Summary
                        </h2>
                        <p className="text-slate-600 leading-7 text-sm">
                            {data.professional_summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {data.experience && data.experience.length > 0 && (
                    <section className="mb-10">
                        <h2 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2 text-slate-800">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
                            Work Experience
                        </h2>

                        <div className="border-l-2 border-slate-100 ml-1 space-y-8">
                            {data.experience.map((exp, index) => (
                                <div key={index} className="relative pl-6">
                                    {/* Timeline Dot */}
                                    <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white" style={{ backgroundColor: accentColor }}></div>

                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-lg text-slate-800">{exp.position}</h3>
                                        <span className="text-xs font-semibold text-slate-400 bg-slate-50 px-2 py-1 rounded">
                                            {formatDate(exp.start_date)} – {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                        </span>
                                    </div>

                                    <div className="text-sm font-medium text-slate-500 mb-3">{exp.company}</div>

                                    {exp.description && (
                                        <ul className="list-disc list-outside ml-4 text-sm text-slate-600 leading-relaxed space-y-1 marker:text-slate-300">
                                            {exp.description.split('\n').map((line, i) => (
                                                <li key={i}>{line}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {data.project && data.project.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2 text-slate-800">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
                            Key Projects
                        </h2>

                        <div className="grid grid-cols-1 gap-5">
                            {data.project.map((proj, index) => (
                                <div key={index} className="bg-slate-50 rounded-lg p-5 hover:bg-slate-100 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-slate-800">{proj.name}</h3>
                                        <span className="text-xs font-medium text-slate-400 border border-slate-200 px-2 py-0.5 rounded bg-white">
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

            </main>
        </div>
    );
}

export default ModernSidebarTemplate;