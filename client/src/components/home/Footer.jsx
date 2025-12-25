import React from 'react';
import { Dribbble, Github, Linkedin, Mail, Send, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="relative bg-slate-50 pt-20 pb-10 overflow-hidden border-t border-slate-200">

            {/* Background Pattern (Consistent with Hero) */}
            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">

                {/* Top Section: Newsletter CTA */}
                <div className="bg-slate-900 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-slate-200 mb-20">
                    <div className="space-y-2 text-center md:text-left">
                        <h3 className="text-2xl md:text-3xl font-bold text-white">Ready to build your future?</h3>
                        <p className="text-slate-400">Join 10,000+ users building professional resumes today.</p>
                    </div>
                    <div className="flex w-full max-w-md bg-white/10 p-1.5 rounded-full border border-white/10 backdrop-blur-sm focus-within:bg-white/20 transition-colors">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 bg-transparent px-4 py-2 text-white placeholder:text-slate-400 outline-none w-full"
                        />
                        <button className="bg-green-500 hover:bg-green-400 text-slate-900 font-semibold px-6 py-2 rounded-full transition-all flex items-center gap-2 group">
                            <span>Join</span>
                            <Send className="size-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Main Footer Content */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">

                    {/* Brand Column */}
                    <div className="col-span-2 lg:col-span-2 space-y-6">
                        <a href="/" className="inline-block">
                            <img src="/logo.png" alt="Resumefy" className='h-9 w-auto' />
                        </a>
                        <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                            Resumefy helps you create professional, ATS-friendly resumes in minutes using the power of AI. Land your dream job faster.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: Twitter, href: "https://twitter.com" },
                                { icon: Linkedin, href: "https://www.linkedin.com/in/aaftab-670888333?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BeNXTuXC5QHKUz2obeLD67g%3D%3D" },
                                { icon: Dribbble, href: "https://aaftab-wine.vercel.app" },
                                { icon: Github, href: "https://github.com/mohdaaftab034" }
                            ].map((Social, index) => (
                                <a
                                    key={index}
                                    href={Social.href}
                                    className="size-10 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-500 hover:text-white hover:bg-slate-900 hover:border-slate-900 transition-all duration-300 hover:-translate-y-1 shadow-sm"
                                >
                                    <Social.icon className="size-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="space-y-6">
                        <h4 className="font-bold text-slate-900">Product</h4>
                        <ul className="space-y-4 text-sm text-slate-500">
                            {['Features', 'Templates', 'Pricing', 'AI Writer', 'ATS Check'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="hover:text-green-600 transition-colors hover:translate-x-1 inline-block duration-200">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="font-bold text-slate-900">Resources</h4>
                        <ul className="space-y-4 text-sm text-slate-500">
                            {['Blog', 'Career Advice', 'Community', 'Help Center'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="hover:text-green-600 transition-colors hover:translate-x-1 inline-block duration-200">{item}</a>
                                </li>
                            ))}
                            <li>
                                <a href="#" className="hover:text-green-600 transition-colors hover:translate-x-1 inline-flex items-center gap-2 duration-200">
                                    Partners
                                    <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">New</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="font-bold text-slate-900">Company</h4>
                        <ul className="space-y-4 text-sm text-slate-500">
                            {['About Us', 'Careers', 'Privacy Policy', 'Terms of Service'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="hover:text-green-600 transition-colors hover:translate-x-1 inline-block duration-200">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
                    <p>© 2025 Resumefy build by MOHD AAFTAB</p>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <span className="size-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span>All Systems Operational</span>
                        </div>
                        <a href="mailto:support@resumefy.com" className="flex items-center gap-2 hover:text-slate-600 transition-colors">
                            <Mail className="size-4" /> Support
                        </a>
                    </div>
                </div>
            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
                * { font-family: 'Poppins', sans-serif; }
            `}</style>
        </footer>
    );
}

export default Footer;