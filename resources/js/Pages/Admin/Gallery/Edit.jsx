import AdminLayout from '../../../Layouts/AdminLayout';
import { Link, useForm } from '@inertiajs/react';

export default function Edit({ image }) {
    const { data, setData, put, processing, errors } = useForm({
        title: image.title || '',
        description: image.description || '',
        image_path: image.image_path || '',
        category: image.category || '',
        sort_order: image.sort_order || 0,
        is_active: image.is_active ?? true,
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/admin/gallery/${image.id}`);
    };

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Edit Gallery Image</h1>
                <Link href="/admin/gallery" className="text-gray-600 hover:text-gray-800">
                    ← Back to Gallery
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white shadow rounded-md p-8">
                    <form onSubmit={submit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Image URL *</label>
                            <input
                                type="text"
                                value={data.image_path}
                                onChange={(e) => setData('image_path', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                required
                            />
                            {errors.image_path && <div className="text-red-500 text-sm mt-1">{errors.image_path}</div>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows="3"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                <input
                                    type="text"
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Sort Order</label>
                                <input
                                    type="number"
                                    value={data.sort_order}
                                    onChange={(e) => setData('sort_order', parseInt(e.target.value))}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                />
                            </div>
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
                                {processing ? 'Updating...' : 'Update Image'}
                            </button>
                            <Link
                                href="/admin/gallery"
                                className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>

                <div>
                    <h3 className="font-semibold mb-4">Preview</h3>
                    <div className="bg-white shadow rounded-md overflow-hidden">
                        <img
                            src={data.image_path}
                            alt={data.title || 'Preview'}
                            className="w-full h-64 object-cover"
                        />
                        <div className="p-4">
                            <h4 className="font-semibold">{data.title || 'Untitled'}</h4>
                            {data.description && <p className="text-sm text-gray-600 mt-2">{data.description}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

