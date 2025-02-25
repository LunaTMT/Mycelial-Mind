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
    <div className="w-full h-[94vh] relative">
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

      {/* Gradient Overlay (Bottom) */}
      <div className="absolute bottom-0 left-0 w-full h-1/2  bg-gradient-to-t from-white via-transparent to-transparent dark:from-slate-800  pointer-events-none" />

      {/* Content */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-5">
        {/* Logo */}
        <img
          src="/assets/images/logo2.png"
          alt="Mycenic Logo"
          className="w-[40%] rounded-full border-2 bg-gradient-to-t from-[#f5f5dc]/40 dark:bg-gradient-to-t dark:from-slate-400 dark:via-slate-800/50 shadow-[0_0_15px_5px rgba(245,245,220,0.8)] dark:shadow-[0_0_15px_5px rgba(192,192,192,0.8)] hover:shadow-[0_0_25px_15px rgba(245,245,220,1)] dark:hover:shadow-[0_0_25px_15px rgba(192,192,192,1)]"
          style={{ animation: "shadowPulse 5s ease-in-out infinite" }}
        />

        {/* Animated Heading */}
        <motion.h1
          className="font-Audrey text-transparent bg-clip-text bg-gradient-to-t from-[#e7e77a] to-white text-[200px] leading-tight text-shadow-beige-glow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          MYCENIC
        </motion.h1>
      </div>
    </div>
  );
};

export default VideoPlayer;
