import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-900 dark:text-slate-100">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="w-full h-full bg-gray-100 dark:bg-slate-800">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6">
                    {/* Update Profile Information Form */}
                    <div className="bg-white dark:bg-slate-700 p-4 border-2 border-gray-300 dark:border-slate-600 shadow sm:rounded-lg sm:p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    {/* Update Password Form */}
                    <div className="bg-white dark:bg-slate-700 p-4 border-2 border-gray-300 dark:border-slate-600 shadow sm:rounded-lg sm:p-8">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    {/* Delete User Form */}
                    <div className="bg-white dark:bg-slate-700 p-4 border-2 border-gray-300 dark:border-slate-600 shadow sm:rounded-lg sm:p-8">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
