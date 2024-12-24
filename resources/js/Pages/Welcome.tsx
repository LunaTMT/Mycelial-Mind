import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Head, Link } from '@inertiajs/react';

import ApplicationLogo from '@/Components/Login/ApplicationLogo';
import MouseColorChanger from '@/Components/Background/MouseColorChanger';
import CompanyInfo from '@/Pages/Home/CompanyInfo';
import WelcomeCard from "@/Components/Cards/WelcomeCard";

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
        { title: "Store", icon: <BsShop className={IconClass} />, className: 'row-start-1 col-start-3' },
        { title: "Resources", icon: <GrResources className={IconClass} />, className: 'row-start-2 col-start-3' },
        { title: "About", icon: <FaInfoCircle className={IconClass} />, className: 'row-start-3 col-start-3' },
    ];

    // State to keep track of the leftIndex
    const [leftIndex, setLeftIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setLeftIndex((prevIndex) => (prevIndex + 1) % leftCardData.length); // Increment index and loop
        }, 3000); // Update every 3 seconds

        return () => clearInterval(interval); // Clean up interval on component unmount
    }, []);

    return (
        <>
            <Head title="Welcome" />
            
            <MouseColorChanger />

            <div className=" h-auto
                        bg-gradient-to-r from-sky-500 via-slate-900 to-sky-500 
                        text-black/50 dark:bg-black dark:text-white/50 
                        " id="container">

                <CompanyInfo />
                

                <div className="relative w-full h-screen  z-10 bg-gradient-to-r from-sky-500 via-slate-900 to-sky-500 ">
                    <header className="h-[15%] top-0 grid grid-cols-3 items-center">

                        <div className="col-start-2">
                            <ApplicationLogo className="w-[20%] h-full m-auto bg-gradient-to-r from-sky-500 to-slate-950 rounded-full opacity-[100%] fill-current bg-black" />
                        </div>

                        <nav className="flex justify-end pr-5 col-start-3">
                            {auth.user ? (
                                <Link href={route('dashboard')}>
                                    <IoHomeOutline className="w-10 h-10 text-white" />
                                </Link>
                            ) : (
                                <Link href={route('dashboard')}>
                                    <CiLogin className="w-10 h-10 text-white" />
                                </Link>
                            )}
                        </nav>
                    </header>

                    <motion.main
                        className="h-[85%] w-full grid grid-cols-3 grid-rows-3 p-10 gap-5 overflow-hidden"
                        initial={{ opacity: 0, y: 100 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{ duration: 2 }}
                    >
                        {/* Display the current card based on leftIndex */}
                        <WelcomeCard
                            key={leftIndex}
                            title={leftCardData[leftIndex].title}
                            icon={leftCardData[leftIndex].icon}
                            className={leftCardData[leftIndex].className}
                        />

                        {/* Right side static cards */}
                        {rightCardData.map((card, index) => (
                            <WelcomeCard
                                key={index}
                                title={card.title}
                                icon={card.icon}
                                className={card.className}
                            />
                        ))}
                    </motion.main>
                </div>
            </div>
        </>
    );
}

export default Welcome;
