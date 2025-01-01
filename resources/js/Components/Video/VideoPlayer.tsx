import React, { useRef } from "react";
import { motion } from "framer-motion";
import CompanyInfo from "@/Pages/Home/CompanyInfo";

interface VideoPlayerProps {
  src: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  return (
    <motion.div
      className="relative w-full h-full"  // Ensure relative positioning for the parent container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover rounded-lg"
        autoPlay
        muted
        loop
        onEnded={handleEnded}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <CompanyInfo />  {/* This will be over the video and centered */}
    </motion.div>
  );
};

export default VideoPlayer;
