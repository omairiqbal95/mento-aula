"use client";
import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import type { NavigationOptions } from "swiper/types";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import ArrowRightNavIcon from "@/icons/ArrowRightNavIcon";
import ArrowLeftNavIcon from "@/icons/ArrowLeftNavIcon";

interface LandmarkSlide {
  image: StaticImageData;
  alt: string;
  tags: string[];
}

interface LandmarkSliderProps {
  slides: LandmarkSlide[];
}

const LandmarkSlider: React.FC<LandmarkSliderProps> = ({ slides }) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (swiperRef.current && prevRef.current && nextRef.current) {
      const swiper = swiperRef.current;
      const navigation = swiper.params.navigation as NavigationOptions;

      if (navigation) {
        navigation.prevEl = prevRef.current;
        navigation.nextEl = nextRef.current;
        swiper.navigation.init();
        swiper.navigation.update();
      }
    }
  }, []);

  return (
    <div className="swiper landmark__slider">
      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        speed={800}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        breakpoints={{
          640: {
            slidesPerView: 1.5,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="landmark__slide">
              <Image
                src={slide.image}
                alt={slide.alt}
                width={800}
                height={600}
                className="w-100 h-auto"
              />
              <ul className="custom-ul landmark__slider-tags">
                {slide.tags.map((tag, tagIndex) => (
                  <li key={tagIndex} className="landmark__slider-tag">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div ref={nextRef} className="landmark__slider-next" role="button">
        <ArrowRightNavIcon />
      </div>
      <div ref={prevRef} className="landmark__slider-prev" role="button">
        <ArrowLeftNavIcon />
      </div>
    </div>
  );
};

export default LandmarkSlider;
