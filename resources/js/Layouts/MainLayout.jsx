import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { useStickyNav, useScrollAnimation } from '../hooks/useScrollAnimation';

export default function MainLayout({ children }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const isSticky = useStickyNav();
    useScrollAnimation();

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navigation = [
        { name: 'Home', href: '#home' },
        { name: 'Courses', href: '#courses' },
        { name: 'Gallery', href: '#gallery' },
        { name: 'Vision & Mission', href: '#vision-mission' },
        { name: 'Contact', href: '#contact' },
        { name: 'Location', href: '#location' },
    ];

    useEffect(() => {
        // Smooth scrolling for anchor links
        const handleClick = (e) => {
            const href = e.target.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const element = document.querySelector(href);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    setIsMenuOpen(false);
                }
            }
        };

        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', handleClick);
        });

        // Parallax scroll effect
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    document.documentElement.style.setProperty('--scroll-y', scrollY);
                    
                    // Reveal elements on scroll
                    const reveals = document.querySelectorAll('.scroll-reveal');
                    reveals.forEach((element) => {
                        const elementTop = element.getBoundingClientRect().top;
                        const elementVisible = 150;
                        if (elementTop < window.innerHeight - elementVisible) {
                            element.classList.add('revealed');
                        }
                    });
                    
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => {
            document.querySelectorAll('a[href^="#"]').forEach(link => {
                link.removeEventListener('click', handleClick);
            });
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className={`absolute top-0 left-0 right-0 transition-all duration-300 z-50 ${isSticky ? 'fixed backdrop-blur-md bg-white/90 shadow-lg' : ''}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo - Left */}
                        <div className="flex-shrink-0">
                            <Link href="/">
                                <div className={`px-3 pb-2 pt-5 rounded-b-lg transition-all duration-300 ${isSticky ? '' : 'bg-white/90 backdrop-blur-sm'}`}>
                                    <img 
                                        src="/images/gtacLogo.png" 
                                        alt="GTAC School Logo" 
                                        className="h-12 w-auto"
                                    />
                                </div>
                            </Link>
                        </div>

                        {/* Navigation Links - Right */}
                        <div className="hidden sm:flex items-center space-x-4">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const element = document.querySelector(item.href);
                                        if (element) {
                                            element.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }}
                                    className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                                        isSticky 
                                            ? 'text-gray-700 hover:text-gtac-600' 
                                            : 'text-white hover:text-gtac-200'
                                    }`}
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                        <div className="sm:hidden flex items-center">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className={`inline-flex items-center justify-center p-2 rounded-md transition-colors duration-200 ${
                                    isSticky 
                                        ? 'text-gray-700 hover:text-gtac-600' 
                                        : 'text-white hover:text-gtac-200'
                                }`}
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {isMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                        <div className="sm:hidden">
                        <div className="pt-2 pb-3 space-y-1">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const element = document.querySelector(item.href);
                                        if (element) {
                                            element.scrollIntoView({ behavior: 'smooth' });
                                            setIsMenuOpen(false);
                                        }
                                    }}
                                    className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium cursor-pointer"
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main>{children}</main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white mt-16">
                <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <div className="flex items-center justify-start gap-4 mb-4">
                                <div className="flex-shrink-0 bg-white/70 rounded-full p-1">
                                    <img 
                                        src="/images/gtacLogo.png" 
                                        alt="GTAC Logo" 
                                        className="h-10 md:h-17 w-auto"
                                    />
                                </div>
                                <div className="align-center">
                                    <h3 className="text-lg font-semibold mb-4">GTAC</h3>
                                </div>
                            </div>
                            <p className="text-gray-400 mb-2">Genesis Training and Assessment Center Inc.</p>
                            <p className="text-gray-400">
                                Empowering students through quality education and personalized learning experiences.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                            <ul className="space-y-2 text-gray-400">
                                {navigation.map((item) => (
                                    <li key={item.name}>
                                        <Link href={item.href} className="hover:text-white">
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Contact</h3>
                            <p className="text-gray-400 mb-2">Email: GTACINC2024@YAHOO.COM</p>
                            <p className="text-gray-400 mb-2">Phone: (049) 544-7609</p>
                            <p className="text-gray-400 mb-2">Mobile: 0928-208-4959</p>
                            <p className="text-gray-400">Address: Phase 2, Lynville Subd., Brgy. Bagumbayan, Santa Cruz, Laguna</p>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
                        <p>&copy; 2025 Genesis Training and Assessment Center Inc. All rights reserved.</p>
                    </div>
                </div>
            </footer>

            {/* Scroll to Top Button */}
            <button
                id="scroll-to-top"
                className={`fixed bottom-8 right-8 bg-gtac-600 text-white p-3 rounded-full shadow-lg hover:bg-gtac-700 transition-all duration-300 z-50 ${
                    showScrollTop ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
            </button>
        </div>
    );
}

