import React from 'react'

const CallToAction = () => {
    return (
        <div id='cta' className='px-4 sm:px-10 mt-28 mb-20'>
            <div className="relative w-full max-w-5xl mx-auto rounded-[2.5rem] overflow-hidden bg-slate-900 text-white shadow-2xl shadow-slate-900/40">

                {/* Decorative background glows */}
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-green-500/20 rounded-full blur-[80px]"></div>
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

                <div className="relative z-10 flex flex-col md:flex-row text-center md:text-left items-center justify-between gap-8 px-8 md:px-16 py-16 sm:py-20">
                    <div className="max-w-xl space-y-4">
                        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                            Build a Professional Resume <br />
                            <span className="text-green-400">That Gets You Hired.</span>
                        </h2>
                        <p className="text-slate-400 text-lg">Join thousands of professionals who have advanced their careers with our AI tools.</p>
                    </div>

                    <a href="https://prebuiltui.com" className="group flex items-center gap-3 rounded-full py-4 px-8 bg-green-500 hover:bg-green-400 text-slate-900 font-bold text-lg transition-all shadow-lg hover:shadow-green-500/25 active:scale-95">
                        <span>Get Started Now</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5 transition-transform group-hover:translate-x-1"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default CallToAction