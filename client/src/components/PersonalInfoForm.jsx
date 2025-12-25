import { BriefcaseBusiness, Globe, Linkedin, Mail, MapPin, Phone, User, Camera, Sparkles } from 'lucide-react'
import React from 'react'

const PersonalInfoForm = ({ data, onChange, removeBackground, setRemoveBackground }) => {

    const handleChange = (field, value) => {
        onChange({ ...data, [field]: value })
    }

    const fields = [
        { key: "full_name", label: "Full Name", icon: User, type: "text", required: true, colSpan: "col-span-2" },
        { key: "profession", label: "Current Profession / Job Title", icon: BriefcaseBusiness, type: "text", required: true, colSpan: "col-span-2" },
        { key: "email", label: "Email Address", icon: Mail, type: "email", required: true, colSpan: "col-span-1" },
        { key: "phone", label: "Phone Number", icon: Phone, type: "tel", colSpan: "col-span-1" },
        { key: "location", label: "City, Country", icon: MapPin, type: "text", colSpan: "col-span-2" },
        { key: "linkedin", label: "LinkedIn Profile URL", icon: Linkedin, type: "url", colSpan: "col-span-1" },
        { key: "website", label: "Portfolio / Website URL", icon: Globe, type: "url", colSpan: "col-span-1" },
    ]

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">

            {/* Header */}
            <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-100">
                <h3 className='text-lg font-bold text-slate-800 flex items-center gap-2'>
                    <User className="w-5 h-5 text-blue-600" />
                    Personal Details
                </h3>
                <p className='text-sm text-slate-500 mt-1'>This information will appear at the top of your resume.</p>
            </div>

            <div className="p-6 md:p-8 space-y-8">

                {/* --- Image Upload Section --- */}
                <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl border border-dashed border-slate-200 bg-slate-50/50">
                    <div className="relative group">
                        <label className="cursor-pointer block relative">
                            <div className={`w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md transition-all group-hover:shadow-lg ${!data.image ? 'bg-slate-200 flex items-center justify-center' : ''}`}>
                                {data.image ? (
                                    <img
                                        src={typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image)}
                                        alt="Profile"
                                        className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                                    />
                                ) : (
                                    <User className="w-10 h-10 text-slate-400" />
                                )}
                            </div>

                            {/* Overlay Icon */}
                            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <Camera className="w-8 h-8 text-white" />
                            </div>

                            <input type="file" accept='image/jpeg, image/png, image/jpg' className='hidden' onChange={(e) => handleChange("image", e.target.files[0])} />
                        </label>

                        {/* Edit Badge */}
                        <div className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full border-2 border-white shadow-sm pointer-events-none">
                            <Camera className="w-3 h-3" />
                        </div>
                    </div>

                    <div className="flex-1 text-center sm:text-left space-y-3">
                        <div>
                            <h4 className="font-semibold text-slate-800">Profile Photo</h4>
                            <p className="text-xs text-slate-500">Upload a professional headshot (JPG/PNG)</p>
                        </div>

                        {typeof data.image === 'object' && (
                            <div className="inline-flex items-center gap-3 bg-white px-3 py-2 rounded-lg border border-slate-200 shadow-sm">
                                <div className={`p-1.5 rounded-full ${removeBackground ? 'bg-purple-100 text-purple-600' : 'bg-slate-100 text-slate-500'}`}>
                                    <Sparkles className="w-4 h-4" />
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className="text-xs font-semibold text-slate-700">AI Background Removal</span>
                                    <span className="text-[10px] text-slate-500">Automatically clear background</span>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer ml-2">
                                    <input type="checkbox" className="sr-only peer" onChange={() => setRemoveBackground(prev => !prev)} checked={removeBackground} />
                                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                                </label>
                            </div>
                        )}
                    </div>
                </div>

                {/* --- Form Grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                    {fields.map((field) => {
                        const Icon = field.icon;
                        return (
                            <div key={field.key} className={field.colSpan || "col-span-1"}>
                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
                                    {field.label} {field.required && <span className="text-red-500">*</span>}
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Icon className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                                    </div>
                                    <input
                                        type={field.type}
                                        value={data[field.key] || ""}
                                        onChange={(e) => handleChange(field.key, e.target.value)}
                                        className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200 sm:text-sm font-medium"
                                        placeholder={`e.g. ${field.label === "Email Address" ? "john@example.com" : field.label === "Phone Number" ? "+1 234 567 890" : ""}`}
                                        required={field.required}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default PersonalInfoForm