import AdminLayout from '../../../Layouts/AdminLayout';
import { Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';

export default function Index({ teamMembers }) {
    const handleDelete = (teamMember) => {
        if (confirm('Are you sure you want to delete this team member?')) {
            router.delete(`/admin/team-members/${teamMember.id}`);
        }
    };

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Team Members</h1>
                <Link
                    href="/admin/team-members/create"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    Add New Team Member
                </Link>
            </div>

            {teamMembers && teamMembers.length > 0 ? (
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                        {teamMembers.map((member) => (
                            <li key={member.id}>
                                <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        {member.image_path && (
                                            <img 
                                                src={member.image_path} 
                                                alt={member.name}
                                                className="w-16 h-16 rounded-full object-cover"
                                            />
                                        )}
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                                            {member.position && (
                                                <p className="text-sm text-gray-500">{member.position}</p>
                                            )}
                                            {member.bio && (
                                                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{member.bio}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Link
                                            href={`/admin/team-members/${member.id}/edit`}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(member)}
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
                    <p className="text-gray-500">No team members found. Add your first team member.</p>
                    <Link
                        href="/admin/team-members/create"
                        className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        Add New Team Member
                    </Link>
                </div>
            )}
        </AdminLayout>
    );
}

