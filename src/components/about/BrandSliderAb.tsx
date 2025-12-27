"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";

import { brandSliderContent } from "@/content/about/brandSlider";

const BrandSliderAb = () => {
  return (
    <div className="brand__area">
      <div className="container container-3xl">
        <div className="row">
          <div className="col-12">
            <Swiper
              modules={[Autoplay]}
              slidesPerView="auto"
              spaceBetween={30}
              loop={true}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
              }}
              speed={5000}
              freeMode={true}
              breakpoints={{
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
                1440: {
                  slidesPerView: 6,
                  spaceBetween: 30,
                },
              }}
              className="brand__slider pb-150"
            >
              {[
                ...brandSliderContent.brands,
                ...brandSliderContent.brands,
                ...brandSliderContent.brands,
              ].map((brand, index) => (
                <SwiperSlide key={`${brand.id}-${index}`}>
                  <div className="brand-box">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={150}
                      height={60}
                      style={{ width: "auto", height: "auto" }}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandSliderAb;
