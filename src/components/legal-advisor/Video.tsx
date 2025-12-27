import React from "react";
import Image from "next/image";
import VideoModal from "./VideoModal";
import { videoContent } from "@/content/legal-advisor/home/video";

const Video = () => {
  return (
    <div className="video-la__area">
      <div className="container-fluid p-0">
        <div className="video-la__video">
          <Image
            src={videoContent.backgroundImage}
            alt={videoContent.altText}
          />
          <VideoModal
            videoId={videoContent.videoId}
            altText={videoContent.altText}
          />
        </div>
      </div>
    </div>
  );
};

export default Video;
