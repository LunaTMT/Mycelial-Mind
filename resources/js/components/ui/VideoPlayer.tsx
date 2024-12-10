import React, { useRef } from "react";
import { motion } from "framer-motion";

// Define the props interface
interface VideoPlayerProps {
  src: string; // The source URL for the video
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null); // Create a ref for the video element

  const handleEnded = () => {
    // Reset the video to the start
    if (videoRef.current) {
      videoRef.current.currentTime = 0; // Set the current time to 0
      videoRef.current.play(); // Optionally play the video again immediately
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} // Initial opacity for fade-in
      animate={{ opacity: 1 }} // Animate to full opacity
      transition={{ duration: 2 }} // Duration of the fade-in effect
      className={`fixed w-full h-screen -z-40 
                 ]`}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover" // Full width and height
        autoPlay
        muted
        loop // Loop the video continuously
        onEnded={handleEnded} // Attach the onEnded event
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </motion.div>
  );
};

export default VideoPlayer;
