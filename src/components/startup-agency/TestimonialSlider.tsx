"use client";
import { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import type { Testimonial, NavigationIcons } from "@/types/startup-agency/testimonial";

interface TestimonialSliderProps {
  testimonials: Testimonial[];
  navigation: NavigationIcons;
}

const TestimonialSlider: React.FC<TestimonialSliderProps> = ({
  testimonials,
  navigation,
}) => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <>
      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        breakpoints={{
          768: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 2,
          },
          1440: {
            slidesPerView: 2,
          },
        }}
        className="testimonial-sa__slider"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <div className="testimonial-sa__slider-card">
              <div className="testimonial-sa__slider-thumb">
                <Image
                  src={testimonial.image}
                  alt={testimonial.authorName}
                  width={400}
                  height={300}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="testimonial-sa__slider-content">
                <div className="testimonial-sa__slider-content-body">
                  <h5 className="h5">{testimonial.title}</h5>
                  <p>{testimonial.content}</p>
                </div>
                <div className="testimonial-sa__slider-content-footer">
                  <span className="author-title">
                    — {testimonial.authorName},
                  </span>
                  <span className="author-designation">
                    {testimonial.authorDesignation}
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="testimonial-sa__slider-controller">
        <span
          className="testimonial-sa__slider-controller-prev"
          onClick={() => swiperRef.current?.slidePrev()}
          style={{ cursor: "pointer" }}
        >
          <Image
            src={navigation.prevIcon}
            alt="Previous"
            width={24}
            height={24}
          />
        </span>
        <span
          className="testimonial-sa__slider-controller-next"
          onClick={() => swiperRef.current?.slideNext()}
          style={{ cursor: "pointer" }}
        >
          <Image
            src={navigation.nextIcon}
            alt="Next"
            width={24}
            height={24}
          />
        </span>
      </div>
    </>
  );
};

export default TestimonialSlider;
