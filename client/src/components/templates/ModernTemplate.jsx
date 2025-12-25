import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe, ExternalLink } from 'lucide-react';

const ExecutiveTemplate = ({ data, accentColor = '#374151' }) => {

	// Helper to format dates
	const formatDate = (dateStr) => {
		if (!dateStr) return "";
		const [year, month] = dateStr.split("-");
		const date = new Date(year, month - 1);
		return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
	};

	return (
		<div className="w-full max-w-[210mm] min-h-[297mm] mx-auto bg-white p-10 md:p-14 text-slate-800 shadow-2xl font-sans">

			{/* --- HEADER --- */}
			<header className="flex flex-col md:flex-row justify-between items-start mb-6 gap-6">

				{/* Name & Title */}
				<div className="flex-1">
					<h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 uppercase leading-none mb-2">
						{data.personal_info?.full_name || "Your Name"}
					</h1>
					<p className="text-xl text-slate-500 font-medium" style={{ color: accentColor }}>
						{data.personal_info?.job_title || "Professional Title"}
					</p>
				</div>

				{/* Contact Info */}
				<div className="flex flex-col gap-2 text-sm text-slate-600 md:items-end">
					{data.personal_info?.email && (
						<div className="flex items-center gap-2">
							<span>{data.personal_info.email}</span>
							<Mail size={14} style={{ color: accentColor }} />
						</div>
					)}
					{data.personal_info?.phone && (
						<div className="flex items-center gap-2">
							<span>{data.personal_info.phone}</span>
							<Phone size={14} style={{ color: accentColor }} />
						</div>
					)}
					{data.personal_info?.location && (
						<div className="flex items-center gap-2">
							<span>{data.personal_info.location}</span>
							<MapPin size={14} style={{ color: accentColor }} />
						</div>
					)}
					{data.personal_info?.linkedin && (
						<div className="flex items-center gap-2">
							<span className="truncate max-w-[150px]">{data.personal_info.linkedin}</span>
							<Linkedin size={14} style={{ color: accentColor }} />
						</div>
					)}
					{data.personal_info?.website && (
						<div className="flex items-center gap-2">
							<span className="truncate max-w-[150px]">{data.personal_info.website}</span>
							<Globe size={14} style={{ color: accentColor }} />
						</div>
					)}
				</div>
			</header>

			{/* Divider Line */}
			<hr className="border-t-2 mb-8 opacity-50" style={{ borderColor: accentColor }} />

			<div className="space-y-8">

				{/* --- SUMMARY --- */}
				{data.professional_summary && (
					<section>
						<h2 className="text-sm font-bold uppercase tracking-widest mb-3 text-slate-900 border-b border-slate-200 pb-1">
							Executive Summary
						</h2>
						<p className="text-slate-700 leading-7 text-[15px] text-justify">
							{data.professional_summary}
						</p>
					</section>
				)}

				{/* --- EXPERIENCE --- */}
				{data.experience && data.experience.length > 0 && (
					<section>
						<h2 className="text-sm font-bold uppercase tracking-widest mb-5 text-slate-900 border-b border-slate-200 pb-1">
							Professional Experience
						</h2>

						<div className="space-y-6">
							{data.experience.map((exp, index) => (
								<div key={index}>
									<div className="flex justify-between items-baseline">
										<h3 className="text-lg font-bold text-slate-800">
											{exp.position}
										</h3>
										<span className="text-sm font-semibold text-slate-500 whitespace-nowrap">
											{formatDate(exp.start_date)} – {exp.is_current ? "Present" : formatDate(exp.end_date)}
										</span>
									</div>

									<div className="text-base font-medium mb-2" style={{ color: accentColor }}>
										{exp.company}
									</div>

									{exp.description && (
										<div className="text-sm text-slate-600 leading-relaxed pl-2 border-l-2 border-slate-100 whitespace-pre-line">
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
						<h2 className="text-sm font-bold uppercase tracking-widest mb-5 text-slate-900 border-b border-slate-200 pb-1">
							Key Projects
						</h2>
						<div className="grid grid-cols-1 gap-5">
							{data.project.map((proj, index) => (
								<div key={index} className="bg-slate-50 p-4 rounded border border-slate-100">
									<div className="flex justify-between items-start mb-1">
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

				<div className="flex flex-col md:flex-row gap-8">

					{/* --- EDUCATION --- */}
					{data.education && data.education.length > 0 && (
						<section className="flex-1">
							<h2 className="text-sm font-bold uppercase tracking-widest mb-4 text-slate-900 border-b border-slate-200 pb-1">
								Education
							</h2>
							<div className="space-y-4">
								{data.education.map((edu, index) => (
									<div key={index}>
										<div className="font-bold text-slate-800">{edu.degree}</div>
										<div className="text-sm text-slate-600">{edu.institution}</div>
										<div className="text-xs text-slate-400 mt-0.5">
											{formatDate(edu.graduation_date)}
										</div>
									</div>
								))}
							</div>
						</section>
					)}

					{/* --- SKILLS --- */}
					{data.skills && data.skills.length > 0 && (
						<section className="flex-1">
							<h2 className="text-sm font-bold uppercase tracking-widest mb-4 text-slate-900 border-b border-slate-200 pb-1">
								Technical Skills
							</h2>
							<div className="flex flex-wrap gap-x-4 gap-y-2">
								{data.skills.map((skill, index) => (
									<div key={index} className="text-sm text-slate-700 flex items-center gap-2">
										<span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }}></span>
										{skill}
									</div>
								))}
							</div>
						</section>
					)}
				</div>

			</div>
		</div>
	);
}

export default ExecutiveTemplate;