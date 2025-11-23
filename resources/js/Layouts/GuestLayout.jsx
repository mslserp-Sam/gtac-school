import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div
            className="flex min-h-screen flex-col items-center pt-10 sm:justify-center sm:pt-0"
            style={{ backgroundColor: '#F2F' }}
        >
            <div className="flex items-center gap-3 mb-4">
                <Link href="/" className="flex items-center gap-3">
                    <img src="/storage/images/gtacLogo.png" alt="GTAC Logo" className="h-16 w-16" />
                    <span className="text-xl font-semibold text-gtac-600 hidden sm:inline-block">GTAC Admin</span>
                </Link>
            </div>

            <div className="mt-4 w-full overflow-hidden bg-white px-8 py-6 shadow-xl sm:max-w-md sm:rounded-2xl border border-gray-100">
                {children}
            </div>
        </div>
    );
}
