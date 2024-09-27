import React, { useRef } from 'react';

const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null); // Create a ref for the video element

  const handleEnded = () => {
    // Reset the video to the start
    if (videoRef.current) {
      videoRef.current.currentTime = 0; // Set the current time to 0
      videoRef.current.play(); // Optionally play the video again immediately
    }
  };

  return (
    <div className="w-full h-screen -z-40"> {/* Full viewport height */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover" // Full width and height
        autoPlay
        muted
        onEnded={handleEnded} // Attach the onEnded event
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
