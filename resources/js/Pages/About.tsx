import React, { useState } from "react";
import GuestLayout from '@/Layouts/GuestLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

interface AboutProps {
    auth: { user: any } | null;
}

const About: React.FC<AboutProps> = ({ auth }) => {
    const Layout = auth?.user ? AuthenticatedLayout : GuestLayout;

    return (
        <Layout
            header={
                <div className="w-full grid grid-rows-1 grid-cols-4 items-center">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                        About
                    </h2>
                </div>
            }
        >
            <Head title="About" />

            <div className="relative w-full min-h-[78vh] flex justify-center items-center bg-white/50 rounded-lg p-10 shadow-lg">
                <div className="prose lg:prose-xl text-gray-700 dark:text-gray-300 max-w-6xl">
                    
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6">Mycenic</h1>
                    <p className="leading-relaxed">
                        Mycology is the branch of biology focused on the study of fungi, including mushrooms, molds, and yeasts. At our website, we aim to provide in-depth knowledge about fungi, their biology, and their uses in various fields such as medicine, agriculture, and foraging.
                    </p>
                    <h2 className="text-3xl font-bold mt-10 mb-4 text-gray-900 dark:text-white">Who are we?</h2>
                    <p className="leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet ante id orci maximus consequat. Integer volutpat orci eget odio pharetra, vitae tincidunt mi convallis. Sed auctor bibendum dolor ac lacinia. Fusce nec sapien eget dui dictum faucibus a id ligula. Vivamus vitae malesuada libero, at bibendum nulla. Nulla facilisi. Donec viverra maximus feugiat. Etiam volutpat tincidunt tortor id elementum. Curabitur eget sapien in nisi placerat interdum ac vel nulla.
                    </p>
                    <h2 className="text-3xl font-bold mt-10 mb-4 text-gray-900 dark:text-white">What do we do?</h2>
                    <p className="leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus in massa ac nulla auctor ullamcorper. Nam vulputate nulla non orci gravida, sed ultricies eros interdum. Integer et orci et sapien laoreet tincidunt vel at orci. Nulla facilisi. Aenean pharetra ante felis, sit amet facilisis orci suscipit vitae. Fusce non velit ac urna dictum porttitor et at ante.
                    </p>
                    <h2 className="text-3xl font-bold mt-10 mb-4 text-gray-900 dark:text-white">Future Plans</h2>
                    <p className="leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce interdum urna a libero vulputate, eu egestas justo pharetra. Integer malesuada dui in interdum consectetur. Mauris suscipit lectus magna, a interdum libero convallis et. Donec tincidunt, sapien eget viverra volutpat, eros odio fermentum enim, et tincidunt leo nisi ac elit. Suspendisse potenti. Aliquam erat volutpat.
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default About;
