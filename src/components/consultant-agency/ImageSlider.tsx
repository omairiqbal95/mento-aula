"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import Image from "next/image";
import { imageSliderItems } from "@/content/consultant-agency/home/image-slider";

const ImageSlider = () => {
  const progressCircle = useRef<SVGSVGElement>(null);
  const progressContent = useRef<HTMLSpanElement>(null);

  const onAutoplayTimeLeft = (swiper: unknown, time: number, progress: number) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty("--progress", String(1 - progress));
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  return (
    <div className="image-slider__area">
      <div className="swiper image-slider">
        <Swiper
          centeredSlides={true}
          speed={2500}
          effect="fade"
          loop={true}
          fadeEffect={{
            crossFade: true
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false
          }}
          pagination={{
            el: ".image-slider .swiper-pagination",
            clickable: true
          }}
          navigation={{
            nextEl: ".image-slider .swiper-button-next",
            prevEl: ".image-slider .swiper-button-prev"
          }}
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
        >
          {imageSliderItems.map((item) => (
            <SwiperSlide key={item.id} className="swiper-slide">
              <Image
                src={item.image}
                alt={item.altText}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="autoplay-progress">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
