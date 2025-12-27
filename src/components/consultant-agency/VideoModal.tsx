"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Modal } from "react-bootstrap";

interface VideoModalProps {
  videoId: string;
  altText: string;
}

const VideoModal = ({ videoId, altText }: VideoModalProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleVideoClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <button
        className="popup-youtube"
        onClick={handleVideoClick}
      >
        <i className="fa-solid fa-play"></i>
      </button>

      {typeof document !== "undefined" &&
        createPortal(
          <Modal show={showModal} onHide={handleCloseModal} size="lg" centered contentClassName="overflow-hidden">
            <Modal.Header closeButton  className="border-0"/>
            <Modal.Body className="p-0">
              <div className="ratio ratio-16x9">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
                  title={altText}
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
              </div>
            </Modal.Body>
          </Modal>,
          document.body
        )}
    </>
  );
};

export default VideoModal;
