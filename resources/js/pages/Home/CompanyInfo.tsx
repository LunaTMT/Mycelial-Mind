import React from 'react';
import ScrollingWords from '../../components/ui/ScrollingWords';
import LearnMoreButton from '../../components/ui/LearnMoreButton';




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
            <div
                className={`
                    relative
                    flex flex-col items-center justify-end
                    w-full h-screen
                    mx-auto
                    gap-10
                    sm:gap-8
                    md:gap-5 md:p-5 
                    lg:gap-10 lg:flex-row lg:p-20 
                    xl:gap-20 xl:px-24
                    z-20
                `}
            >
                {/* Left Column: Image */}
                <motion.img
                    src="/assets/images/logo2.png"
                    alt="Mycenic Logo"
                    initial={{ scale: 0.1 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 1 }}
                    className={`
                        flex justify-center 
                        w-1/2 
                        z-20
                        md:w-[35%] md:justify-end md:border-none md:border-red-600
                        lg:justify-end 
                        xl:justify-start xl:w-[25%]
                    `}
                    viewport={{ once: true, amount: 0.5 }}
                />

                {/* Right Column: Text and Content */}
                <div
                    className={`
                        flex flex-col items-center justify-center text-center gap-5 z-20
                        bg-transparent p-6 rounded-lg
                        lg:items-start lg:text-left
                    `}
                >
                    <motion.div
                        whileInView={{ opacity: 1, x: 0 }}
                        initial={{ opacity: 0, x: "30%" }} 
                        transition={{ duration: 1, ease: "easeInOut" }}
                        viewport={{ once: true, amount: 0.5 }}
                    >
                        <h1
                            className={`
                                font-extralight
                                text-white text-7xl 
                                dark:text-white 
                                lg:text-8xl
                                pb-4
                            `}
                        >
                            Mycenic
                        </h1>

                        <ScrollingWords
                            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
                            words={["Cultivation", "Technology", "Gourmet", "Medicine", "Paraphernalia", "Research"]}
                        />

                        <LearnMoreButton />

                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default CompanyInfo;
