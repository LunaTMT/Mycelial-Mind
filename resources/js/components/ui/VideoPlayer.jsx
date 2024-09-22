import React from 'react';

const VideoPlayer = ({ src }) => {
  return (
    <div className="h-full w-full">
      <video autoPlay muted>
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
