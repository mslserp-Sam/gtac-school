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
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F2F3F4' }}>
            <Head title="Admin Login - GTAC" />

            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <div className="relative flex items-center gap-2">
                        <img src="/storage/images/gtacLogo.png" alt="GTAC Logo" className="w-20 h-20" />| <span className="text-2xl font-bold text-gtac-600">GTAC Admin</span>
                    </div>
                </div>

                {/* Login Form Card */}
                <div className="bg-white rounded-lg p-8 shadow-xl">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                        <p className="text-gray-600 text-sm">Sign in to your admin account</p>
                    </div>

                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-700 bg-green-100 border border-green-300 rounded p-3">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gtac-500 focus:border-gtac-500 transition"
                                autoComplete="username"
                                autoFocus
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            {errors.email && <InputError message={errors.email} className="mt-2" />}
                        </div>

                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gtac-500 focus:border-gtac-500 transition"
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
                                <span className="ml-2 text-sm text-gray-600">
                                    Remember me
                                </span>
                            </label>
                        </div>

                        <div className="flex items-center justify-between">
                            {canResetPassword && (
                                <Link
                                    href="/forgot-password"
                                    className="text-sm text-gray-600 hover:text-gtac-600 transition"
                                >
                                    Forgot your password?
                                </Link>
                            )}

                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-3 rounded-lg font-semibold text-white bg-gtac-600 hover:bg-gtac-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? 'Signing in...' : 'LOG IN'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 pt-6 border-t border-gray-300">
                        <Link
                            href="/"
                            className="text-sm text-gray-600 hover:text-gtac-600 transition text-center block"
                        >
                            ← Back to website
                        </Link>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-gray-600 text-xs">
                        Genesis Training and Assessment Center Inc. © 2025
                    </p>
                </div>
            </div>
        </div>
    );
}
