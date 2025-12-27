"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType, SwiperOptions } from "swiper/types";
import ServiceSliderItem from "./ServiceSliderItem";
import type { ServiceItem } from "@/types/consultant-agency/services";
import LeftArrow from "@/icons/LeftArrow";
import RightArrow from "@/icons/RightArrow";

interface ServicesSliderProps {
  services: ServiceItem[];
  sliderConfig: SwiperOptions;
}

const ServicesSlider: React.FC<ServicesSliderProps> = ({
  services,
  sliderConfig,
}) => {
  const [swiperInstance, setSwiperInstance] = React.useState<SwiperType | null>(
    null
  );

  const swiperConfig = {
    spaceBetween: sliderConfig.spaceBetween,
    centeredSlides: sliderConfig.centeredSlides,
    speed: sliderConfig.speed,
    autoplay: sliderConfig.autoplay,
    loop: sliderConfig.loop,
    slidesPerView: sliderConfig.slidesPerView,
    allowTouchMove: sliderConfig.allowTouchMove,
    breakpoints: sliderConfig.breakpoints,
    modules: [Autoplay],
    onSwiper: setSwiperInstance,
    className: "swiper-wrapper",
  };

  const handlePrevClick = () => {
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  };

  const handleNextClick = () => {
    if (swiperInstance) {
      swiperInstance.slideNext();
    }
  };

  return (
    <div className="swiper service-ca__slider">
      <Swiper {...swiperConfig}>
        {services.map((service) => (
          <SwiperSlide key={service.id} className="swiper-slide">
            <ServiceSliderItem service={service} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="service-ca__slider-navigation">
        <div
          className="service-ca__slider-prev"
          role="button"
          onClick={handlePrevClick}
        >
          <LeftArrow />
        </div>
        <div
          className="service-ca__slider-next"
          role="button"
          onClick={handleNextClick}
        >
          <RightArrow />
        </div>
      </div>
    </div>
  );
};

export default ServicesSlider;
