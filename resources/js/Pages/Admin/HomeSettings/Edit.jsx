import AdminLayout from '../../../Layouts/AdminLayout';
import { Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Edit({ settings }) {
    const [backgroundImagePreview, setBackgroundImagePreview] = useState(null);
    const { data, setData, post, processing, errors } = useForm({
        // Hero Section
        hero_title: settings.hero_title || '',
        hero_subtitle: settings.hero_subtitle || '',
        hero_tagline: settings.hero_tagline || '“Empowering Skills. Building Careers. Transforming Lives.”',
        hero_background_image: settings.hero_background_image || '',
        hero_button_1_text: settings.hero_button_1_text || '',
        hero_button_1_link: settings.hero_button_1_link || '',
        hero_button_2_text: settings.hero_button_2_text || '',
        hero_button_2_link: settings.hero_button_2_link || '',

        // Core Values - G
        value_g_letter: settings.value_g_letter || '',
        value_g_title: settings.value_g_title || '',
        value_g_description: settings.value_g_description || '',

        // Core Values - E
        value_e_letter: settings.value_e_letter || '',
        value_e_title: settings.value_e_title || '',
        value_e_description: settings.value_e_description || '',

        // Core Values - N
        value_n_letter: settings.value_n_letter || '',
        value_n_title: settings.value_n_title || '',
        value_n_description: settings.value_n_description || '',

        // Core Values - E2
        value_e2_letter: settings.value_e2_letter || '',
        value_e2_title: settings.value_e2_title || '',
        value_e2_description: settings.value_e2_description || '',

        // Core Values - S
        value_s_letter: settings.value_s_letter || '',
        value_s_title: settings.value_s_title || '',
        value_s_description: settings.value_s_description || '',

        // Core Values - I
        value_i_letter: settings.value_i_letter || '',
        value_i_title: settings.value_i_title || '',
        value_i_description: settings.value_i_description || '',

        // Core Values - S2
        value_s2_letter: settings.value_s2_letter || '',
        value_s2_title: settings.value_s2_title || '',
        value_s2_description: settings.value_s2_description || '',

        // Contact Information
        contact_email: settings.contact_email || '',
        contact_phone_1: settings.contact_phone_1 || '',
        contact_phone_2: settings.contact_phone_2 || '',
        contact_address: settings.contact_address || '',
        contact_facebook: settings.contact_facebook || '',
        contact_facebook_url: settings.contact_facebook_url || '',

        // Location
        location_latitude: settings.location_latitude || '',
        location_longitude: settings.location_longitude || '',
        location_address: settings.location_address || '',

        // Footer
        footer_company_name: settings.footer_company_name || '',
        footer_company_full_name: settings.footer_company_full_name || '',
        footer_description: settings.footer_description || '',
        footer_contact_title: settings.footer_contact_title || '',
        footer_copyright: settings.footer_copyright || '',

        hero_background_image_file: null,
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('hero_background_image_file', file);

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setBackgroundImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const submit = (e) => {
        e.preventDefault();

        // Inertia automatically uses FormData when files are present
        post('/admin/home-settings', {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Edit Home Settings</h1>
                <Link href="/admin/dashboard" className="text-gray-600 hover:text-gray-800">
                    ← Back to Dashboard
                </Link>
            </div>

            <form onSubmit={submit} className="space-y-8">
                {/* Hero Section */}
                <div className="bg-white shadow rounded-md p-8">
                    <h2 className="text-2xl font-bold mb-6">Hero Section</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Hero Title</label>
                            <input
                                type="text"
                                value={data.hero_title}
                                onChange={(e) => setData('hero_title', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Hero Subtitle</label>
                            <input
                                type="text"
                                value={data.hero_subtitle}
                                onChange={(e) => setData('hero_subtitle', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="mb-4 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Hero Tagline</label>
                            <input
                                type="text"
                                value={data.hero_tagline}
                                onChange={(e) => setData('hero_tagline', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                placeholder="“Empowering Skills. Building Careers. Transforming Lives.”"
                            />
                        </div>

                        <div className="mb-4 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Background Image</label>

                            {/* Current Image Preview */}
                            {settings.hero_background_image && !backgroundImagePreview && (
                                <div className="mb-4">
                                    <p className="text-sm text-gray-600 mb-2">Current Image:</p>
                                    <img
                                        src={settings.hero_background_image}
                                        alt="Current background"
                                        className="max-w-md h-48 object-cover rounded-md border border-gray-300"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">{settings.hero_background_image}</p>
                                </div>
                            )}

                            {/* New Image Preview */}
                            {backgroundImagePreview && (
                                <div className="mb-4">
                                    <p className="text-sm text-gray-600 mb-2">New Image Preview:</p>
                                    <img
                                        src={backgroundImagePreview}
                                        alt="New background preview"
                                        className="max-w-md h-48 object-cover rounded-md border border-gray-300"
                                    />
                                </div>
                            )}

                            {/* File Upload */}
                            <div className="mb-2">
                                <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
                                    onChange={handleImageChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Upload a new background image (JPEG, PNG, GIF, or WebP, max 10MB)
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Button 1 Text</label>
                            <input
                                type="text"
                                value={data.hero_button_1_text}
                                onChange={(e) => setData('hero_button_1_text', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Button 1 Link</label>
                            <input
                                type="text"
                                value={data.hero_button_1_link}
                                onChange={(e) => setData('hero_button_1_link', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Button 2 Text</label>
                            <input
                                type="text"
                                value={data.hero_button_2_text}
                                onChange={(e) => setData('hero_button_2_text', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Button 2 Link</label>
                            <input
                                type="text"
                                value={data.hero_button_2_link}
                                onChange={(e) => setData('hero_button_2_link', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                </div>

                {/* Core Values */}
                <div className="bg-white shadow rounded-md p-8">
                    <h2 className="text-2xl font-bold mb-6">Core Values</h2>

                    {['g', 'e', 'n', 'e2', 's', 'i', 's2'].map((value, idx) => {
                        const letterKey = `value_${value}_letter`;
                        const titleKey = `value_${value}_title`;
                        const descKey = `value_${value}_description`;
                        const label = value === 'e2' ? 'E (2nd - Empowerment)' : value === 's2' ? 'S (2nd - Sustainability)' : value.toUpperCase();

                        return (
                            <div key={value} className="mb-8 p-4 border border-gray-200 rounded-md">
                                <h3 className="text-lg font-semibold mb-4">Value {label}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Letter</label>
                                        <input
                                            type="text"
                                            maxLength="1"
                                            value={data[letterKey]}
                                            onChange={(e) => setData(letterKey, e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                        <input
                                            type="text"
                                            value={data[titleKey]}
                                            onChange={(e) => setData(titleKey, e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                    <textarea
                                        rows="3"
                                        value={data[descKey]}
                                        onChange={(e) => setData(descKey, e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Contact Information */}
                <div className="bg-white shadow rounded-md p-8">
                    <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                value={data.contact_email}
                                onChange={(e) => setData('contact_email', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone 1</label>
                            <input
                                type="text"
                                value={data.contact_phone_1}
                                onChange={(e) => setData('contact_phone_1', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone 2</label>
                            <input
                                type="text"
                                value={data.contact_phone_2}
                                onChange={(e) => setData('contact_phone_2', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Facebook Page Name</label>
                            <input
                                type="text"
                                value={data.contact_facebook}
                                onChange={(e) => setData('contact_facebook', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="mb-4 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Facebook URL</label>
                            <input
                                type="text"
                                value={data.contact_facebook_url}
                                onChange={(e) => setData('contact_facebook_url', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="mb-4 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Address (HTML allowed)</label>
                            <textarea
                                rows="3"
                                value={data.contact_address}
                                onChange={(e) => setData('contact_address', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                </div>

                {/* Location */}
                <div className="bg-white shadow rounded-md p-8">
                    <h2 className="text-2xl font-bold mb-6">Location</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Latitude</label>
                            <input
                                type="text"
                                value={data.location_latitude}
                                onChange={(e) => setData('location_latitude', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Longitude</label>
                            <input
                                type="text"
                                value={data.location_longitude}
                                onChange={(e) => setData('location_longitude', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="mb-4 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Address (HTML allowed)</label>
                            <textarea
                                rows="3"
                                value={data.location_address}
                                onChange={(e) => setData('location_address', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-white shadow rounded-md p-8">
                    <h2 className="text-2xl font-bold mb-6">Footer</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Company Name (Short)</label>
                            <input
                                type="text"
                                value={data.footer_company_name}
                                onChange={(e) => setData('footer_company_name', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                placeholder="GTAC"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Company Full Name</label>
                            <input
                                type="text"
                                value={data.footer_company_full_name}
                                onChange={(e) => setData('footer_company_full_name', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                placeholder="Genesis Training and Assessment Center Inc."
                            />
                        </div>

                        <div className="mb-4 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea
                                rows="3"
                                value={data.footer_description}
                                onChange={(e) => setData('footer_description', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                placeholder="Empowering students through quality education and personalized learning experiences."
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Section Title</label>
                            <input
                                type="text"
                                value={data.footer_contact_title}
                                onChange={(e) => setData('footer_contact_title', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                placeholder="Contact"
                            />
                        </div>

                        <div className="mb-4 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Copyright Text</label>
                            <input
                                type="text"
                                value={data.footer_copyright}
                                onChange={(e) => setData('footer_copyright', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                placeholder="© 2025 Genesis Training and Assessment Center Inc. All rights reserved."
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        {processing ? 'Saving...' : 'Save Settings'}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}

