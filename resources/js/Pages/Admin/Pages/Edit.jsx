import AdminLayout from '../../../Layouts/AdminLayout';
import { Link, useForm } from '@inertiajs/react';

export default function Edit({ page }) {
    const { data, setData, put, processing, errors } = useForm({
        slug: page.slug || '',
        title: page.title || '',
        content: page.content || '',
        meta_description: page.meta_description || '',
        type: page.type || 'page',
        is_active: page.is_active ?? true,
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/admin/pages/${page.id}`);
    };

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Edit Page</h1>
                <Link href="/admin/pages" className="text-gray-600 hover:text-gray-800">
                    ← Back to Pages
                </Link>
            </div>

            <div className="bg-white shadow rounded-md p-8">
                <form onSubmit={submit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
                        <input
                            type="text"
                            value={data.slug}
                            onChange={(e) => setData('slug', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            required
                        />
                        {errors.slug && <div className="text-red-500 text-sm mt-1">{errors.slug}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            required
                        />
                        {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
                        <select
                            value={data.type}
                            onChange={(e) => setData('type', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            required
                        >
                            <option value="page">Regular Page</option>
                            <option value="home">Home Page</option>
                            <option value="vision">Vision</option>
                            <option value="mission">Mission</option>
                            <option value="about">About</option>
                        </select>
                        {errors.type && <div className="text-red-500 text-sm mt-1">{errors.type}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Content (HTML allowed)</label>
                        <textarea
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            rows="10"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md font-mono text-sm"
                        />
                        {errors.content && <div className="text-red-500 text-sm mt-1">{errors.content}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                        <textarea
                            value={data.meta_description}
                            onChange={(e) => setData('meta_description', e.target.value)}
                            rows="3"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={data.is_active}
                                onChange={(e) => setData('is_active', e.target.checked)}
                                className="mr-2"
                            />
                            <span className="text-sm text-gray-700">Active</span>
                        </label>
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                        >
                            {processing ? 'Updating...' : 'Update Page'}
                        </button>
                        <Link
                            href="/admin/pages"
                            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}

