"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { BrandItem } from "@/types/fitness/hero";

interface BrandSliderProps {
  brands: BrandItem[];
}

const BrandSlider = ({ brands }: BrandSliderProps) => {
  const swiperConfig = {
    spaceBetween: 30,
    speed: 5000,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    loop: true,
    slidesPerView: 4,
    allowTouchMove: true,
    modules: [Autoplay],
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 25,
      },
      992: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
  };

  return (
    <div className="swiper brand__slider hero-fit__brand-slider pseudo-reset">
      <Swiper {...swiperConfig} className="swiper-wrapper">
        {brands.map((brand) => (
          <SwiperSlide key={brand.id} className="swiper-slide">
            <div className="brand-box">
              <Image src={brand.image} alt={brand.alt} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BrandSlider;
