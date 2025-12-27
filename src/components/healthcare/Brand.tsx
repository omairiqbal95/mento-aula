"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { brandsData } from "@/content/healthcare/home/brand";

interface BrandSliderProps {
  slidesPerView?: number;
  spaceBetween?: number;
  speed?: number;
  autoplayDelay?: number;
  loop?: boolean;
  breakpoints?: {
    [key: number]: {
      slidesPerView: number;
      spaceBetween?: number;
    };
  };
}

const BrandSlider: React.FC<BrandSliderProps> = ({
  slidesPerView = 5,
  spaceBetween = 30,
  speed = 5000,
  autoplayDelay = 0,
  loop = true,
  breakpoints = {
    320: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    640: {
      slidesPerView: 3,
      spaceBetween: 25,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 30,
    },
  },
}) => {
  return (
    <div className="brand-health__area">
      <div className="container container-2xl">
        <div className="row">
          <div className="col-12">
            <div className="brand-health__slider-outer-wrapper">
              <Swiper
                modules={[Autoplay]}
                spaceBetween={spaceBetween}
                slidesPerView={slidesPerView}
                loop={loop}
                speed={speed}
                autoplay={{
                  delay: autoplayDelay,
                  disableOnInteraction: false,
                }}
                breakpoints={breakpoints}
                className="brand-health__slider pseudo-reset"
              >
                {brandsData.map((brand) => (
                  <SwiperSlide key={brand.id} className="brand-health__item">
                    <Image
                      src={brand.image}
                      alt={brand.alt}
                      width={200}
                      height={100}
                    />
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

export default BrandSlider;
