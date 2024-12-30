import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Swal from 'sweetalert2'; // Import SweetAlert2
import WelcomeCard from '@/Components/Cards/WelcomeCard';

import { CiLogin } from 'react-icons/ci';
import { IoHomeOutline } from 'react-icons/io5';
import { BsShop } from "react-icons/bs";
import { GrResources } from "react-icons/gr";
import { FaInfoCircle } from "react-icons/fa";

export default function Dashboard() {
    const { props } = usePage();
    const loggedIn = props.loggedIn;

    useEffect(() => {
        if (loggedIn) {
            Swal.fire({
                title: 'Success!',
                text: 'You have successfully logged in.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        }
    }, [loggedIn]);

    const IconClass = "w-full p-5 h-auto ";
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


    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-white font-Aileron_UltraLight space-x-10">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            
            <div className="relative  w-full  grid grid-cols-2 grid-rows-3 gap-5 overflow-hidden mx-auto ">

                {/* Left Card */}
                <motion.div
                    key={leftIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <WelcomeCard
                        title={leftCardData[leftIndex].title}
                        icon={leftCardData[leftIndex].icon}
                        className={leftCardData[leftIndex].className}
                    />
                </motion.div>

                {/* Right Cards */}
                {rightCardData.map((card, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <WelcomeCard
                            title={card.title}
                            icon={card.icon}
                            className={card.className}
                        />
                    </motion.div>
                ))}
            </div>

            
        </AuthenticatedLayout>
    );
}
