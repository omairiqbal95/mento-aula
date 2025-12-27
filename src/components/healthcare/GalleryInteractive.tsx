"use client";
import { useState } from "react";
import { createPortal } from "react-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import type { StaticImageData } from "next/image";

interface GalleryImage {
  id: number;
  image: StaticImageData;
  alt: string;
}

interface GalleryInteractiveProps {
  images: GalleryImage[];
}

const GalleryInteractive: React.FC<GalleryInteractiveProps> = ({ images }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImage(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToNext = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToPrev = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") goToNext();
    if (e.key === "ArrowLeft") goToPrev();
    if (e.key === "Escape") closeLightbox();
  };

  return (
    <>
      {/* Desktop Gallery */}
      <div className="gallery-sa__magnific d-none d-md-flex">
        {images.map((item, index) => (
          <div key={item.id} className="gallery-sa__magnific-item">
            <button
              onClick={() => openLightbox(index)}
              className="gallery-sa__magnific-link"
              style={{
                cursor: "pointer",
                border: "none",
                background: "none",
                padding: 0,
                width: "100%",
              }}
            >
              <Image
                src={item.image}
                alt={item.alt}
                width={400}
                height={300}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
              <i className="bi bi-zoom-in" aria-hidden="true"></i>
            </button>
          </div>
        ))}
      </div>

      {/* Mobile Swiper Gallery */}
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1.2}
        spaceBetween={15}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="gallery-sa__slider gallery-sa__magnific d-md-none"
      >
        {images.map((item, index) => (
          <SwiperSlide key={item.id} className="gallery-sa__magnific-item">
            <button
              onClick={() => openLightbox(index)}
              className="gallery-sa__magnific-link"
              style={{
                cursor: "pointer",
                border: "none",
                background: "none",
                padding: 0,
                width: "100%",
              }}
            >
              <Image
                src={item.image}
                alt={item.alt}
                width={400}
                height={300}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
              <i className="bi bi-zoom-in" aria-hidden="true"></i>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Lightbox Modal using Portal */}
      {lightboxOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="lightbox-overlay"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="dialog"
            aria-modal="true"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.9)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              outline: "none",
            }}
          >
            <button
              onClick={closeLightbox}
              aria-label="Close lightbox"
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "white",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                fontSize: "24px",
                cursor: "pointer",
                zIndex: 10000,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ×
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
              aria-label="Previous image"
              style={{
                position: "absolute",
                left: "20px",
                background: "white",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                fontSize: "24px",
                cursor: "pointer",
                zIndex: 10000,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ‹
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              aria-label="Next image"
              style={{
                position: "absolute",
                right: "20px",
                background: "white",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                fontSize: "24px",
                cursor: "pointer",
                zIndex: 10000,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ›
            </button>
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                position: "relative",
              }}
            >
              <Image
                src={images[currentImage].image}
                alt={images[currentImage].alt}
                width={1200}
                height={800}
                style={{
                  width: "auto",
                  height: "auto",
                  maxWidth: "90vw",
                  maxHeight: "90vh",
                }}
                priority
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default GalleryInteractive;
