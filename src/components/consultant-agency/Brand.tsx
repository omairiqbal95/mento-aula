"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { brandContent } from "@/content/consultant-agency/home/brand";

const Brand = () => {
  const brands = [...brandContent.brands, ...brandContent.brands];

  return (
    <div className="brand__area fade_up_anim">
      <div className="container container-4xl">
        <div className="row">
          <div className="col-12">
            <div className="swiper brand__slider brand-ca__slider brand__slider--fluite">
              <Swiper
                spaceBetween={brandContent.sliderConfig.spaceBetween}
                centeredSlides={brandContent.sliderConfig.centeredSlides}
                speed={brandContent.sliderConfig.speed}
                autoplay={brandContent.sliderConfig.autoplay}
                loop={brandContent.sliderConfig.loop}
                slidesPerView={brandContent.sliderConfig.slidesPerView}
                allowTouchMove={brandContent.sliderConfig.allowTouchMove}
                breakpoints={brandContent.sliderConfig.breakpoints}
                modules={[Autoplay]}
                className="swiper-wrapper"
              >
                {brands.map((brand, index) => (
                  <SwiperSlide key={`${brand.id}-${index}`} className="swiper-slide">
                    <div className="brand-box">
                      <Image
                        src={brand.image}
                        alt={brand.alt}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brand;