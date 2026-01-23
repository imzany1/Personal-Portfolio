import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

// Sun Icon Component
const SunIcon = () => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

// Moon Icon Component
const MoonIcon = () => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { isDark, toggleTheme } = useTheme();

    // Effect to handle scroll detection
    useEffect(() => {
        const handleScroll = () => {
            // Set state to true if user has scrolled more than 10px, else false
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        // Add scroll event listener when the component mounts
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    // This function will be called when a mobile link is clicked
    const handleLinkClick = () => {
        setIsOpen(false);
    };

    // Conditionally apply classes for the glassmorphism effect
    const navClasses = isScrolled
        ? isDark 
            ? 'backdrop-blur-md bg-gray-900/80 shadow-lg border-b border-white/10'
            : 'backdrop-blur-md bg-white/80 shadow-lg border-b border-gray-200'
        : 'bg-transparent';
    
    // Theme-aware text colors
    const textColor = isDark ? 'text-white' : 'text-gray-800';
    const hoverColor = 'hover:text-green-500';
    const mobileMenuBg = isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-200/50';

    return (
        <nav className="fixed w-full z-50 transition-all duration-300">
            <div className={`transition-all duration-300 ${navClasses}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo/Brand */}
                        <div className="flex-shrink-0">
                            <a href="#home" className={`text-xl font-bold ${textColor} transition-colors duration-300`}>Hussain</a>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center">
                            <div className="ml-10 flex items-center space-x-8">
                                <a href="#home" className={`${textColor} ${hoverColor} transition-colors duration-300`}>Home</a>
                                <a href="#about" className={`${textColor} ${hoverColor} transition-colors duration-300`}>About</a>
                                <a href="#projects" className={`${textColor} ${hoverColor} transition-colors duration-300`}>Projects</a>
                                <a href="#contact" className={`${textColor} ${hoverColor} transition-colors duration-300`}>Contact</a>
                                
                                {/* Theme Toggle Button */}
                                <button
                                    onClick={toggleTheme}
                                    className={`p-2 rounded-full ${textColor} ${hoverColor} transition-all duration-300 hover:bg-gray-500/20`}
                                    aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                                >
                                    {isDark ? <SunIcon /> : <MoonIcon />}
                                </button>
                            </div>
                        </div>

                        {/* Mobile menu button and theme toggle */}
                        <div className="md:hidden flex items-center space-x-2">
                            {/* Theme Toggle Button for Mobile */}
                            <button
                                onClick={toggleTheme}
                                className={`p-2 rounded-full ${textColor} ${hoverColor} transition-all duration-300`}
                                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                            >
                                {isDark ? <SunIcon /> : <MoonIcon />}
                            </button>
                            
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className={`inline-flex items-center justify-center p-2 rounded-md ${textColor} ${hoverColor} focus:outline-none`}
                                aria-controls="mobile-menu"
                                aria-expanded={isOpen}
                            >
                                <span className="sr-only">Open main menu</span>
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    {isOpen ? (
                                        <path d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden" id="mobile-menu">
                        <div className={`px-2 pt-2 pb-3 space-y-1 ${isDark ? 'bg-gray-900/90' : 'bg-white/90'} backdrop-blur-md`}>
                            <a href="#home" onClick={handleLinkClick} className={`block px-3 py-2 rounded-md text-base font-medium ${textColor} ${hoverColor} ${mobileMenuBg} transition-colors duration-300`}>Home</a>
                            <a href="#about" onClick={handleLinkClick} className={`block px-3 py-2 rounded-md text-base font-medium ${textColor} ${hoverColor} ${mobileMenuBg} transition-colors duration-300`}>About</a>
                            <a href="#projects" onClick={handleLinkClick} className={`block px-3 py-2 rounded-md text-base font-medium ${textColor} ${hoverColor} ${mobileMenuBg} transition-colors duration-300`}>Projects</a>
                            <a href="#contact" onClick={handleLinkClick} className={`block px-3 py-2 rounded-md text-base font-medium ${textColor} ${hoverColor} ${mobileMenuBg} transition-colors duration-300`}>Contact</a>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

