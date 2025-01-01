import React from 'react';
import { motion } from 'framer-motion';

const CompanyInfo: React.FC = () => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-10 bg-transparent z-10">
      {/* Logo Image */}
      <motion.img
        src="/assets/images/logo2.png"
        alt="Mycenic Logo"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 3,
          ease: "easeInOut"
        }}
        className="w-[60%] rounded-full"
        style={{
          transformOrigin: "center",
        }}
      />

      {/* Text Content */}
      <div className="flex flex-col items-center justify-center text-center gap-5 bg-transparent w-[90%] lg:w-[60%]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
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
