import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

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
        ? 'backdrop-blur-md bg-gray-900/80 shadow-lg border-b border-white/10'
        : 'bg-transparent';

    return (
        <nav className="fixed w-full z-50 transition-all duration-300">
            <div className={`transition-all duration-300 ${navClasses}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo/Brand */}
                        <div className="flex-shrink-0">
                            <a href="#home" className="text-xl font-bold text-white">Hussain</a>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-center space-x-8">
                                <a href="#home" className="text-white hover:text-green-400 transition-colors duration-300">Home</a>
                                <a href="#about" className="text-white hover:text-green-400 transition-colors duration-300">About</a>
                                <a href="#projects" className="text-white hover:text-green-400 transition-colors duration-300">Projects</a>
                                <a href="#contact" className="text-white hover:text-green-400 transition-colors duration-300">Contact</a>
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-green-400 focus:outline-none"
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
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <a href="#home" onClick={handleLinkClick} className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-green-400 hover:bg-gray-700/50 transition-colors duration-300">Home</a>
                            <a href="#about" onClick={handleLinkClick} className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-green-400 hover:bg-gray-700/50 transition-colors duration-300">About</a>
                            <a href="#projects" onClick={handleLinkClick} className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-green-400 hover:bg-gray-700/50 transition-colors duration-300">Projects</a>
                            <a href="#contact" onClick={handleLinkClick} className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-green-400 hover:bg-gray-700/50 transition-colors duration-300">Contact</a>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

