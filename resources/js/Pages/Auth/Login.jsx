import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import InputText from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post('/login', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#1A1D29' }}>
            <Head title="Admin Login - GTAC" />

            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="flex justify-center mb-12">
                    <div className="relative">
                        <svg
                            className="w-20 h-20 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M12 14l9-5-9-5-9 5 9 5z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M12 14l6.364-3.682M12 20l4.5-2.5M12 14l-4.5-2.5M12 8.5L5.636 4.864M12 14l6.364 3.682M12 14v6.5M12 8.5V14"
                            />
                        </svg>
                    </div>
                </div>

                {/* Login Form Card */}
                <div style={{ backgroundColor: '#252936' }} className="rounded-lg p-8 shadow-xl">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
                        <p className="text-gray-400 text-sm">Sign in to your admin account</p>
                    </div>

                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-400 bg-green-900/30 border border-green-800 rounded p-3">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                style={{ backgroundColor: '#1A1D29', borderColor: '#4A5568' }}
                                className="w-full px-4 py-3 rounded-lg border text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                autoComplete="username"
                                autoFocus
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            {errors.email && <InputError message={errors.email} className="mt-2" />}
                        </div>

                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                style={{ backgroundColor: '#1A1D29', borderColor: '#4A5568' }}
                                className="w-full px-4 py-3 rounded-lg border text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            {errors.password && <InputError message={errors.password} className="mt-2" />}
                        </div>

                        <div className="flex items-center mb-6">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <span className="ml-2 text-sm text-gray-400">
                                    Remember me
                                </span>
                            </label>
                        </div>

                        <div className="flex items-center justify-between">
                            {canResetPassword && (
                                <Link
                                    href="/forgot-password"
                                    className="text-sm text-gray-400 hover:text-gray-300 transition"
                                >
                                    Forgot your password?
                                </Link>
                            )}

                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-3 rounded-lg font-semibold text-gray-800 bg-gray-300 hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? 'Signing in...' : 'LOG IN'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 pt-6 border-t border-gray-700">
                        <Link
                            href="/"
                            className="text-sm text-gray-400 hover:text-gray-300 transition text-center block"
                        >
                            ← Back to website
                        </Link>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-gray-500 text-xs">
                        Genesis Training and Assessment Center Inc. © 2025
                    </p>
                </div>
            </div>
        </div>
    );
}
