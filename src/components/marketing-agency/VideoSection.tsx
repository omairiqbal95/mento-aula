import React from 'react';
import { CONSTANT_VIDEO_DATA } from "@/content/marketing-agency/home/video-section";

const VideoBackground = () => {
  const { videoSrc, autoPlay, isMuted, isLooped } = CONSTANT_VIDEO_DATA;  
  return (
    <div className="video-mar__area">
      <div className="video-wrapper">
        <video
          src={videoSrc}
          autoPlay={autoPlay} 
          muted={isMuted} 
          loop={isLooped}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoBackground;