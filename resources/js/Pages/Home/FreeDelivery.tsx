import { motion, useTransform, useScroll } from "framer-motion";
import React, { useRef, useEffect } from "react";
import { TbTruckDelivery } from "react-icons/tb";

const FreeDelivery: React.FC = () => {
  // Create a ref for the parent div
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Track the scroll progress of the container using its ref
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"], // Adjust offset based on when you want to trigger the scroll effect
  });




  // Scale transformation for the entire section based on scroll progress
  const scale = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <motion.div
      ref={containerRef} // Set the ref to track scroll progress of this div
      className="w-full min-h-[85vh]  flex flex-col items-center justify-center text-black rounded-t-lg relative"
      style={{ scale }} // Apply the scale transformation based on scroll progress
    >
      <TbTruckDelivery />

      <h1 className="font-Audrey_Normal absolute inset-0 translate-y-[25%] flex items-center justify-center text-black dark:text-white text-6xl">
        FREE DELIVERIES
      </h1>
    </motion.div>
  );
};

export default FreeDelivery;
