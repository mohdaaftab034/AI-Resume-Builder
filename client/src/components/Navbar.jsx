import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../app/features/authSlice';
import { LogOut, User } from 'lucide-react';

const Navbar = () => {
    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutUser = () => {
        navigate('/');
        dispatch(logout());
    };

    // Get user initial safely
    const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

    return (
        <div className='sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 transition-all'>
            <nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between h-16'>

                    {/* Logo Section */}
                    <div className='flex-shrink-0'>
                        <Link to='/' className='flex items-center gap-2 group'>
                            {/* If you don't have a logo image, this is a text fallback, 
                                otherwise keep your img tag */}
                            <img
                                src="/logo.png"
                                alt="logo"
                                className='h-8 w-auto sm:h-10 transition-transform group-hover:scale-105'
                            />
                        </Link>
                    </div>

                    {/* Right Side Actions */}
                    <div className='flex items-center gap-4 sm:gap-6'>

                        {/* User Profile Pill */}
                        <div className='flex items-center gap-3 pl-4 border-l border-slate-200'>
                            <div className='flex flex-col items-end'>
                                <span className='text-sm font-semibold text-slate-700 hidden sm:block'>
                                    {user?.name || 'User'}
                                </span>
                                <span className='text-[10px] text-slate-500 uppercase tracking-wide hidden sm:block'>
                                    {user?.role || 'Member'}
                                </span>
                            </div>

                            {/* Avatar Circle */}
                            <div className='size-9 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-200 text-indigo-700 flex items-center justify-center font-bold text-sm shadow-sm ring-2 ring-white'>
                                {userInitial}
                            </div>
                        </div>

                        {/* Logout Button */}
                        <button
                            onClick={logoutUser}
                            className='group flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200'
                            title="Logout"
                        >
                            <LogOut className='size-5 transition-transform group-hover:-translate-x-1' />
                            <span className='hidden sm:inline'>Logout</span>
                        </button>
                    </div>

                </div>
            </nav>
        </div>
    );
};

export default Navbar;