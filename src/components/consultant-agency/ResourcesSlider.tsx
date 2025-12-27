"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import ArrowLeftIcon from "@/icons/ArrowLeftIcon";
import ArrowRightNavIcon from "@/icons/ArrowRightNavIcon";
import type { ResourcesContent } from "@/types/consultant-agency/resources";
import ResourceSliderItem from "./ResourceSliderItem";

interface ResourcesSliderProps {
  content: ResourcesContent;
}

const ResourcesSlider = ({ content }: ResourcesSliderProps) => {
  return (
    <div className="swiper resources-ca__slider">
      <Swiper
        spaceBetween={10}
        speed={2500}
        loop={true}
        slidesPerView={1}
        allowTouchMove={true}
        breakpoints={{
          768: {
            slidesPerView: 2,
            spaceBetween: 10
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 40
          }
        }}
        navigation={{
          nextEl: ".resources-ca__slider-next",
          prevEl: ".resources-ca__slider-prev"
        }}
        pagination={{
          el: ".resources-ca__slider-pagination",
          clickable: true
        }}
        modules={[Autoplay, Navigation, Pagination]}
        className="swiper-wrapper pt-100"
      >
        {content.resources.map((resource) => (
          <SwiperSlide key={resource.id} className="swiper-slide resources-ca__slider-item">
            <ResourceSliderItem resource={resource} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="resources-ca__slider-navigation">
        <div className="resources-ca__slider-prev" role="button">
          <ArrowLeftIcon />
        </div>
        <div className="resources-ca__slider-pagination"></div>
        <div className="resources-ca__slider-next" role="button">
          <ArrowRightNavIcon />
        </div>
      </div>
    </div>
  );
};

export default ResourcesSlider;
