import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaArrowCircleUp } from "react-icons/fa";

const ScrollTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  return (
    <>
      {isVisible && (
        <motion.button
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            whileHover={{scale : 1.15}}

            transition={{duration: 2}}
            onClick={ScrollToTop}
            className="z-50 fixed bottom-5 right-5 
            bg-white bg-gradient-to-r from-sky-500 to-white
            shadow-[0_0_20px_5px_rgba(0,182,255,0.6)]
            rounded-full
            w-14 h-auto
            flex items-center justify-center"
        >
          <FaArrowCircleUp className="w-[95%] h-full  " />
        </motion.button>
      )}
    </>
  );
};

export default ScrollTop;
