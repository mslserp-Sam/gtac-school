import MainLayout from '../Layouts/MainLayout';
import { useForm, usePage } from '@inertiajs/react';

export default function Contact() {
    const { flash } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/contact');
    };

    return (
        <MainLayout>
            <div className="bg-gradient-to-r from-gtac-600 to-gtac-700 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                    <p className="text-xl text-white/90">
                        We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {flash?.success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                        {flash.success}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                        <form onSubmit={submit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                                {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                                {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                                {errors.phone && <div className="text-red-500 text-sm mt-1">{errors.phone}</div>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    value={data.subject}
                                    onChange={(e) => setData('subject', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                                {errors.subject && <div className="text-red-500 text-sm mt-1">{errors.subject}</div>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    Message <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="message"
                                    rows="5"
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                                {errors.message && <div className="text-red-500 text-sm mt-1">{errors.message}</div>}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-gtac-600 text-white py-3 rounded-md font-semibold hover:bg-gtac-700 transition disabled:opacity-50"
                            >
                                {processing ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-semibold text-gray-700 mb-2">Email</h3>
                                <a href="mailto:contact@gtacschool.com" className="text-blue-600 hover:text-blue-800">
                                    contact@gtacschool.com
                                </a>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-700 mb-2">Phone</h3>
                                <a href="tel:+1234567890" className="text-blue-600 hover:text-blue-800">
                                    +1234567890
                                </a>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-700 mb-2">Address</h3>
                                <p className="text-gray-600">123 Education Street<br />Learning City, LC 12345</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-700 mb-2">Social Media</h3>
                                <div className="flex gap-4">
                                    <a href="#" className="text-blue-600 hover:text-blue-800">Facebook</a>
                                    <a href="#" className="text-blue-600 hover:text-blue-800">Twitter</a>
                                    <a href="#" className="text-blue-600 hover:text-blue-800">LinkedIn</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

