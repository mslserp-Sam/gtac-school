import MainLayout from '../Layouts/MainLayout';
import { useForm, usePage } from '@inertiajs/react';

export default function Contact() {
    const { flash } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        email: '',
        has_driver_license: '',
        interested_course: '',
        full_name: '',
        contact_number: '',
        email_address: '',
        exact_address: '',
        civil_status: '',
        working_industry: '',
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
                        <h2 className="text-2xl font-bold mb-6">Enrollment Inquiry</h2>
                        <form onSubmit={submit}>
                            {/* Email */}
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gtac-500 focus:border-gtac-500"
                                    required
                                />
                                {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                            </div>

                            {/* Driver's License */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Do you have a valid driver's license? <span className="text-red-500">*</span>
                                </label>
                                <div className="flex gap-6">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="has_driver_license"
                                            value="yes"
                                            checked={data.has_driver_license === 'yes'}
                                            onChange={(e) => setData('has_driver_license', e.target.value)}
                                            className="mr-2"
                                            required
                                        />
                                        <span className="text-gray-700">Yes</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="has_driver_license"
                                            value="no"
                                            checked={data.has_driver_license === 'no'}
                                            onChange={(e) => setData('has_driver_license', e.target.value)}
                                            className="mr-2"
                                            required
                                        />
                                        <span className="text-gray-700">No</span>
                                    </label>
                                </div>
                                {errors.has_driver_license && <div className="text-red-500 text-sm mt-1">{errors.has_driver_license}</div>}
                            </div>

                            {/* Course Selection */}
                            <div className="mb-6">
                                <label htmlFor="interested_course" className="block text-sm font-medium text-gray-700 mb-2">
                                    What course/qualification are you interested to enrol? Pick one. <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="interested_course"
                                    value={data.interested_course}
                                    onChange={(e) => setData('interested_course', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gtac-500 focus:border-gtac-500"
                                    required
                                >
                                    <option value="">Select a course</option>
                                    <option value="Caregiving-Elderly NCII">Caregiving-Elderly NCII</option>
                                    <option value="HEO-Forklift NCII">HEO-Forklift NCII</option>
                                    <option value="Computer Systems Servicing NCII">Computer Systems Servicing NCII</option>
                                    <option value="Content Creation">Content Creation</option>
                                    <option value="Bread and Pastry Production NCII">Bread and Pastry Production NCII</option>
                                </select>
                                {errors.interested_course && <div className="text-red-500 text-sm mt-1">{errors.interested_course}</div>}
                            </div>

                            {/* Personal Information Section */}
                            <div className="border-t border-gray-300 pt-6 mt-6">
                                <h3 className="text-xl font-bold mb-4 text-gtac-700">Personal Information</h3>

                                {/* Full Name */}
                                <div className="mb-4">
                                    <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-2">
                                        FULL NAME (Name, Middle Name, Surname) <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="full_name"
                                        value={data.full_name}
                                        onChange={(e) => setData('full_name', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gtac-500 focus:border-gtac-500"
                                        placeholder="First Middle Last Name"
                                        required
                                    />
                                    {errors.full_name && <div className="text-red-500 text-sm mt-1">{errors.full_name}</div>}
                                </div>

                                {/* Contact Number */}
                                <div className="mb-4">
                                    <label htmlFor="contact_number" className="block text-sm font-medium text-gray-700 mb-2">
                                        CONTACT NO. <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        id="contact_number"
                                        value={data.contact_number}
                                        onChange={(e) => setData('contact_number', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gtac-500 focus:border-gtac-500"
                                        placeholder="09XX-XXX-XXXX"
                                        required
                                    />
                                    {errors.contact_number && <div className="text-red-500 text-sm mt-1">{errors.contact_number}</div>}
                                </div>

                                {/* Email Address */}
                                <div className="mb-4">
                                    <label htmlFor="email_address" className="block text-sm font-medium text-gray-700 mb-2">
                                        EMAIL ADDRESS <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email_address"
                                        value={data.email_address}
                                        onChange={(e) => setData('email_address', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gtac-500 focus:border-gtac-500"
                                        placeholder="your.email@example.com"
                                        required
                                    />
                                    {errors.email_address && <div className="text-red-500 text-sm mt-1">{errors.email_address}</div>}
                                </div>

                                {/* Exact Address */}
                                <div className="mb-4">
                                    <label htmlFor="exact_address" className="block text-sm font-medium text-gray-700 mb-2">
                                        EXACT ADDRESS <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="exact_address"
                                        rows="3"
                                        value={data.exact_address}
                                        onChange={(e) => setData('exact_address', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gtac-500 focus:border-gtac-500 resize-none"
                                        placeholder="Street, Barangay, City, Province"
                                        required
                                    />
                                    {errors.exact_address && <div className="text-red-500 text-sm mt-1">{errors.exact_address}</div>}
                                </div>

                                {/* Civil Status */}
                                <div className="mb-4">
                                    <label htmlFor="civil_status" className="block text-sm font-medium text-gray-700 mb-2">
                                        CIVIL STATUS <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="civil_status"
                                        value={data.civil_status}
                                        onChange={(e) => setData('civil_status', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gtac-500 focus:border-gtac-500"
                                        required
                                    >
                                        <option value="">Select Civil Status</option>
                                        <option value="Single">Single</option>
                                        <option value="Married">Married</option>
                                        <option value="Widowed">Widowed</option>
                                        <option value="Divorced">Divorced</option>
                                        <option value="Separated">Separated</option>
                                    </select>
                                    {errors.civil_status && <div className="text-red-500 text-sm mt-1">{errors.civil_status}</div>}
                                </div>

                                {/* Working Industry/Experience */}
                                <div className="mb-6">
                                    <label htmlFor="working_industry" className="block text-sm font-medium text-gray-700 mb-2">
                                        WORKING INDUSTRY/WORKING EXPERIENCE <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="working_industry"
                                        value={data.working_industry}
                                        onChange={(e) => setData('working_industry', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gtac-500 focus:border-gtac-500"
                                        placeholder="e.g., IT, Healthcare, Education, etc."
                                        required
                                    />
                                    {errors.working_industry && <div className="text-red-500 text-sm mt-1">{errors.working_industry}</div>}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-gtac-600 text-white py-3 rounded-md font-semibold hover:bg-gtac-700 transition disabled:opacity-50"
                            >
                                {processing ? 'Submitting...' : 'Submit Inquiry'}
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

