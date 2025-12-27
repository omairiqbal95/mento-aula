"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Modal } from "react-bootstrap";
import type { StaticImageData } from "next/image";

interface VideoModalProps {
  youtubeUrl: string;
  thumbnail: StaticImageData;
  description: string;
}

const VideoModal: React.FC<VideoModalProps> = ({
  youtubeUrl,
  thumbnail,
  description,
}) => {
  const [showVideoModal, setShowVideoModal] = useState(false);

  const handleShowModal = () => setShowVideoModal(true);
  const handleCloseModal = () => setShowVideoModal(false);

  // Extract video ID from YouTube URL
  const getYouTubeVideoId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getYouTubeVideoId(youtubeUrl);

  return (
    <>
      <div className="hero-health__video">
        <div className="hero-health__video-thumb">
          <p>{description}</p>
          <div className="hero-health__video-thumb-wrapper relative">
            <Image
              src={thumbnail}
              alt="hero-video"
              width={0}
              height={0}
              style={{ width: "auto", height: "auto" }}
            />
            <button
              className="popup-youtube position-absolute top-50 start-50 translate-middle bg-white rounded-circle d-flex justify-content-center align-items-center py-2 px-2"
              onClick={handleShowModal}
              aria-label="Play video"
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              <i className="fa-solid fa-play absolute"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <Modal
        show={showVideoModal}
        onHide={handleCloseModal}
        size="lg"
        centered
        className="video-modal"
        backdrop="static"
      >
        <Modal.Body className="p-0 position-relative">
          <button
            type="button"
            className="btn-close position-absolute"
            onClick={handleCloseModal}
            aria-label="Close"
            style={{
              top: "-40px",
              right: "0px",
              zIndex: 1050,
              fontSize: "18px",
              color: "white",
              filter: "invert(1)",
            }}
          ></button>

          {videoId && (
            <div className="ratio ratio-16x9">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&controls=1`}
                title="Video Player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  border: "none",
                  borderRadius: "8px",
                }}
              ></iframe>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default VideoModal;
