import React, { useState } from "react";

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';


interface AboutProps {
    auth: { user: any } | null; 
}

const About: React.FC<AboutProps> = ({ auth }) => {
    const Layout = auth?.user ? AuthenticatedLayout : GuestLayout;

    return (
        <Layout
            header={
                <h2 className="text-xl font-semibold leading-tight "> About </h2>}
        >
        
            <Head title="About" />
        </Layout>
    );
};

export default About;

