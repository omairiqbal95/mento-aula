"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import Image from "next/image";
import { imageSliderData } from "@/content/digital-agency/home/imageSlider";

const ImageSlider = () => {
  return (
    <div className="image-slider__area">
      <Swiper
        className="image-slider"
        modules={[Autoplay, EffectFade]}
        autoplay={{
          delay: imageSliderData.autoplayDelay,
          disableOnInteraction: false,
        }}
        loop={imageSliderData.loop}
        speed={imageSliderData.speed}
        spaceBetween={0}
        slidesPerView={1}
        effect={imageSliderData.fadeEffect ? "fade" : undefined}
        fadeEffect={{ crossFade: imageSliderData.crossFade }}
      >
        {imageSliderData.images.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Image
              src={slide.image}
              alt={slide.alt}
              width={1200}
              height={600}
            />
          </SwiperSlide>
        ))}
        <div className="autoplay-progress">
          <svg viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span></span>
        </div>
      </Swiper>
    </div>
  );
};

export default ImageSlider;
