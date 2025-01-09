import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import CompanyInfo from "@/Pages/Home/CompanyInfo";

interface VideoPlayerProps {
  src: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null); // Create a ref for the video container

  // Track the scroll progress of the video container
  const { scrollYProgress } = useScroll({
    target: videoContainerRef, // Reference the video container
    offset: ["start end", "end start"], // Adjust the offset when the video enters and leaves the view
  });

  // Map scrollYProgress to opacity for the video container
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.5, 1], [0, 1, 1, 0]);
  console.log(scrollYProgress);

  const handleEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  return (
    <motion.div
      ref={videoContainerRef} // Apply the ref to the video container
      className="relative w-full h-full rounded-xl bg-gradient-to-b from-gray-900 via-black to-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      style={{
        opacity: opacity, // Apply the opacity transformation based on scroll progress
      }}
    >
      {/* Video with dissolve effect */}
      <video
        ref={videoRef}
        className="w-full min-h-[85vh] object-cover rounded-xl"
        autoPlay
        muted
        loop
        onEnded={handleEnded}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlayed content */}
      <CompanyInfo />
    </motion.div>
  );
};

export default VideoPlayer;
