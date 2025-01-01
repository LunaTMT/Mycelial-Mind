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
import { MdAccountBox } from "react-icons/md";
import { BiSolidPackage } from "react-icons/bi";
import { FaShippingFast } from "react-icons/fa";


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


    // Right card data
    const rightCardData = [
        { title: "Profile", icon: <MdAccountBox className={IconClass} />, className: 'row-start-1' },
        { title: "Orders", icon: <BiSolidPackage className={IconClass} />, className: 'row-start-2' },
        { title: "Shipping", icon: <FaShippingFast className={IconClass} />, className: 'row-start-3' },
       
    
    ];





    return (
        <AuthenticatedLayout
            header={
            
                <h2 className="text-xl font-semibold leading-tight text-white font-Aileron_UltraLight">
                    Dashboard
                </h2>
                
            }
        >
            <Head title="Dashboard" />
            
            <div className='w-full h-full 
                                        rounded-lg
                                        overflow-hidden mx-auto 
                                        max-w-7xl py-5 sm:px-6 lg:px-8
                                        bg-white/10
                            grid grid-cols-1 grid-rows-3 gap-3 '>
                {/* Left Card */}


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
