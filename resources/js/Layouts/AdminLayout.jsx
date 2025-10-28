import { Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function AdminLayout({ children }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navigation = [
        { name: 'Dashboard', href: '/admin/dashboard' },
        { name: 'Courses', href: '/admin/courses' },
        { name: 'Gallery', href: '/admin/gallery' },
        { name: 'Contact Inquiries', href: '/admin/contact-inquiries' },
        { name: 'Pages', href: '/admin/pages' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className="bg-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <Link href="/admin/dashboard" className="flex items-center space-x-2">
                                    <img 
                                        src="/images/gtacLogo.png" 
                                        alt="GTAC School Logo" 
                                        className="h-8 w-auto"
                                    />
                                    <span className="text-xl font-bold text-gtac-600">GTAC Admin</span>
                                </Link>
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/"
                                className="text-gray-500 hover:text-gray-700 text-sm"
                            >
                                View Site
                            </Link>
                            <Link
                                href="/profile"
                                className="text-gray-500 hover:text-gray-700 text-sm"
                            >
                                Profile
                            </Link>
                            <button
                                onClick={() => router.post('/logout')}
                                className="text-gray-500 hover:text-gray-700 text-sm"
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </div>
    );
}

