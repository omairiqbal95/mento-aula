"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";

import { TestimonialAbItem } from "@/content/about/testimonialAb";

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <ul className="custom-ul rating">
      {[...Array(5)].map((_, index) => (
        <li key={index}>
          <i
            className={`fa-solid fa-star ${index < rating ? "" : "text-muted"}`}
          ></i>
        </li>
      ))}
    </ul>
  );
};

interface TestimonialAbSliderProps {
  testimonials: TestimonialAbItem[];
}

const TestimonialAbSlider: React.FC<TestimonialAbSliderProps> = ({
  testimonials,
}) => {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={0}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 2.5,
        },
      }}
      className="testimonial-ab__slider"
    >
      {testimonials.map((testimonial) => (
        <SwiperSlide key={testimonial.id}>
          <div className="testimonial-ab__item">
            <div className="slider-content">
              <StarRating rating={testimonial.rating} />
              <p>{testimonial.content}</p>
            </div>
            <div className="content-footer">
              <div className="author">
                <Image
                  src={testimonial.authorAvatar}
                  alt={testimonial.authorName}
                  width={60}
                  height={60}
                />
                <div className="author-info">
                  <span className="author-title">
                    {testimonial.authorName}
                  </span>
                  <span className="author-designation">
                    {testimonial.authorDesignation}
                  </span>
                </div>
              </div>
              <div className="brand-image">
                <Image
                  src={testimonial.brandImage}
                  alt="brand"
                  width={80}
                  height={40}
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TestimonialAbSlider;
