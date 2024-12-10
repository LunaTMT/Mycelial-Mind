import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

interface VideoScrollerProps {
  videoSrc: string;
}

const VideoScroller: React.FC<VideoScrollerProps> = ({ videoSrc }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef(null);
  const [videoDuration, setVideoDuration] = useState(0); // State to store video duration
  const isInView = useInView(containerRef);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["end end", "start start"], // Bottom enters and leaves the viewport
  });

  // Map scroll progress to video time (0 to videoDuration)
  const videoTime = useTransform(scrollYProgress, [0, 1], [0, videoDuration]);


  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((value) => {
        console.log(value);
    });

    return () => unsubscribe();
  }, [scrollYProgress])

  useEffect(() => {
    // Update video duration once metadata is loaded
    const videoElement = videoRef.current;
    

    if (videoElement) {
      const handleLoadedMetadata = () => {
        setVideoDuration(videoElement.duration);
      };
      videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);

      return () => {
        videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
      };
    }
  }, []);

  useEffect(() => {
    // Sync video playback time with scroll progress
    const unsubscribe = videoTime.onChange((time) => {
      if (videoRef.current) {
        videoRef.current.currentTime = time;
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [videoTime]);

  return (
    <div ref={containerRef} className="relative w-full h-screen">
      <motion.video
        ref={videoRef}
        src={videoSrc}
        className="absolute top-0 left-0 w-full h-full object-cover"
        muted
        playsInline
      />
    </div>
  );
};

export default VideoScroller;
