import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AdminLayout>
            <Head title="Profile" />
            
            <div>
                <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>
                
                <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                        />
                    </div>

                    <div className="bg-white rounded-lg shadow p-8">
                        <UpdatePasswordForm />
                    </div>

                    <div className="bg-white rounded-lg shadow p-8">
                        <DeleteUserForm />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
