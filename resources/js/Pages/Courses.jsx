import MainLayout from '../Layouts/MainLayout';
import { Link } from '@inertiajs/react';

export default function Courses({ courses }) {
    return (
        <MainLayout>
            <div className="bg-gradient-to-r from-gtac-600 to-gtac-700 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold mb-4">Our Courses</h1>
                    <p className="text-xl text-white/90">
                        Discover our comprehensive range of courses designed to meet your educational goals.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {courses && courses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.map((course) => (
                            <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                                <div className="p-6">
                                    {course.category && (
                                        <span className="inline-block bg-gtac-100 text-gtac-800 text-xs px-2 py-1 rounded mb-2">
                                            {course.category}
                                        </span>
                                    )}
                                    <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                                    <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
                                    {course.level && (
                                        <p className="text-sm text-gray-500 mb-2">
                                            <strong>Level:</strong> {course.level}
                                        </p>
                                    )}
                                    {course.duration && (
                                        <p className="text-sm text-gray-500 mb-4">
                                            <strong>Duration:</strong> {course.duration}
                                        </p>
                                    )}
                                    <div className="flex justify-between items-center">
                                        <Link
                                            href={`/courses/${course.id}`}
                                            className="text-gtac-600 hover:text-gtac-700 font-medium"
                                        >
                                            Learn More →
                                        </Link>
                                        {course.brochure_path && (
                                            <a
                                                href={course.brochure_path}
                                                download
                                                className="text-sm text-gray-500 hover:text-gray-700"
                                            >
                                                Download Brochure
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No courses available at the moment.</p>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}

