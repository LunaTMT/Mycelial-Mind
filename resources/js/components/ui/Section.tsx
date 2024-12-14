import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import LearnMoreButton from "./LearnMoreButton";
import VideoScroll from "./VideoScroll"; 

let gRenderCount = 0;

interface SectionProps {
  title: string;
  text: string;
  images_folder_name: string;
  number_of_images: number;
}

const Section: React.FC<SectionProps> = ({
  title,
  text,
  images_folder_name,
  number_of_images
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [imageIndex, setImageIndex] = useState(1);
  const [isCenter, setIsCenter] = useState(false);
  const [generation, setGeneration] = useState(1);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const fadeInOut = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);
  const FadeOut = useTransform(scrollYProgress,          [0.6, 1,],       [1, 0]);
  
  const progressBarWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);



 
  useEffect(() => {
    gRenderCount++;
    setGeneration(gRenderCount);
  }, []);

 
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((value) => {
      //console.log(value); 
      setIsCenter(value > 0);
      if (value == 1){
        setIsCenter(false);
      }
    });
    
    return () => unsubscribe();
  }, [scrollYProgress]);


  useEffect(() => {
    //console.log("isCenter:", isCenter); 
  }, [isCenter]);

 
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
      className="relative w-[100vw] h-[400vh] flex flex-col justify-center items-center bg-black"
    >
      {isCenter && (
        <motion.div
          style={{ width: progressBarWidth }} 
          className={`fixed top-0 left-0
        
          h-2 z-50 bg-gradient-to-r from-sky-500 to-white shadow-[0_0_20px_5px_rgba(0,182,255,0.6)]`}
        />
      )}

      {/* Title and text section */}
      <motion.div
        style={{ opacity: generation==1? FadeOut : fadeInOut }} 
        className={`
          ${ !isCenter? "absolute top-0 h-1/4" : "fixed top-[30%]"}
     
          flex flex-col items-center justify-center
          text-6xl px-6 lg:px-12 z-30 bg-transparent
        `}
      >
        <h1 className="font-extralight text-center text-white text-7xl dark:text-black lg:text-8xl pb-4">
          {title}
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-white dark:text-gray-300 max-w-4xl mt-4 text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia arcu eget nulla aliquet, nec gravida mi pharetra. Curabitur vel urna ut turpis interdum vehicula.
        </p>
        <LearnMoreButton />
      </motion.div>

      {/* Image section */}
      <motion.img
        src={`/assets/images/scrolling/${images_folder_name}/${imageIndex}.png`}
        alt="Scrolling animation"
        style = {{opacity : fadeInOut}}
        className={`
          w-full h-auto
          fixed bottom-0
          z-20
          md:w-[70%]
          lg:w-[50%]
        `}
      />



    
      
    </div>
  );
}

export default Section;
