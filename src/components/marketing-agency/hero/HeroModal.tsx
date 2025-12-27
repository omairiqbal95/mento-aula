"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Modal } from "react-bootstrap";
import PlayIcon from "@/icons/PlayIcon";

interface VideoModalProps {
  videoId: string;
  className: string;
}

const VideoModal = ({ videoId, className }: VideoModalProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleVideoClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <button className={className} onClick={handleVideoClick}>
        <PlayIcon />
      </button>
      {typeof document !== "undefined" && createPortal(
        <Modal show={showModal} onHide={handleCloseModal} size="lg" centered contentClassName="overflow-hidden">
          <Modal.Header closeButton className="border-0"/>
          <Modal.Body className="p-0">
            <div className="ratio ratio-16x9">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
                title="Video Content"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          </Modal.Body>
        </Modal>,
        document.body
      )}
    </>
  );
};

export default VideoModal;
