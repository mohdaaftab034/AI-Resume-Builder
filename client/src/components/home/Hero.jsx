import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Hero = () => {
    const { user } = useSelector(state => state.auth);
    const [menuOpen, setMenuOpen] = React.useState(false);

    // Updated with high-quality logos of top companies
    const logos = [
        "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
        "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg",
        "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png",
        "https://upload.wikimedia.org/wikipedia/commons/7/7b/Adobe_Systems_logo_and_wordmark.svg",
        // Duplicated for infinite scroll seamless loop
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
        <>
            <div className="relative min-h-screen pb-20 overflow-hidden bg-slate-50">
                {/* Background Patterns */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
                    <div className="absolute right-0 bottom-0 -z-10 h-[310px] w-[310px] rounded-full bg-blue-400 opacity-20 blur-[100px]"></div>
                </div>

                {/* Navbar */}
                <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-40 text-sm bg-white/70 backdrop-blur-md border-b border-white/20 transition-all duration-300">
                    <a href="/" className="hover:opacity-80 transition-opacity">
                        <img src="/logo.png" alt="logo" className='h-8 w-auto sm:h-10 transition-transform group-hover:scale-105' />
                    </a>

                    <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
                        {['Home', 'Features', 'Testimonials', 'Contact'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-green-600 hover:bg-green-50 px-3 py-1.5 rounded-lg transition-all">{item}</a>
                        ))}
                    </div>

                    <div className="flex gap-3">
                        {!user && (
                            <>
                                <Link to='/app?state=register' className="hidden md:block px-6 py-2.5 bg-green-600 hover:bg-green-700 hover:shadow-lg hover:shadow-green-600/20 active:scale-95 transition-all rounded-full text-white font-medium">
                                    Get started
                                </Link>
                                <Link to='/app?state=login' className="hidden md:block px-6 py-2.5 border border-slate-200 active:scale-95 hover:bg-slate-100 hover:border-slate-300 transition-all rounded-full text-slate-700 font-medium" >
                                    Login
                                </Link>
                            </>
                        )}
                        {user && (
                            <Link to='/app' className='hidden md:block px-6 py-2.5 bg-green-600 hover:bg-green-700 hover:shadow-lg hover:shadow-green-600/20 active:scale-95 transition-all rounded-full text-white font-medium'>
                                Dashboard
                            </Link>
                        )}
                    </div>

                    <button onClick={() => setMenuOpen(true)} className="md:hidden p-2 rounded-lg hover:bg-slate-100 active:scale-90 transition-colors" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" className="lucide lucide-menu" >
                            <path d="M4 5h16M4 12h16M4 19h16" />
                        </svg>
                    </button>
                </nav>

                {/* Mobile Menu */}
                <div className={`fixed inset-0 z-[100] bg-white/95 backdrop-blur-xl flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-all duration-500 ease-in-out ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"}`} >
                    <a href="#" className="font-semibold text-2xl text-slate-800">Home</a>
                    <a href="#features" className="font-semibold text-2xl text-slate-800">Features</a>
                    <a href="#testimonials" className="font-semibold text-2xl text-slate-800">Testimonials</a>
                    <a href="#contact" className="font-semibold text-2xl text-slate-800">Contact</a>
                    <button onClick={() => setMenuOpen(false)} className="absolute top-8 right-8 p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 18 18" /></svg>
                    </button>
                </div>

                {/* Hero Content */}
                <div className="relative pt-32 flex flex-col items-center justify-center text-black px-4 md:px-16 lg:px-24 xl:px-40">

                    {/* Social Proof Pills */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="flex -space-x-4">
                            {[
                                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200",
                                "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
                                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
                                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200",
                                "https://randomuser.me/api/portraits/men/75.jpg"
                            ].map((src, i) => (
                                <img key={i} src={src} alt="user" className="w-10 h-10 object-cover rounded-full border-[3px] border-white shadow-sm transition-transform hover:-translate-y-1 hover:z-10" />
                            ))}
                        </div>
                        <div className="flex flex-col items-center sm:items-start">
                            <div className="flex gap-0.5">
                                {Array(5).fill(0).map((_, i) => (
                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                ))}
                            </div>
                            <p className="text-xs font-semibold text-slate-600">Used by 10,000+ users</p>
                        </div>
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl md:text-7xl font-bold max-w-5xl text-center mt-8 leading-[1.1] tracking-tight text-slate-900 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        Land your dream job with <br className="hidden md:block" />
                        <span className="bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent">AI-powered</span> Resumes.
                    </h1>

                    <p className="max-w-xl text-center text-lg text-slate-600 mt-6 mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-100">
                        Create, edit, and perfect professional resumes with intelligent AI assistance that tailors your profile to the job description.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
                        <Link to='/app' className="group relative w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white rounded-full px-8 py-4 transition-all hover:shadow-xl hover:shadow-green-900/10 active:scale-95">
                            <span className="font-medium">Get Started for Free</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 group-hover:translate-x-1 transition-transform"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                        </Link>
                        <button className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-white border border-slate-200 hover:border-green-300 hover:bg-green-50/50 text-slate-700 rounded-full px-8 py-4 transition-all hover:shadow-lg active:scale-95">
                            <div className="p-1 rounded-full bg-green-100 group-hover:bg-green-200 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="size-4 text-green-700"><path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.75 3c1.536 0 3.068.516 4.25 1.565C13.182 3.516 14.714 3 16.25 3c3.036 0 5.5 2.322 5.5 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.47.005z"></path></svg>
                            </div>
                            <span className="font-medium">View Examples</span>
                        </button>
                    </div>

                    <p className="py-8 text-sm font-semibold tracking-wider text-slate-400 uppercase mt-12">Trusted by leading brands</p>

                    {/* Infinite Scroll Logo Marquee */}
                    <div className="w-full max-w-5xl overflow-hidden relative fade-mask-x">
                        {/* Gradient Masks for fade effect */}
                        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10"></div>

                        <div className="flex gap-12 md:gap-20 animate-scroll whitespace-nowrap hover:paused py-4 items-center">
                            {logos.map((logo, index) => (
                                <img
                                    key={index}
                                    src={logo}
                                    alt="company logo"
                                    className="h-7 md:h-9 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 object-contain"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
                * { font-family: 'Poppins', sans-serif; }
                .paused { animation-play-state: paused; }
                
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-scroll {
                    animation: scroll 40s linear infinite;
                }
            `}</style>
        </>
    );
}

export default Hero