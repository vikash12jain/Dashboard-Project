import React from 'react'
import { useEcom } from '../Context/EcomProvider';
import { Link, useNavigate } from 'react-router-dom';
import evertoneLogo from '../assets/evertone_logo.png';

const Header = () => {
    const { cart, user, mobileMenuOpen, setMobileMenuOpen } = useEcom();
    const navigate = useNavigate();
    return (
        // Header Container: Stronger shadow and a subtle accent line for separation.
        <header className="bg-stone-800 shadow-xl border-b border-amber-500/10 fixed top-0 left-0 right-0 z-50 font-serif">
            <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center py-3 sm:py-4">
                {/* Logo: Tracking-wider for a cleaner, artisan feel */}
               <Link to={'/'} ><img className='w-40' src={evertoneLogo} alt="" /></Link>
                {/* <a href="#" className="text-amber-100 text-xl sm:text-3xl font-extrabold tracking-wider transition-colors duration-300 hover:text-amber-300"></a> */}
                <nav className='flex items-center space-x-4 sm:space-x-6'>

                    {/* Mobile Icons (Cart and Menu Toggle) */}
                    <div className="flex items-center gap-2 md:hidden">
                        {/* Mobile Cart Button: Added hover/focus background for better touch feedback */}
                        <button 
                            onClick={() => navigate('/cart')} 
                            className="text-amber-100 p-2 rounded-full hover:bg-stone-700/50 focus:outline-none focus:ring-2 focus:ring-amber-500 relative transition-all duration-200" 
                            aria-label="Open cart"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.198 1.704.707 1.704H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            {/* Cart Badge: High contrast text on amber background */}
                            {cart.length > 0 && <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-stone-900 transform translate-x-1/2 -translate-y-1/2 bg-amber-400 rounded-full ring-2 ring-stone-800">{cart.length}</span>}
                        </button>
                        {/* Mobile Menu Toggle: Used a better contrast icon for visibility */}
                        <button 
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                            aria-expanded={mobileMenuOpen} 
                            className="text-amber-100 p-2 rounded-lg hover:bg-stone-700/50 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-200" 
                            aria-label="Toggle menu"
                        >
                            {/* Using Lucide-like SVG for better styling consistency than '✖'/'☰' */}
                            {mobileMenuOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                            )}
                        </button>
                    </div>

                    {/* Desktop Navigation Links (Hidden on mobile) */}
                    <ul className="hidden md:flex space-x-6 text-amber-100 items-center">
                        {/* Shop Link */}
                        {/* <li>
                            <button 
                                onClick={() => {
                                    navigate('/');
                                    setTimeout(() => {
                                        document.getElementById("Product-section")?.scrollIntoView({
                                            behavior: "smooth"
                                        });
                                    }, 50);
                                }} 
                                className="hover:text-amber-300 font-medium transition-colors p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                            >
                                Shop
                            </button>
                        </li> */}

                        {user ? (
                            <>
                                {/* Admin Link */}
                                {user.isAdmin && <li><button onClick={() => navigate('/admin')} className="hover:text-amber-300 font-medium transition-colors p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500">Admin</button></li>}

                                {/* Profile Button: Inherits color via fill="currentColor" */}
                                <li>
                                    <button 
                                        onClick={() => navigate('/profile')} 
                                        className="text-amber-100 hover:text-amber-300 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 hover:bg-stone-700/50 p-1 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    >
                                        {/* Profile SVG: Removed hardcoded fill and use 'currentColor' */}
                                        <svg fill="currentColor" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                                            width="100%" height="100%" viewBox="0 0 45.532 45.532"
                                            xmlSpace="preserve">
                                            <g>
                                                <path d="M22.766,0.001C10.194,0.001,0,10.193,0,22.766s10.193,22.765,22.766,22.765c12.574,0,22.766-10.192,22.766-22.765
                                                        S35.34,0.001,22.766,0.001z M22.766,6.808c4.16,0,7.531,3.372,7.531,7.53c0,4.159-3.371,7.53-7.531,7.53
                                                        c-4.158,0-7.529-3.371-7.529-7.53C15.237,10.18,18.608,6.808,22.766,6.808z M22.761,39.579c-4.149,0-7.949-1.511-10.88-4.012
                                                        c-0.714-0.609-1.126-1.502-1.126-2.439c0-4.217,3.413-7.592,7.631-7.592h8.762c4.219,0,7.619,3.375,7.619,7.592
                                                        c0,0.938-0.41,1.829-1.125,2.438C30.712,38.068,26.911,39.579,22.761,39.579z"/>
                                            </g>
                                        </svg>
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li><button onClick={() => navigate('/login')} className="hover:text-amber-300 font-medium transition-colors p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500">Login</button></li>
                        )}

                        {/* Desktop Cart Button */}
                        <li> 
                            <button 
                                onClick={() => navigate('/cart')} 
                                className="relative top-1 text-amber-100 hover:text-amber-300 transition-all duration-200 p-2 rounded-full hover:bg-stone-700/50 focus:outline-none focus:ring-2 focus:ring-amber-500"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.198 1.704.707 1.704H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                {cart.length > 0 && (
                                    // Cart Badge: Fixed syntax error here
                                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-stone-900 transform translate-x-1/2 -translate-y-1/2 bg-amber-400 rounded-full ring-2 ring-stone-800">{cart.length}</span>
                                )}
                            </button>
                        </li>
                    </ul>
                </nav>
                
                {/* Mobile Menu Dropdown */}
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop for accessibility */}
                        <div className="fixed inset-0 z-40" onClick={() => setMobileMenuOpen(false)} />
                        {/* Menu Container: Updated background to match header and added rounded corners/shadow */}
                        <div className="md:hidden absolute top-full right-4 mt-3 bg-stone-700 rounded-xl shadow-2xl z-50 w-56 transform origin-top-right transition-all duration-300" role="dialog" aria-modal="true">
                            <ul className="flex flex-col p-4 space-y-3 text-amber-100">
                                {/* Menu Links: Added block style and hover/focus feedback */}
                                <li>
                                    <button onClick={() => { navigate('/'); setMobileMenuOpen(false); document.getElementById('Product-section')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-left w-full p-2 rounded-lg hover:bg-stone-600 transition-colors">Shop</button>
                                </li>
                                {user ? (
                                    <>
                                        {user.isAdmin && <li><button onClick={() => { navigate('/admin'); setMobileMenuOpen(false); }} className="text-left w-full p-2 rounded-lg hover:bg-stone-600 transition-colors">Admin</button></li>}
                                        <li><button onClick={() => { navigate('/profile'); setMobileMenuOpen(false); }} className="text-left w-full p-2 rounded-lg hover:bg-stone-600 transition-colors">Profile</button></li>
                                    </>
                                ) : (
                                    <li><button onClick={() => { navigate('/login'); setMobileMenuOpen(false); }} className="text-left w-full p-2 rounded-lg hover:bg-stone-600 transition-colors">Login</button></li>
                                )}
                                <li><button onClick={() => { navigate('/cart'); setMobileMenuOpen(false); }} className="text-left w-full p-2 rounded-lg hover:bg-stone-600 transition-colors">Cart ({cart.length})</button></li>
                            </ul>
                        </div>
                    </>
                )}


            </div>
        </header>
    )
}

export default Header