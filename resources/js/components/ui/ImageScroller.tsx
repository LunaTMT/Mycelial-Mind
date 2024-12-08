import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring} from "framer-motion";
import LearnMoreButton from "./LearnMoreButton";



interface ImageScrollerProps {
  title: string;
  text: string;
  images_folder_name: string;
  number_of_images: number;
}

const ImageScroller: React.FC<ImageScrollerProps> = ({
  title,
  text,
  images_folder_name,
  number_of_images,
}) => {
  const parentRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: parentRef,
    offset: ["start end", "end end"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [imageIndex, setImageIndex] = useState(1);
  const [isCenter, setIsCenter] = useState(false);

  const opacity = useTransform(scrollYProgress, [0.6, 0.75, 0.8, 1], [0, 1, 1, 0]);
  const scrollYPercentage = useTransform(scrollYProgress, [0, 1], [0, 100]);




  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latestScrollYProgress) => {
      setIsCenter(latestScrollYProgress > 0.5);
       
      
      console.log(latestScrollYProgress * 100);
      if (latestScrollYProgress > 0.5) {
        const newImageIndex = Math.min(
          Math.max(
            Math.round((latestScrollYProgress - 0.5) * number_of_images + 1),
            1
          ),
          number_of_images
        );
        setImageIndex(newImageIndex);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [scrollYProgress, number_of_images]);

  return (
    <div
      ref={parentRef}
      className="relative 
      flex items-center justify-center
      w-full h-[150vh] z-20 overflow-visible bg-black border border-red-600"
    >
      
      <motion.div
        className="absolute top-0 left-0 right-0 h-[10px] bg-red-500"
        style={{scaleX}}
      >

      </motion.div>




      {/* Other content */}
      <motion.div
        style={{ opacity }}
        className="relative w-full h-full 
              flex flex-col justify-center items-center text-6xl px-6 lg:px-12 z-50"
      >
        <h1 className="font-extralight text-white text-7xl dark:text-black lg:text-8xl pb-4">
          {title}
        </h1>

        <p className="text-base sm:text-lg lg:text-xl text-white dark:text-gray-300 max-w-4xl mt-4 text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>

        <LearnMoreButton />
      </motion.div>

      <motion.img
        src={`/assets/images/scrolling/${images_folder_name}/${imageIndex}.png`}
        alt="Oyster animation"
        style={{ opacity }} // Apply transformed opacity
        initial={{ y: "100%" }} // Start off-screen from below
        animate={{
          y: isCenter ? "0%" : "100%", // Move based on isCenter
        }}
        transition={{ duration: 0.5 }}
        className={`${
          isCenter ? "fixed bottom-[0%]" : "absolute"
        } w-[50%] h-auto flex flex-col justify-center items-center 
          `}
      />
    </div>
  );
};

export default ImageScroller;
