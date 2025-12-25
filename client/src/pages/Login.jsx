import { Lock, Mail, User2Icon, ArrowRight, Loader2 } from 'lucide-react'
import React from 'react'
import api from '../configs/api'
import { useDispatch } from 'react-redux'
import { login } from '../app/features/authSlice'
import toast from 'react-hot-toast'

const Login = () => {

    const query = new URLSearchParams(window.location.search)
    const urlState = query.get('state')
    const dispatch = useDispatch();

    const [state, setState] = React.useState(urlState || "login")
    const [isLoading, setIsLoading] = React.useState(false); // Added for UI feedback

    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // Added a small artificial delay if api is too fast, just for the visual effect (optional)
            // await new Promise(r => setTimeout(r, 800)); 

            const { data } = await api.post(`/api/users/${state}`, formData)
            dispatch(login(data))
            localStorage.setItem('token', data.token)
            toast.success(data.message);
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message);
        } finally {
            setIsLoading(false);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    // Toggle function to reset form data when switching modes
    const toggleState = () => {
        setState(prev => prev === "login" ? "register" : "login");
        setFormData({ name: '', email: '', password: '' });
    }

    return (
        <div className='relative flex items-center justify-center min-h-screen overflow-hidden bg-slate-50'>

            {/* Animated Background Elements */}
            <div className="absolute inset-0 w-full h-full bg-slate-50">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-green-200/40 blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200/40 blur-[100px] animate-pulse delay-1000"></div>
                <div className="absolute top-[20%] right-[20%] w-[20%] h-[20%] rounded-full bg-purple-200/30 blur-[80px]"></div>
            </div>

            {/* Glassmorphism Card */}
            <div className="relative z-10 w-full max-w-md p-8 sm:p-10 mx-4 transition-all duration-300 ease-in-out transform bg-white/80 backdrop-blur-xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl">

                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-xl bg-green-100 text-green-600">
                        {state === 'login' ? <Lock size={24} /> : <User2Icon size={24} />}
                    </div>
                    <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
                        {state === "login" ? "Welcome Back" : "Create Account"}
                    </h1>
                    <p className="text-slate-500 mt-2 text-sm">
                        {state === "login" ? "Enter your credentials to access your account" : "Fill in the details below to get started"}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Name Input (Register Only) */}
                    <div className={`transition-all duration-300 ease-in-out overflow-hidden ${state !== "login" ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="group relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <User2Icon className="h-5 w-5 text-slate-400 group-focus-within:text-green-500 transition-colors" />
                            </div>
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 text-sm font-medium"
                                value={formData.name}
                                onChange={handleChange}
                                required={state === "register"}
                            />
                        </div>
                    </div>

                    {/* Email Input */}
                    <div className="group relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-green-500 transition-colors" />
                        </div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email address"
                            className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 text-sm font-medium"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="space-y-1">
                        <div className="group relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-green-500 transition-colors" />
                            </div>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 text-sm font-medium"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {state === 'login' && (
                            <div className="flex justify-end">
                                <button type="button" className="text-xs font-medium text-green-600 hover:text-green-700 hover:underline">
                                    Forgot password?
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="group relative w-full flex items-center justify-center py-3.5 px-4 border border-transparent rounded-xl text-sm font-bold text-white bg-green-600 hover:bg-green-700 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-green-600/20 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative flex items-center gap-2">
                            {isLoading ? (
                                <>
                                    <Loader2 className="animate-spin h-5 w-5" />
                                    <span>Processing...</span>
                                </>
                            ) : (
                                <>
                                    <span>{state === "login" ? "Sign In" : "Create Account"}</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </div>
                    </button>

                    {/* Toggle Mode */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white/50 backdrop-blur text-slate-500">Or</span>
                        </div>
                    </div>

                    <p className="text-center text-sm text-slate-600">
                        {state === "login" ? "Don't have an account?" : "Already have an account?"}
                        <button
                            type="button"
                            onClick={toggleState}
                            className="ml-1 font-bold text-green-600 hover:text-green-700 hover:underline focus:outline-none transition-colors"
                        >
                            {state === "login" ? "Sign up" : "Log in"}
                        </button>
                    </p>
                </form>
            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
                * { font-family: 'Poppins', sans-serif; }
            `}</style>
        </div>
    )
}

export default Login