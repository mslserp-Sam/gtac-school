import AdminLayout from '../../../Layouts/AdminLayout';
import { Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';

export default function Index({ images }) {
    const handleDelete = (image) => {
        if (confirm('Are you sure you want to delete this image?')) {
            router.delete(`/admin/gallery/${image.id}`);
        }
    };

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Gallery</h1>
                <Link
                    href="/admin/gallery/create"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    Add New Image
                </Link>
            </div>

            {images && images.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((image) => (
                        <div key={image.id} className="bg-white rounded-lg shadow overflow-hidden">
                            <img
                                src={`/gtac${image.image_path}`}
                                alt={image.title || 'Gallery image'}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="font-semibold mb-2">{image.title || 'Untitled'}</h3>
                                {image.description && (
                                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{image.description}</p>
                                )}
                                <div className="flex gap-2">
                                    <Link
                                        href={`/admin/gallery/${image.id}/edit`}
                                        className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 text-center"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(image)}
                                        className="flex-1 bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white shadow rounded-md p-8 text-center">
                    <p className="text-gray-500 mb-4">No gallery images found.</p>
                    <Link
                        href="/admin/gallery/create"
                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        Add First Image
                    </Link>
                </div>
            )}
        </AdminLayout>
    );
}

