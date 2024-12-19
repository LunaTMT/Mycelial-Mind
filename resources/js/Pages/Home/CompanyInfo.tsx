import React from 'react';
import ScrollingWords from '../../Components/Text/ScrollingWords';
import LearnMoreButton from '../../Components/Buttons/LearnMoreButton';

import { motion } from "motion/react";

const CompanyInfo: React.FC = () => {
    return (
        <>
            {/*
            <motion.img
                whileInView={{ y: 0, opacity: 1 }}
                initial={{ y: '50vh', opacity: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="absolute bottom-0 left-0 right-0 z-20 lg:w-[50%]"
                src="/assets/images/vines.png"
                alt="Vines"
                viewport={{ once: true }}
            ></motion.img>
            */}

            {/* Main Content */}
            <div className="relative flex flex-col items-center justify-center w-screen h-screen 
            mx-auto z-20 border-white gap-10 
            
            lg:justify-center lg:pt-28">
                {/* top : Text and Content */}
                <motion.img
                    src="/assets/images/logo2.png"
                    alt="Mycenic Logo"
                    initial={{ scale: 0.1, y: -100 }}
                    animate={{ scale: 1, y: 0}}
                    transition={{ duration: 2 }}
                    className="w-[60%] z-20 
                    sm:w-[50%] md:w-[35%] lg:w-[30%] max-w-sm"
                />
                {/* bottom : Text and Content */}
                <div className="flex flex-col items-center justify-center text-center gap-5 z-20 bg-transparent border-blue-500 w-[90%] lg:w-[60%]">
                    <motion.div
                        initial={{ opacity: 0, y: "120%" }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                    >
                        <h1 className="font-Audrey_Normal text-white text-7xl sm:text-8xl md:text-8xl lg:text-9xl pb-4">
                            MYCENIC
                        </h1>
                        <ScrollingWords
                            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
                            words={["Cultivation", "Technology", "Gourmet", "Medicine", "Paraphernalia", "Research"]}
                        />
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default CompanyInfo;
