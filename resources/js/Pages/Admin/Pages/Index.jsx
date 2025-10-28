import AdminLayout from '../../../Layouts/AdminLayout';
import { Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';

export default function Index({ pages }) {
    const handleDelete = (page) => {
        if (confirm('Are you sure you want to delete this page?')) {
            router.delete(`/admin/pages/${page.id}`);
        }
    };

    const getTypeBadge = (type) => {
        const styles = {
            page: 'bg-blue-100 text-blue-800',
            home: 'bg-purple-100 text-purple-800',
            vision: 'bg-green-100 text-green-800',
            mission: 'bg-yellow-100 text-yellow-800',
            about: 'bg-pink-100 text-pink-800',
        };
        return styles[type] || 'bg-gray-100 text-gray-800';
    };

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Pages</h1>
                <Link
                    href="/admin/pages/create"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    Add New Page
                </Link>
            </div>

            {pages && pages.length > 0 ? (
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                        {pages.map((page) => (
                            <li key={page.id}>
                                <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-lg font-medium text-gray-900">{page.title}</h3>
                                                <span className={`px-2 py-1 rounded text-xs font-semibold ${getTypeBadge(page.type)}`}>
                                                    {page.type}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500">Slug: /{page.slug}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Link
                                            href={`/admin/pages/${page.id}/edit`}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(page)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="bg-white shadow rounded-md p-8 text-center">
                    <p className="text-gray-500">No pages found. Create your first page.</p>
                    <Link
                        href="/admin/pages/create"
                        className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        Add New Page
                    </Link>
                </div>
            )}
        </AdminLayout>
    );
}

