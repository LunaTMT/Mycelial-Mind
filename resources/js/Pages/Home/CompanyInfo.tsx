import React from 'react';
import { motion } from 'framer-motion'; // Correct the import for framer-motion
import { MdArrowDropDown } from "react-icons/md";

const CompanyInfo: React.FC = () => {
    return (
        <>
            {/* Main Content */}
            <div className="relative flex flex-col items-center justify-center w-screen h-screen mx-auto gap-10">
                {/* Logo Image */}
                <motion.img
                    src="/assets/images/logo2.png"
                    alt="Mycenic Logo"
                    initial={{ scale: 0.0, opacity: 0 }} // Start with smaller scale, opacity 0
                    animate={{ scale: 1, opacity: 1 }}  // Animate to normal size, full opacity
                    transition={{
                        duration: 3,  // Duration of the animation
                        ease: "easeInOut"  // Easing function
                    }}
                    className="w-[60%] sm:w-[50%] md:w-[35%] lg:w-[30%] max-w-sm rounded-full"  // Make the image circular
                    style={{
                        transformOrigin: "center",  // Ensure the image scales from its center
                    }}
                />

                {/* Text Content */}
                <div className="flex flex-col items-center justify-center text-center gap-5 bg-transparent w-[90%] lg:w-[60%]">
                    
                    <motion.div
                        initial={{ opacity: 0, y: 300 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 3, ease: 'easeInOut' }}
                    >
                        <h1 className="font-Audrey_Normal text-white text-7xl sm:text-8xl md:text-8xl lg:text-9xl pb-4">
                            MYCENIC
                        </h1>

                    </motion.div>

                
                    <motion.div
                        className="absolute right-0 bottom-0 text-white w-[100%] h-auto flex items-center justify-center"
                        initial={{ y: "100%" }}  // Start off-screen, at the bottom
                        animate={{
                            y: "0%",  
                        }}
                        transition={{
                            duration: 4,  // Duration of the pop-up animation
                            ease: "easeOut",  // Smooth easing effect for the animation
                            type: "tween",  // Smooth transition
                        }}
                    >
                        <MdArrowDropDown className="text-9xl" /> {/* Set the icon size here */}
                    </motion.div>



                </div>
            </div>
        </>
    );
};

export default CompanyInfo;
