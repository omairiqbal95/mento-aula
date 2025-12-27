"use client";

import Image from "next/image";
import { brandSliderData } from "@/content/architectural-agency/brand-slider";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const BrandSlider = () => {
  return (
    <div className="brand__area pt-150 pb-150">
      
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={2}
          loop={true}
          speed={5000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          breakpoints={{
            480: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 5,
            },
            1280: {
              slidesPerView: 6,
            },
            1536: {
              slidesPerView: 7,
            },
          }}
          className="brand__slider--extend pseudo-reset"
        >
          {/* Render brands twice for seamless loop */}
          {[...brandSliderData.brands, ...brandSliderData.brands].map(
            (brand, index) => (
              <SwiperSlide key={index}>
                <div className="brand-box">
                  <Image
                    src={brand.image}
                    alt={brand.alt}
                    width={200}
                    height={100}
                    className="w-100 h-auto"
                  />
                </div>
              </SwiperSlide>
            )
          )}
        </Swiper>
    </div>
  );
};

export default BrandSlider;
