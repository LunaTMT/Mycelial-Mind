import React from 'react';
import ScrollingWords from '../../components/ui/ScrollingWords';
import { motion } from "motion/react";

const CompanyInfo: React.FC = () => {
    return (
        <div className="relative"> {/* Make the parent div relative */}
            {/* Animate first image coming from the bottom */}
            <motion.div
                whileInView={{ y: 0, opacity: 1 }}  // Animate to original position when in view
                initial={{ y: '50vh', opacity: 0 }}  
                transition={{ duration: 2, ease: "easeInOut" }} 
                className="absolute bottom-0 left-0 right-0 z-10 lg:w-[60%]"
                viewport={{ once: true }} // Ensure animation only happens once when the element is in view
            >
                <img
                    className="w-full h-auto opacity-55" // Make the image scale dynamically with width
                    src="/assets/images/vines.png"
                    alt="Vines"
                />
            </motion.div>

            <div
                className={`relative
                            flex flex-col items-center justify-center 
                            w-full h-screen
                            mx-auto
                            gap-10
                            bg-black
                            sm:gap-8
                            md:gap-5 md:p-5 
                            lg:gap-10 lg:flex-row lg:p-20 
                            xl:gap-20 xl:px-24`}
            >
                
                {/* Left Column: Image */}
                <motion.div 
                    whileInView={{ scale: 1 }}  
                    initial={{ scale: 0 }}
                    transition={{ duration: 2 }}
                    className="flex justify-center w-1/2 md:w-[35%] lg:justify-end xl:justify-start xl:w-[25%] z-20"
                    viewport={{ once: true }}
                >
                    <img
                        className="w-auto h-auto"
                        src="/assets/images/logo2.png"
                        alt="Mycenic Logo"
                    />
                </motion.div>

                {/* Right Column: Text and Content */}
                <div className="flex flex-col items-center justify-center text-center w-[70%] gap-5 z-20
                    md:w-[80%] lg:items-start lg:text-left lg:w-[60%] xl:w-2/3 xl:px-10"
                >
                    <motion.div
                        whileInView={{ opacity: 1, x: 0 }}  // Animate opacity and position when in view
                        initial={{ opacity: 0, x: "100%" }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        viewport={{ once: true }}
                    >
                        <h1 className="
                            font-extralight
                            text-white text-7xl 
                            dark:text-white 
                            lg:text-8xl
                            pb-4
                        ">
                            Mycenic
                        </h1>
                    
                        <ScrollingWords 
                            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
                            words={["Cultivation", "Technology", "Gourmet", "Medicine", "Paraphernalia", "Research"]} 
                        />

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.3, ease: "easeInQuart" }}
                            className="inline-flex items-center justify-center 
                                        px-5 py-3 my-5  
                                        text-2xl font-medium text-center text-white 
                                        bg-black rounded-lg border-2
                                        hover:bg-white hover:border-black hover:text-black hover:scale-110
                                        transform transition-all duration-300 ease-in-out"
                        >
                            Learn more
                            <svg 
                                className="w-6 h-6 ms-2 rtl:rotate-180 
                                            transition-all duration-300 ease-in-out
                                            group-hover:scale-150 z-10"  
                                aria-hidden="true" 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 14 10"
                            >
                                <path 
                                    stroke="currentColor" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth="2" 
                                    d="M1 5h12m0 0L9 1m4 4L9 9"
                                />
                            </svg>
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default CompanyInfo;
