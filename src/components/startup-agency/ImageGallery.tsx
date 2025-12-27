"use client";

import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import { imageGalleryContent } from "@/content/startup-agency/home/imageGallery";

export default function ImageGallery() {
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
    setCurrentImage((prev) =>
      prev === imageGalleryContent.images.length - 1 ? 0 : prev + 1
    );
  };

  const goToPrev = () => {
    setCurrentImage((prev) =>
      prev === 0 ? imageGalleryContent.images.length - 1 : prev - 1
    );
  };

  return (
    <>
      <div className="gallery-sa__area overflow-hidden">
        {/* Desktop Gallery */}
        <div className="gallery-sa__magnific d-none d-md-flex">
          {imageGalleryContent.images.map((item, index) => (
            <div key={item.id} className="gallery-sa__magnific-item">
              <button
                onClick={() => openLightbox(index)}
                className="gallery-sa__magnific-link"
                style={{
                  cursor: "pointer",
                  border: "none",
                  background: "none",
                  padding: 0,
                }}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={400}
                  height={300}
                  style={{ width: "100%", height: "auto" }}
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
          {imageGalleryContent.images.map((item, index) => (
            <SwiperSlide key={item.id} className="gallery-sa__magnific-item">
              <button
                onClick={() => openLightbox(index)}
                className="gallery-sa__magnific-link"
                style={{
                  cursor: "pointer",
                  border: "none",
                  background: "none",
                  padding: 0,
                }}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={400}
                  height={300}
                  style={{ width: "100%", height: "auto" }}
                />
                <i className="bi bi-zoom-in" aria-hidden="true"></i>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="lightbox-overlay"
          onClick={closeLightbox}
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
          }}
        >
          <button
            onClick={closeLightbox}
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
            }}
          >
            ×
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrev();
            }}
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
            }}
          >
            ‹
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
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
              src={imageGalleryContent.images[currentImage].image}
              alt={imageGalleryContent.images[currentImage].alt}
              width={1200}
              height={800}
              style={{
                width: "auto",
                height: "auto",
                maxWidth: "90vw",
                maxHeight: "90vh",
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
