import AdminLayout from '../../../Layouts/AdminLayout';
import { Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        image: null,
        category: '',
        sort_order: 0,
        is_active: true,
    });

    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);

            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', data.image);
        formData.append('title', data.title || '');
        formData.append('description', data.description || '');
        formData.append('category', data.category || '');
        formData.append('sort_order', data.sort_order ?? 0);
        formData.append('is_active', data.is_active ? 1 : 0);

        post('/admin/gallery', {
            data: formData,
            forceFormData: true,
            onError: (err) => console.log(err),
        });
    };

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Add Gallery Image</h1>
                <Link href="/admin/gallery" className="text-gray-600 hover:text-gray-800">
                    ← Back to Gallery
                </Link>
            </div>

            <div className="bg-white shadow rounded-md p-8">
                <form onSubmit={submit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image *</label>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            required
                        />
                        {errors.image && <div className="text-red-500 text-sm mt-1">{errors.image}</div>}

                        {/* Image Preview */}
                        {previewUrl && (
                            <div className="mt-4">
                                <p className="text-sm text-gray-600 mb-2">Preview:</p>
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="w-full max-w-md h-64 object-cover rounded-md border"
                                />
                            </div>
                        )}
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
                                placeholder="e.g., Classroom, Facility"
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
                            {processing ? 'Adding...' : 'Add Image'}
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
        </AdminLayout>
    );
}

