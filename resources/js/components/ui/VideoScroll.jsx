import React, { useEffect, useRef } from 'react';

const VideoScroll = ({ src }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    const handleScroll = () => {
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      const scrollY = window.scrollY;
      const progress = scrollY / scrollHeight;
      const clampedProgress = Math.max(0, Math.min(1, progress));

      if (video.duration && !isNaN(video.duration)) {
        video.currentTime = video.duration * clampedProgress;
      }
    };

    const handleLoadedMetadata = () => {
      video.pause();
      // Attach scroll event listener only after video metadata is loaded
      window.addEventListener('scroll', handleScroll);
    };

    if (video) {
      video.addEventListener('loadedmetadata', handleLoadedMetadata);

      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return (
    <div>
      <video ref={videoRef} width="100%" controls>
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoScroll;
