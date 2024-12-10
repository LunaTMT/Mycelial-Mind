import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView, useTransform } from "motion/react";
import LearnMoreButton from "./LearnMoreButton";
import { useScroll } from "framer-motion";


interface SectionProps {
  images_folder_name: string;
  number_of_images: number;
  title: string;
  text: string
}


const Section: React.FC<SectionProps> = ({
  images_folder_name,
  number_of_images,
  title,
  text,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });



  const [imageIndex, setImageIndex] = useState(1);
  const getCurrentIndex = useTransform(scrollYProgress, [0, 1], [1, number_of_images - 1]);
  
  useEffect(() => {
    const unsubscribe = getCurrentIndex.onChange((value) => {
      setImageIndex(Math.round(value)); 
    });

    return () => unsubscribe(); 
  }, [getCurrentIndex]);


  


  return (
    <div
      ref={ref}
      className="relative w-[100vw] h-[100vh] flex flex-col justify-center items-center 
      bg-black  shadow-[0_0_20px_5px_rgba(135,206,250,0.75)]"
    >
      {/* Section for title and text */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 5 }}
        className="relative w-full flex flex-col items-center justify-center 
                  text-6xl px-6 lg:px-12 z-20 bg-transparent"
      >
        <h1 className="font-extralight text-center text-white text-7xl dark:text-black lg:text-8xl pb-4">
          {title}
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-white dark:text-gray-300 max-w-4xl mt-4 text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <LearnMoreButton />
      </motion.div>

      {/* ImageScroller */}
      <motion.img
        src={`/assets/images/scrolling/${images_folder_name}/${imageIndex}.png`}
        alt="Scrolling animation"
        className={`absolute bottom-0 left-0 
          object-contain
          w-full h-auto
          border 
        `}
      />
    </div>
  );
};

export default Section;
