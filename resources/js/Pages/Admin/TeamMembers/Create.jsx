import AdminLayout from '../../../Layouts/AdminLayout';
import { Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Create() {
    const [imagePreview, setImagePreview] = useState(null);
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        position: '',
        bio: '',
        sort_order: 0,
        is_active: true,
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
        post('/admin/team-members', {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Add New Team Member</h1>
                <Link href="/admin/team-members" className="text-gray-600 hover:text-gray-800">
                    ← Back to Team Members
                </Link>
            </div>

            <div className="bg-white shadow rounded-md p-8">
                <form onSubmit={submit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            required
                        />
                        {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                        <input
                            type="text"
                            value={data.position}
                            onChange={(e) => setData('position', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            placeholder="e.g., Director, Manager, Instructor"
                        />
                        {errors.position && <div className="text-red-500 text-sm mt-1">{errors.position}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                        <textarea
                            value={data.bio}
                            onChange={(e) => setData('bio', e.target.value)}
                            rows="4"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            placeholder="Brief description about the team member"
                        />
                        {errors.bio && <div className="text-red-500 text-sm mt-1">{errors.bio}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
                        
                        {/* Image Preview */}
                        {imagePreview && (
                            <div className="mb-4">
                                <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                                <img 
                                    src={imagePreview} 
                                    alt="Team member preview" 
                                    className="w-32 h-32 rounded-full object-cover border-4 border-gray-300"
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
                                Upload a profile image (JPEG, PNG, GIF, or WebP, max 10MB). Recommended: Square image, minimum 400x400px
                            </p>
                        </div>
                        {errors.image_file && <div className="text-red-500 text-sm mt-1">{errors.image_file}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Sort Order</label>
                        <input
                            type="number"
                            value={data.sort_order}
                            onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                        <p className="text-xs text-gray-500 mt-1">Lower numbers appear first</p>
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
                            {processing ? 'Creating...' : 'Create Team Member'}
                        </button>
                        <Link
                            href="/admin/team-members"
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

