import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../Navbar';

const Hero = () => {
    const { user } = useSelector(state => state.auth);

    const logos = [
        "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
        "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg",
        "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png",
        "https://upload.wikimedia.org/wikipedia/commons/7/7b/Adobe_Systems_logo_and_wordmark.svg",
    ];

    return (
        <div id="home" className="relative min-h-screen bg-white overflow-hidden scroll-mt-24">
            {/* Mixed Color Background for Hero */}
            <div className="absolute top-0 left-0 w-full h-[600px] pointer-events-none opacity-60">
                <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] rounded-full bg-[#FDE3D2] blur-[120px]"></div>
                <div className="absolute top-[5%] -right-[5%] w-[45%] h-[45%] rounded-full bg-[#F1DEF0] blur-[130px]"></div>
                <div className="absolute top-[20%] left-[25%] w-[50%] h-[50%] rounded-full bg-[#D1DCF8] blur-[140px]"></div>
            </div>

            <Navbar />

            {/* Content Area */}
            <main className="relative pt-36 md:pt-48 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-16 lg:px-24">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-peach text-primary-accent text-sm font-semibold mb-8"
                >
                    <span className="flex h-2 w-2 rounded-xl bg-primary-accent animate-pulse"></span>
                    Powering 10,000+ Career Success Stories
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-slate-900 tracking-tight leading-[1.05] max-w-5xl"
                >
                    Build an AI-optimized <br className="hidden md:block" />
                    <span className="text-primary-accent italic">Resume</span> that gets results.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-8 text-lg md:text-xl text-slate-500 max-w-2xl leading-relaxed"
                >
                    Leverage advanced AI to craft professional resumes tailored
                    perfectly to job descriptions in minutes.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-12 flex flex-col sm:flex-row gap-5"
                >
                    <Link to="/app" className="px-10 py-5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all hover:shadow-2xl hover:shadow-black/10 active:scale-95">
                        Get Started Free
                    </Link>
                    <Link to="/templates" className="px-10 py-5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all active:scale-95">
                        View Examples
                    </Link>
                </motion.div>

                {/* Visual Mockup Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="mt-20 relative px-4 w-full max-w-6xl"
                >
                    <div className="absolute -inset-4 bg-orange-500/10 rounded-[2rem] blur-3xl opacity-50 z-0"></div>
                    <div className="relative z-10 rounded-2xl overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] border-4 border-white/50 backdrop-blur-sm animate-float">
                        <img 
                            src="/Users/skmishra19/.gemini/antigravity/brain/1e3b9bb4-f2f4-47aa-9706-40f028becc03/resume_builder_mockup_1774675200233.png" 
                            alt="Resume Builder Interface" 
                            className="w-full object-cover"
                        />
                    </div>
                </motion.div>
            </main>
            
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                }
                .animate-float { animation: float 6s ease-in-out infinite; }
            `}</style>

            <style>{`
                .text-primary-accent { color: #F95200; }
                .bg-primary-accent { background-color: #F95200; }
                .bg-brand-peach { background-color: #FFEDD4; }
                .hover\\:text-primary-accent:hover { color: #F95200; }
                .hover\\:shadow-orange-200:hover { --tw-shadow-color: rgba(249, 82, 0, 0.2); }
            `}</style>
        </div >
    );
}

export default Hero;
