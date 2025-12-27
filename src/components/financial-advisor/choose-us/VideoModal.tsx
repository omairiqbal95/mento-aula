"use client";

import React, { useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { Modal } from "react-bootstrap";
import { VideoSection } from "@/types/financial-advisor/choose-us";

interface VideoModalProps {
  video: VideoSection;
}

const VideoModal = ({ video }: VideoModalProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleVideoClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="choose-us-fin__video">
      <div className="video">
        <Image
          src={video.image}
          alt={video.altText}
        />
        <button
          className="popup-youtube"
          onClick={handleVideoClick}
        >
          <i className="fa-solid fa-play"></i>
        </button>
      </div>

      {typeof document !== "undefined" &&
        createPortal(
          <Modal 
            show={showModal} 
            onHide={handleCloseModal} 
            size="lg" 
            centered 
            contentClassName="overflow-hidden"
          >
            <Modal.Header closeButton className="border-0" />
            <Modal.Body className="p-0">
              <div className="ratio ratio-16x9">
                <iframe
                  src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&mute=1`}
                  title={video.altText}
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
              </div>
            </Modal.Body>
          </Modal>,
          document.body
        )}
    </div>
  );
};

export default VideoModal;
