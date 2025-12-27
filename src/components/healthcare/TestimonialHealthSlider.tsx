"use client";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import QuoteIconThree from "@/icons/QuoteIconThree";
import type { StaticImageData } from "next/image";

interface Testimonial {
  id: number;
  title: string;
  content: string;
  authorName: string;
  authorPosition: string;
  authorAvatar: StaticImageData;
  colorClass: string;
}

interface NavigationIcons {
  prevIcon: StaticImageData;
  nextIcon: StaticImageData;
}

interface TestimonialHealthSliderProps {
  testimonials: Testimonial[];
  navigation: NavigationIcons;
}

const TestimonialHealthSlider: React.FC<TestimonialHealthSliderProps> = ({
  testimonials,
  navigation,
}) => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={2500}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        breakpoints={{
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
        }}
        className="testimonial-health__slider"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide
            key={testimonial.id}
            className={`testimonial-health__slider-item ${testimonial.colorClass}`}
          >
            <div className="testimonial-health__content">
              <h5 className="h5">{testimonial.title}</h5>
              <p>{testimonial.content}</p>
            </div>
            <div className="testimonial-health__author">
              <div className="testimonial-health__author-info">
                <figure className="testimonial-health__author-thumb">
                  <Image
                    src={testimonial.authorAvatar}
                    alt={testimonial.authorName}
                    width={80}
                    height={80}
                  />
                </figure>
                <div className="testimonial-health__author-content">
                  <h6 className="h6 author-title">{testimonial.authorName}</h6>
                  <span className="author-position">
                    {testimonial.authorPosition}
                  </span>
                </div>
              </div>
              <QuoteIconThree />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="testimonial-health__navigation">
        <div
          className="testimonial-health-prev slider-health-arrow common-btn__variation8--extend common-btn__variation8--extend-2"
          onClick={() => swiperRef.current?.slidePrev()}
          style={{ cursor: "pointer" }}
        >
          <span>
            <Image
              src={navigation.prevIcon}
              alt="Previous"
              width={24}
              height={24}
            />
          </span>
        </div>
        <div
          className="testimonial-health-next slider-health-arrow common-btn__variation8--extend common-btn__variation8--extend-2"
          onClick={() => swiperRef.current?.slideNext()}
          style={{ cursor: "pointer" }}
        >
          <span>
            <Image
              src={navigation.nextIcon}
              alt="Next"
              width={24}
              height={24}
            />
          </span>
        </div>
      </div>
    </>
  );
};

export default TestimonialHealthSlider;
