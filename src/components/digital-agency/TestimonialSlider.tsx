"use client";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import type { TypeTestimonial } from "@/types/marketing-agency/testimonial";

interface TestimonialSliderProps {
  testimonials: TypeTestimonial[];
  noBorder?: boolean;
}

const TestimonialSlider: React.FC<TestimonialSliderProps> = ({
  testimonials,
  noBorder,
}) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <li key={index}>
        <i className={`fas fa-star ${index < rating ? "" : "text-muted"}`}></i>
      </li>
    ));
  };

  return (
    <Swiper
      className="testimonial-digital__slider"
      modules={[Pagination, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      loop={true}
      speed={2300}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      pagination={{
        el: ".testimonial-digital__slider-pagination",
        clickable: true,
      }}
      breakpoints={{
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      }}
    >
      {testimonials.map((testimonial) => (
        <SwiperSlide
          key={testimonial.id}
          className={`testimonial-digital__item ${noBorder ? " contented" : ""}`}
        >
          <div className="testimonial-digital__item-content">
            <ul className="custom-ul rating">
              {renderStars(testimonial.rating)}
            </ul>
            <p>{testimonial.quote}</p>
          </div>
          <div className="testimonial-digital__item-author">
            <div className="author-thumb">
              <Image
                src={testimonial.authorAvatarSrc}
                alt={testimonial.authorName}
                width={60}
                height={60}
              />
            </div>
            <div className="author-info">
              <h5 className="h5">{testimonial.authorName}</h5>
              <span>{testimonial.authorPosition}</span>
            </div>
          </div>
        </SwiperSlide>
      ))}
      <div className="testimonial-digital__slider-pagination"></div>
    </Swiper>
  );
};

export default TestimonialSlider;
