import { motion, useTransform, useScroll } from "framer-motion";
import React, { useRef, useEffect } from "react";

const MoneyBackGaurantee: React.FC = () => {
  // Create a ref for the parent div
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Track the scroll progress of the container using its ref
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"], // Adjust offset based on when you want to trigger the scroll effect
  });

  // Log the scrollYProgress value
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latestProgress) => {
      console.log("scrollYProgress:", latestProgress);
    });

    return () => unsubscribe(); // Cleanup the subscription when the component unmounts
  }, [scrollYProgress]);

  // Scale transformation for the entire section based on scroll progress
  const scale = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <motion.div
      ref={containerRef} // Set the ref to track scroll progress of this div
      className="w-full min-h-[85vh] flex flex-col items-center justify-center text-white rounded-t-lg relative"
      style={{ scale }} // Apply the scale transformation based on scroll progress
    >
      {/* Video Background */}
      <motion.div className="relative p-10 rounded-full flex items-center justify-center overflow-hidden">
        <div className="w-64 h-64 rounded-full overflow-hidden">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/assets/animations/handshake.mov" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </motion.div>

      <h1 className="font-Audrey_Normal absolute inset-0 translate-y-[25%] flex items-center justify-center text-black dark:text-white text-6xl">
        MONEY BACK GUARANTEED
      </h1>
    </motion.div>
  );
};

export default MoneyBackGaurantee;
