import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function MainLayout({ children, footerSettings: propFooterSettings }) {
    const { footerSettings: sharedFooterSettings } = usePage().props;
    const footerSettings = propFooterSettings || sharedFooterSettings || {};
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    useScrollAnimation();

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setShowScrollTop(scrollY > 400);
            setIsScrolled(scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();
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
            <nav className={`fixed top-0 left-0 right-0 transition-all duration-300 z-50 ${
                isScrolled || isMenuOpen
                    ? 'bg-gtac-600 shadow-lg' 
                    : 'bg-transparent backdrop-blur-sm'
            }`}>
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo - Left */}
                        <div className='flex items-center justify-center'>
                            <div className="flex-shrink-0 testing-samuel-belen">
                                <Link href="/">
                                    <div className={`flex items-center px-3 pb-2 pt-5 rounded-b-lg transition-all duration-300 ${
                                        isScrolled 
                                            ? 'bg-white/90 backdrop-blur-sm' 
                                            : 'bg-white/90 backdrop-blur-sm'
                                    }`}>
                                        <img 
                                            src="/storage/images/gtacLogo.png" 
                                            alt="GTAC School Logo" 
                                            className="h-12 w-auto"
                                        />
                                    </div>
                                </Link>
                            </div>

                            <div className="ml-3">
                                <span className="text-xl font-bold text-[#f0f0f0]">
                                    GENESIS TRAINING AND ASSESSMENT CENTER
                                </span>
                            </div>
                        </div>
                        {/* Navigation Links - Right */}
                        <div className="hidden sm:flex items-center space-x-2">
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
                                    className={`px-3 py-2 text-md font-medium transition-colors duration-200 ${
                                        isScrolled 
                                            ? 'text-white hover:text-gtac-200' 
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
                                    isScrolled 
                                        ? 'text-white hover:text-gtac-200' 
                                        : 'text-white hover:text-gtac-200 drop-shadow-lg'
                                }`}
                                aria-label="Toggle menu"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    {isMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="sm:hidden bg-gtac-600 shadow-lg">
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
                                    className="border-transparent text-white hover:bg-gtac-700 hover:border-gtac-400 block pl-3 pr-4 py-2 border-l-4 text-base font-medium cursor-pointer transition-colors"
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
            <footer className="bg-[#1c1c1c] text-white mt-16">
                <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <div className="flex items-center justify-start gap-4 mb-4">
                                <div className="flex-shrink-0 bg-white/70 rounded-full p-1">
                                    <img 
                                        src="/storage/images/gtacLogo.png" 
                                        alt="GTAC Logo" 
                                        className="h-10 md:h-17 w-auto"
                                    />
                                </div>
                                <div className="align-center">
                                    <h3 className="text-lg font-semibold mb-4">{footerSettings?.company_name || 'GTAC'}</h3>
                                </div>
                            </div>
                            <p className="text-gray-400 mb-2">{footerSettings?.company_full_name || 'Genesis Training and Assessment Center Inc.'}</p>
                            <p className="text-gray-400">
                                {footerSettings?.description || 'Empowering students through quality education and personalized learning experiences.'}
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
                            <h3 className="text-lg font-semibold mb-4">{footerSettings?.contact_title || 'Contact'}</h3>
                            {footerSettings?.contact_email && <p className="text-gray-400 mb-2">Email: {footerSettings.contact_email}</p>}
                            {/* Temporarily hidden: {footerSettings?.contact_phone_1 && <p className="text-gray-400 mb-2">Phone: {footerSettings.contact_phone_1}</p>} */}
                            {footerSettings?.contact_phone_2 && <p className="text-gray-400 mb-2">Mobile: {footerSettings.contact_phone_2}</p>}
                            {footerSettings?.contact_address && <p className="text-gray-400" dangerouslySetInnerHTML={{ __html: `Address: ${footerSettings.contact_address}` }} />}
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
                        <p>{footerSettings?.copyright || '© 2025 Genesis Training and Assessment Center Inc. All rights reserved.'}</p>
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

