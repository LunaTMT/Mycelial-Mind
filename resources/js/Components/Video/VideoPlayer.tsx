import React, { useRef } from "react";
import { motion } from "framer-motion";

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
      className="w-full h-full"
      initial={{ opacity: 0 }} // Start with opacity 0
      animate={{ opacity: 1 }} // Fade in to full opacity
      transition={{ duration: 2 }} // Duration of the fade-in effect
    >
      <video
        ref={videoRef}
        className="w-full h-full object-fill rounded-lg" // Add rounded-md here
        autoPlay
        muted
        loop
        onEnded={handleEnded}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </motion.div>
  );
};

export default VideoPlayer;
