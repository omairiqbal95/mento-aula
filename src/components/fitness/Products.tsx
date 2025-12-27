"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { productsContent } from "@/content/fitness/home/products";

const Products = () => {
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
      prev === productsContent.products.length - 1 ? 0 : prev + 1
    );
  };

  const goToPrev = () => {
    setCurrentImage((prev) =>
      prev === 0 ? productsContent.products.length - 1 : prev - 1
    );
  };

  const swiperConfig = {
    spaceBetween: 30,
    speed: 1000,
    loop: true,
    slidesPerView: 2,
    allowTouchMove: true,
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 25,
      },
    },
  };

  return (
    <>
      <div className="products-fit pt-150">
        <div className="container container-fitness">
          <div className="row text-center">
            <div className="col-12">
              <h3
                className="h3 section__header-title-v10 fade_up_anim"
                data-delay=".2"
              >
                {productsContent.sectionHeader.title}
              </h3>
            </div>
          </div>
          <div className="row pt-100">
            <div className="col-12">
              {/* Desktop Gallery */}
              <div className="products-fit__gallery gallery-sa__magnific d-none d-md-flex">
                {productsContent.products.map((product, index) => (
                  <div
                    key={product.id}
                    className="gallery-sa__magnific-item products-fit__gallery-item fade_up_anim"
                    data-delay={product.delay}
                  >
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
                      <Image src={product.image} alt={product.alt} />
                      <i className="bi bi-zoom-in" aria-hidden="true"></i>
                    </button>
                  </div>
                ))}
              </div>

              {/* Mobile Swiper Gallery */}
              <div className="swiper products-fit__slider gallery-sa__slider gallery-sa__magnific d-md-none">
                <Swiper {...swiperConfig} className="swiper-wrapper">
                  {productsContent.products.map((product, index) => (
                    <SwiperSlide
                      key={product.id}
                      className="swiper-slide gallery-sa__magnific-item"
                    >
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
                        <Image src={product.image} alt={product.alt} />
                        <i className="bi bi-zoom-in" aria-hidden="true"></i>
                      </button>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
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
              src={productsContent.products[currentImage].image}
              alt={productsContent.products[currentImage].alt}
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
};

export default Products;
