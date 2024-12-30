import React, { useState } from "react";

import { Head, Link } from '@inertiajs/react';
import { IoFilterOutline } from "react-icons/io5";
import { IoIosArrowDropdown } from "react-icons/io";

import Hamburger from 'hamburger-react'
import Dropdown from '@/Components/Login/Dropdown';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';


interface ItemProps {
    auth: { user: any } | null; // Assuming 'auth' prop contains user info if logged in
}

const Item: React.FC<ItemProps> = ({ auth }) => {
    const Layout = auth?.user ? AuthenticatedLayout : GuestLayout;

    return (
        <Layout
            header={
                <h2 className="text-xl font-semibold leading-tight "> Shop </h2>}
        >
            <Head title="Welcome" />

                
                {/* Main Content */}
                <div>
                   
                </div>
            
        </Layout>
    );
};

export default Shop;
