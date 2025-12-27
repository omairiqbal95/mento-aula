"use client";

import { useState } from "react";
import Image from "next/image";
import { Modal } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper/modules";
import { BlogSidebarGalleryItem } from "@/types/common/blog-sidebar";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

interface GalleryWidgetProps {
  title: string;
  galleryItems: BlogSidebarGalleryItem[];
}

const GalleryWidget = ({ title, galleryItems }: GalleryWidgetProps) => {
  const [showModal, setShowModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleShow = (index: number) => {
    setActiveIndex(index);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  return (
    <>
      <div className="widget__item widget__gallery">
        <h6 className="h6 widget__title">{title}</h6>
        <ul className="custom-ul gallery-list">
          {galleryItems.map((item, index) => (
            <li key={item.id}>
              <div
                className="blog-gallery-item-wrapper"
                onClick={() => handleShow(index)}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  className="blog-gallery-thumbnail"
                />
                <div className="blog-gallery-overlay">
                  <i className="fa-solid fa-magnifying-glass-plus"></i>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* React Bootstrap Modal with Carousel - Full Screen */}
      <Modal
        show={showModal}
        onHide={handleClose}
        fullscreen={true}
        backdrop={false}
        keyboard={true}
        dialogClassName="blog-gallery-modal"
        contentClassName="blog-gallery-modal-content"
      >
        <div className="blog-gallery-modal-backdrop" onClick={handleClose} />
        <Modal.Header className="blog-gallery-modal-header">
          <button
            type="button"
            className="btn-close blog-gallery-close-btn"
            aria-label="Close"
            onClick={handleClose}
          />
        </Modal.Header>
        <Modal.Body className="blog-gallery-modal-body">
          <Swiper
            modules={[Navigation, Keyboard]}
            spaceBetween={0}
            slidesPerView={1}
            navigation={true}
            keyboard={{ enabled: true }}
            loop={true}
            loopAdditionalSlides={1}
            speed={600}
            effect="slide"
            initialSlide={activeIndex}
            allowTouchMove={true}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="blog-gallery-swiper"
          >
            {galleryItems.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="blog-gallery-slide-container">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={200}
                    height={200}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default GalleryWidget;
