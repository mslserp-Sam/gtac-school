import AdminLayout from '../../Layouts/AdminLayout';
import { Link } from '@inertiajs/react';

export default function Dashboard({ stats }) {
    return (
        <AdminLayout>
            <div>
                <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gtac-500 text-white text-2xl font-bold">
                                    {stats?.courses || 0}
                                </div>
                            </div>
                            <div className="ml-5">
                                <dt className="text-sm font-medium text-gray-500">Courses</dt>
                                    <Link href="/admin/courses" className="text-lg font-semibold text-gtac-600 hover:text-gtac-700">
                                        Manage
                                    </Link>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gtac-400 text-white text-2xl font-bold">
                                    {stats?.gallery_images || 0}
                                </div>
                            </div>
                            <div className="ml-5">
                                <dt className="text-sm font-medium text-gray-500">Gallery Images</dt>
                                    <Link href="/admin/gallery" className="text-lg font-semibold text-gtac-600 hover:text-gtac-700">
                                        Manage
                                    </Link>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gtac-300 text-white text-2xl font-bold">
                                    {stats?.contact_inquiries || 0}
                                </div>
                            </div>
                            <div className="ml-5">
                                <dt className="text-sm font-medium text-gray-500">New Inquiries</dt>
                                    <Link href="/admin/contact-inquiries" className="text-lg font-semibold text-gtac-600 hover:text-gtac-700">
                                        View
                                    </Link>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gtac-600 text-white text-2xl font-bold">
                                    {stats?.pages || 0}
                                </div>
                            </div>
                            <div className="ml-5">
                                <dt className="text-sm font-medium text-gray-500">Pages</dt>
                                    <Link href="/admin/pages" className="text-lg font-semibold text-gtac-600 hover:text-gtac-700">
                                        Manage
                                    </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold mb-4">Welcome to GTAC Admin</h2>
                    <p className="text-gray-600 mb-4">
                        Manage your school website content from here. Use the navigation menu to access different sections.
                    </p>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li><strong>Courses:</strong> Add, edit, and manage course offerings</li>
                        <li><strong>Gallery:</strong> Upload and organize gallery images</li>
                        <li><strong>Contact Inquiries:</strong> View and respond to contact form submissions</li>
                        <li><strong>Pages:</strong> Manage page content including Vision, Mission, and About sections</li>
                    </ul>
                </div>
            </div>
        </AdminLayout>
    );
}

