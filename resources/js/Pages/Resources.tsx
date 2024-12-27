import React, { useState } from "react";

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';


interface ResourcesProps {
    auth: { user: any } | null; 
}

const Resources: React.FC<ResourcesProps> = ({ auth }) => {
    const Layout = auth?.user ? AuthenticatedLayout : GuestLayout;

    return (
        <Layout
            header={
                <h2 className="text-xl font-semibold leading-tight "> Resources </h2>}
        >
        
            <Head title="Resources" />
        </Layout>
    );
};

export default Resources;

