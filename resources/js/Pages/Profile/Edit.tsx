import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

import Breadcrumb from '@/Components/Nav/Breadcrumb';

export default function Edit({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    const formComponents = [
        <UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status} />,
        <UpdatePasswordForm />,
        <DeleteUserForm />,
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className="h-[6vh] z-10 w-full overflow-visible flex justify-between items-center gap-4 ">
                    <Breadcrumb 
                        items={[
                            { label: "ACCOUNT" },
                            { label: "PROFILE", link: route('shop') },
                        ]}
                    />
                </div>
            }
        >
            <Head title="Profile" />

            <div className="w-full h-full p-5 ">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-4 font-Poppins">
                    {formComponents.map((component, index) => (
                        <div key={index} className="bg-white dark:bg-slate-700 rounded-md border-2 border-gray-300 dark:border-slate-600 sm:p-8">
                            {component}
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
