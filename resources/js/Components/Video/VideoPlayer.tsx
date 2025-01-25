import React, { useRef } from "react";
import { motion } from "framer-motion";

interface VideoPlayerProps {
  src: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);

  const handleEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  return (
    <motion.div
      ref={videoContainerRef}
      className="w-full h-[94vh] relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 5 }}
    >
      {/* Video */}
      <video
        ref={videoRef}
        className="w-screen h-full object-cover"
        autoPlay
        muted
        loop
        onEnded={handleEnded}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent  pointer-events-none z-10"></div>

      {/* Content */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-5">
        {/* Animated Image */}
        <motion.img
          src="/assets/images/logo2.png"
          alt="Mycenic Logo"
          className="w-[40%] rounded-full bg-gradient-to-t from-black"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 3,
            ease: "easeOut",
          }}
        />

        {/* Animated Heading */}
        <motion.h1
          className="font-Audrey  text-white text-[200px] leading-tight"
          initial={{ y: "100vh" }}
          animate={{ y: 0 }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
            
          }}
        >
          MYCENIC
        </motion.h1>


      </div>
    </motion.div>
  );
};

export default VideoPlayer;
