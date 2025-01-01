import React, { useState } from "react";

import GuestLayout from '@/Layouts/GuestLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react';

interface AboutProps {
    auth: { user: any } | null; // Assuming 'auth' prop contains user info if logged in
}

const About: React.FC<AboutProps> = ({ auth }) => {
    const Layout = auth?.user ? AuthenticatedLayout : GuestLayout;

    return (
        <Layout
            header={
                <div className="h-full w-full overflow-visible grid grid-rows-1 grid-cols-4 ">
                    <h2 className="text-xl font-semibold leading-tight flex items-center h-auto w-full">
                        About 
                    </h2>
                </div>
            }
        >
            <Head title="About" />
            
            <div className="relative w-full min-h-[78vh] flex justify-center items-start bg-white/10 rounded-lg p-8">
                <div className="prose lg:prose-xl text-white">
                    <h1 className="text-3xl font-bold mb-4">Mycenic</h1>
                    <p>
                        Mycology is the branch of biology focused on the study of fungi, including mushrooms, molds, and yeasts. At our website, we aim to provide in-depth knowledge about fungi, their biology, and their uses in various fields such as medicine, agriculture, and foraging.
                    </p>
                    <h2 className="text-2xl font-semibold mt-8 mb-4">Who are we?</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet ante id orci maximus consequat. Integer volutpat orci eget odio pharetra, vitae tincidunt mi convallis. Sed auctor bibendum dolor ac lacinia. Fusce nec sapien eget dui dictum faucibus a id ligula. Vivamus vitae malesuada libero, at bibendum nulla. Nulla facilisi. Donec viverra maximus feugiat. Etiam volutpat tincidunt tortor id elementum. Curabitur eget sapien in nisi placerat interdum ac vel nulla.
                    </p>
                    <h2 className="text-2xl font-semibold mt-8 mb-4">What do we do?</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus in massa ac nulla auctor ullamcorper. Nam vulputate nulla non orci gravida, sed ultricies eros interdum. Integer et orci et sapien laoreet tincidunt vel at orci. Nulla facilisi. Aenean pharetra ante felis, sit amet facilisis orci suscipit vitae. Fusce non velit ac urna dictum porttitor et at ante.
                    </p>
                    <h2 className="text-2xl font-semibold mt-8 mb-4">Future Plans</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce interdum urna a libero vulputate, eu egestas justo pharetra. Integer malesuada dui in interdum consectetur. Mauris suscipit lectus magna, a interdum libero convallis et. Donec tincidunt, sapien eget viverra volutpat, eros odio fermentum enim, et tincidunt leo nisi ac elit. Suspendisse potenti. Aliquam erat volutpat.
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default About;
