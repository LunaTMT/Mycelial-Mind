import React, { useRef } from "react";
import { motion } from "framer-motion";
import CompanyInfo from "@/Pages/Home/CompanyInfo";

interface VideoPlayerProps {
  src: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null); // Create a ref for the video container

  const handleEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  return (
    <motion.div
      ref={videoContainerRef}
      className="relative w-full min-h-[85vh] rounded-lg flex items-center justify-center  "
      initial={{ opacity: 0, y: "20%" }}
      animate={{ opacity: 1, y: "0%" }}
      transition={{ opacity: { duration: 2 }, y: { duration: 1, ease: "easeOut" } }}
    >
      <video
        ref={videoRef}
        className="w-[100vw] min-h-[85vh] object-cover rounded-lg p-[2px]"
        autoPlay
        muted
        loop
        onEnded={handleEnded}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-5">
        <img
          src="/assets/images/logo2.png"
          alt="Mycenic Logo"
          className="w-[60%] rounded-full bg-gradient-to-t from-black "
        />
        <h1 className="font-Audrey_Normal text-white text-9xl leading-tight bg-clip-text bg-gradient-to-tr  ">
          MYCENIC
        </h1>
      </div>
      
    </motion.div>

  );
};

export default VideoPlayer;
