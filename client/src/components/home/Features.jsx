import React from 'react'
import { Zap, Activity, ShieldCheck, FileBarChart } from 'lucide-react' // Assuming you have these
import Title from './Title';

const Features = () => {
    // Determine which card is "active" based on hover
    const [hoveredIndex, setHoveredIndex] = React.useState(null);

    return (
        <div id='features' className='relative py-20 px-6 max-w-7xl mx-auto scroll-mt-24'>

            <div className="flex flex-col items-center text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 border border-green-200 text-green-700 text-sm font-medium mb-6">
                    <Zap size={16} className="fill-green-700" />
                    <span>Simple Process</span>
                </div>
                {/* Fallback styling in case Title component has issues */}
                <div className="max-w-3xl">
                    <Title title='Build your resume' description='Our streamlined process helps you create a professional resume in minutes with intelligent AI-powered tools and features.' />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Visual Side */}
                <div className="relative group perspective-1000">
                    <div className="absolute -inset-4 bg-gradient-to-r from-green-300 to-blue-300 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition duration-1000"></div>
                    <img
                        className="relative rounded-2xl shadow-2xl border border-slate-200 w-full object-cover transform transition-transform duration-500 hover:rotate-1"
                        src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png"
                        alt="Platform Interface"
                    />
                </div>

                {/* List Side */}
                <div className="flex flex-col gap-5">

                    {/* Feature 1 */}
                    <div
                        onMouseEnter={() => setHoveredIndex(0)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${hoveredIndex === 0 ? 'bg-white border-violet-200 shadow-xl shadow-violet-100 scale-[1.02]' : 'bg-transparent border-transparent hover:bg-slate-50'}`}
                    >
                        <div className="flex gap-5 items-start">
                            <div className={`p-3 rounded-xl transition-colors ${hoveredIndex === 0 ? 'bg-violet-100 text-violet-600' : 'bg-slate-100 text-slate-500'}`}>
                                <Activity size={24} />
                            </div>
                            <div>
                                <h3 className={`text-lg font-bold mb-2 transition-colors ${hoveredIndex === 0 ? 'text-violet-900' : 'text-slate-800'}`}>Real-Time Analytics</h3>
                                <p className="text-slate-600 leading-relaxed text-sm">Get instant insights into your finances with live dashboards that update as you work.</p>
                            </div>
                        </div>
                    </div>

                    {/* Feature 2 */}
                    <div
                        onMouseEnter={() => setHoveredIndex(1)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${hoveredIndex === 1 ? 'bg-white border-green-200 shadow-xl shadow-green-100 scale-[1.02]' : 'bg-transparent border-transparent hover:bg-slate-50'}`}
                    >
                        <div className="flex gap-5 items-start">
                            <div className={`p-3 rounded-xl transition-colors ${hoveredIndex === 1 ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-500'}`}>
                                <ShieldCheck size={24} />
                            </div>
                            <div>
                                <h3 className={`text-lg font-bold mb-2 transition-colors ${hoveredIndex === 1 ? 'text-green-900' : 'text-slate-800'}`}>Bank-Grade Security</h3>
                                <p className="text-slate-600 leading-relaxed text-sm">End-to-end encryption, 2FA, and strict compliance with global GDPR standards.</p>
                            </div>
                        </div>
                    </div>

                    {/* Feature 3 */}
                    <div
                        onMouseEnter={() => setHoveredIndex(2)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${hoveredIndex === 2 ? 'bg-white border-orange-200 shadow-xl shadow-orange-100 scale-[1.02]' : 'bg-transparent border-transparent hover:bg-slate-50'}`}
                    >
                        <div className="flex gap-5 items-start">
                            <div className={`p-3 rounded-xl transition-colors ${hoveredIndex === 2 ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-500'}`}>
                                <FileBarChart size={24} />
                            </div>
                            <div>
                                <h3 className={`text-lg font-bold mb-2 transition-colors ${hoveredIndex === 2 ? 'text-orange-900' : 'text-slate-800'}`}>Customizable Reports</h3>
                                <p className="text-slate-600 leading-relaxed text-sm">Export professional, audit-ready financial reports perfect for tax season or internal review.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Features