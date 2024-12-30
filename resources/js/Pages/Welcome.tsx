import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Head, Link } from '@inertiajs/react';

import ApplicationLogo from '@/Components/Login/ApplicationLogo';
import MouseColorChanger from '@/Components/Background/MouseColorChanger';
import CompanyInfo from '@/Pages/Home/CompanyInfo';
import WelcomeCard from "@/Components/Cards/WelcomeCard";
import Navbar from '@/Components/Nav/Menu';


import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import VideoPlayer from "@/Components/Video/VideoPlayer";

import { CiLogin } from 'react-icons/ci';
import { IoHomeOutline } from 'react-icons/io5';
import { BsShop } from "react-icons/bs";
import { GrResources } from "react-icons/gr";
import { FaInfoCircle } from "react-icons/fa";

// Define the types for the page props
interface WelcomeProps {
    auth: { user: any };
    laravelVersion: string;
    phpVersion: string;
}

const Welcome: React.FC<WelcomeProps> = ({
    auth,
    laravelVersion,
    phpVersion,
}) => {
    const IconClass = "w-full p-5 h-auto ";

    // Left card data
    const leftCardData = [
        { title: "New", icon: <BsShop className={IconClass} />, className: 'row-start-1 col-start-1 row-span-3' },
        { title: "Popular", icon: <BsShop className={IconClass} />, className: 'row-start-1 col-start-1 row-span-3' },
        { title: "Deals", icon: <BsShop className={IconClass} />, className: 'row-start-1 col-start-1 row-span-3' },
    ];

    // Right card data
    const rightCardData = [
        { title: "Store", icon: <BsShop className={IconClass} />, className: 'row-start-1 col-start-2' },
        { title: "Resources", icon: <GrResources className={IconClass} />, className: 'row-start-2 col-start-2' },
        { title: "About", icon: <FaInfoCircle className={IconClass} />, className: 'row-start-3 col-start-2' },
    ];

    // State to keep track of the leftIndex
    const [leftIndex, setLeftIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setLeftIndex((prevIndex) => (prevIndex + 1) % leftCardData.length); // Increment index and loop
        }, 3000); // Update every 3 seconds

        return () => clearInterval(interval); // Clean up interval on component unmount
    }, []);

    const Layout = auth?.user ? AuthenticatedLayout : GuestLayout;

    return (
        <>
            <Layout header={
                <h2 className="text-xl font-semibold leading-tight ">
                    Welcome
                </h2>
            }>
                <Head title="Welcome" />
                
                
        
                <div
                        className="relative w-full h-full 
                                    flex justify-center items-center 

                                    "
                    >               
                        <VideoPlayer src="/assets/videos/time_lapse.mp4" />
                        
                        {/* Make sure CompanyInfo is positioned correctly */}
                        <CompanyInfo />
                                        

                    {/* add this to dashboard 
                        main className="relative py-12 w-full h-auto grid grid-cols-2 grid-rows-3 gap-5 overflow-hidden mx-auto max-w-7xl lg:px-8"

                        <WelcomeCard
                            key={leftIndex}
                            title={leftCardData[leftIndex].title}
                            icon={leftCardData[leftIndex].icon}
                            className={leftCardData[leftIndex].className}
                        />

                    
                        {rightCardData.map((card, index) => (
                            <WelcomeCard
                                key={index}
                                title={card.title}
                                icon={card.icon}
                                className={card.className}
                            />
                        ))}
                    */}
                </div>


           
            </Layout>
        </>
    );
};


export default Welcome;
