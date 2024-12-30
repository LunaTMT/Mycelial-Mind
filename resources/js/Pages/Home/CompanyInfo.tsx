import React from 'react';
import { motion } from 'framer-motion'; 
import { MdArrowDropDown } from "react-icons/md";

const CompanyInfo: React.FC = () => {
    return (
        <div className="absolute w-full h-full flex flex-col items-center justify-center gap-10 bg-transparent z-10">
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
                className="w-[60%] sm:w-[50%] md:w-[35%] lg:w-[30%] max-w-sm rounded-full"
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

               
            </div>
        </div>
    );
};

export default CompanyInfo;
