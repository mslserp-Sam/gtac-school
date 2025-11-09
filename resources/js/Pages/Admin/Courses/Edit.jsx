import AdminLayout from '../../../Layouts/AdminLayout';
import { Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Edit({ course }) {
    const [imagePreview, setImagePreview] = useState(null);
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title: course.title || '',
        description: course.description || '',
        category: course.category || '',
        level: course.level || '',
        duration: course.duration || '',
        brochure_path: course.brochure_path || '',
        sort_order: course.sort_order || 0,
        is_active: course.is_active ?? true,
        image_file: null,
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image_file', file);
            
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        // Use POST with _method for better compatibility with file uploads
        // Laravel's method spoofing will handle the PUT method
        post(`/admin/courses/${course.id}`, {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Edit Course</h1>
                <Link href="/admin/courses" className="text-gray-600 hover:text-gray-800">
                    ← Back to Courses
                </Link>
            </div>

            <div className="bg-white shadow rounded-md p-8">
                <form onSubmit={submit} encType="multipart/form-data">
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            rows="5"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                        {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Course Image</label>
                        
                        {/* Current Image Preview */}
                        {course.image_path && !imagePreview && (
                            <div className="mb-4">
                                <p className="text-sm text-gray-600 mb-2">Current Image:</p>
                                <img 
                                    src={course.image_path} 
                                    alt="Current course image" 
                                    className="max-w-md h-48 object-cover rounded-md border border-gray-300"
                                />
                                <p className="text-xs text-gray-500 mt-1">{course.image_path}</p>
                            </div>
                        )}
                        
                        {/* New Image Preview */}
                        {imagePreview && (
                            <div className="mb-4">
                                <p className="text-sm text-gray-600 mb-2">New Image Preview:</p>
                                <img 
                                    src={imagePreview} 
                                    alt="New course preview" 
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
                                Upload a new course image (JPEG, PNG, GIF, or WebP, max 10MB)
                            </p>
                        </div>
                        {errors.image_file && <div className="text-red-500 text-sm mt-1">{errors.image_file}</div>}
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
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
                            <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                            <input
                                type="text"
                                value={data.level}
                                onChange={(e) => setData('level', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                            <input
                                type="text"
                                value={data.duration}
                                onChange={(e) => setData('duration', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Sort Order</label>
                        <input
                            type="number"
                            value={data.sort_order}
                            onChange={(e) => setData('sort_order', parseInt(e.target.value))}
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
                            {processing ? 'Updating...' : 'Update Course'}
                        </button>
                        <Link
                            href="/admin/courses"
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

