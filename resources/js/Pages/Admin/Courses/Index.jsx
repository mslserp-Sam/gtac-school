import AdminLayout from '../../../Layouts/AdminLayout';
import { Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';

export default function Index({ courses }) {
    const handleDelete = (course) => {
        if (confirm('Are you sure you want to delete this course?')) {
            router.delete(`/admin/courses/${course.id}`);
        }
    };

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Courses</h1>
                <Link
                    href="/admin/courses/create"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    Add New Course
                </Link>
            </div>

            {courses && courses.length > 0 ? (
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                        {courses.map((course) => (
                            <li key={course.id}>
                                <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900">{course.title}</h3>
                                            <p className="text-sm text-gray-500">{course.description}</p>
                                            <div className="mt-2 flex gap-4">
                                                {course.category && (
                                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                                        {course.category}
                                                    </span>
                                                )}
                                                {course.level && (
                                                    <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                                                        {course.level}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Link
                                            href={`/admin/courses/${course.id}/edit`}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(course)}
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
                    <p className="text-gray-500">No courses found. Create your first course.</p>
                    <Link
                        href="/admin/courses/create"
                        className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        Add New Course
                    </Link>
                </div>
            )}
        </AdminLayout>
    );
}

