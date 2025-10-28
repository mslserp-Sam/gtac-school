import AdminLayout from '../../../Layouts/AdminLayout';
import { Link, router } from '@inertiajs/react';

export default function Index({ inquiries }) {
    const updateStatus = (inquiry, status) => {
        router.patch(`/admin/contact-inquiries/${inquiry.id}/status`, { status });
    };

    const handleDelete = (inquiry) => {
        if (confirm('Are you sure you want to delete this inquiry?')) {
            router.delete(`/admin/contact-inquiries/${inquiry.id}`);
        }
    };

    const getStatusBadge = (status) => {
        const styles = {
            new: 'bg-yellow-100 text-yellow-800',
            read: 'bg-blue-100 text-blue-800',
            responded: 'bg-green-100 text-green-800',
        };
        return styles[status] || 'bg-gray-100 text-gray-800';
    };

    return (
        <AdminLayout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Contact Inquiries</h1>
                <p className="text-gray-600 mt-2">Manage and respond to contact form submissions</p>
            </div>

            {inquiries && inquiries.length > 0 ? (
                <div className="bg-white shadow rounded-md overflow-hidden">
                    <ul className="divide-y divide-gray-200">
                        {inquiries.map((inquiry) => (
                            <li key={inquiry.id} className="p-6 hover:bg-gray-50">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-4 mb-2">
                                            <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusBadge(inquiry.status)}`}>
                                                {inquiry.status.toUpperCase()}
                                            </span>
                                            <h3 className="text-lg font-semibold">{inquiry.name}</h3>
                                        </div>
                                        <div className="text-sm text-gray-600 mb-2">
                                            <a href={`mailto:${inquiry.email}`} className="text-blue-600 hover:underline">
                                                {inquiry.email}
                                            </a>
                                            {inquiry.phone && (
                                                <>
                                                    {' | '}
                                                    <a href={`tel:${inquiry.phone}`} className="text-blue-600 hover:underline">
                                                        {inquiry.phone}
                                                    </a>
                                                </>
                                            )}
                                        </div>
                                        {inquiry.subject && (
                                            <p className="font-medium text-gray-700 mb-2">{inquiry.subject}</p>
                                        )}
                                        <p className="text-gray-600">{inquiry.message}</p>
                                        <p className="text-xs text-gray-400 mt-2">
                                            Submitted on {new Date(inquiry.created_at).toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        <select
                                            value={inquiry.status}
                                            onChange={(e) => updateStatus(inquiry, e.target.value)}
                                            className="text-sm border border-gray-300 rounded px-2 py-1"
                                        >
                                            <option value="new">New</option>
                                            <option value="read">Read</option>
                                            <option value="responded">Responded</option>
                                        </select>
                                        <button
                                            onClick={() => handleDelete(inquiry)}
                                            className="text-red-600 hover:text-red-800 text-sm"
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
                    <p className="text-gray-500">No contact inquiries yet.</p>
                </div>
            )}
        </AdminLayout>
    );
}

