import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis'

const ParallaxVideo: React.FC<{ src: string }> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({ lerp: 0.1 });
    lenisRef.current = lenis;
  
    const handleScroll = (e: any) => {
      const scrollY = window.scrollY || e.scroll;
      if (videoRef.current && videoRef.current.readyState >= 2) { // Check if video is loaded
        // Instead of adding 1, you might want to add a fraction of scrollY to advance time
        videoRef.current.currentTime += scrollY * 0.001; // Adjust this factor as needed
        console.log(videoRef.current.currentTime);
      }
    };
  
    // Attach Lenis scroll event
    lenis.on('scroll', handleScroll);
  
    // Start the requestAnimationFrame loop for Lenis
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  
    return () => {
      // Clean up on unmount
      lenis.destroy();
    };
  }, []);

  return (
    <div className="video-container" style={{ position: 'relative', overflow: 'hidden', height: '100vh' }}>
        <video
        ref={videoRef}
        src={src}
        className="w-full h-auto object-cover"
        autoPlay
        muted
        // Remove loop attribute to prevent automatic restart
        // loop
        style={{ position: 'absolute', top: 0, left: 0 }}
        >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default ParallaxVideo;
