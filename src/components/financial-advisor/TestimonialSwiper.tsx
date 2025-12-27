'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { TestimonialItem as TestimonialItemType } from '@/types/financial-advisor/testimonial';
import TestimonialItem from './TestimonialItem';

interface TestimonialSwiperProps {
  testimonials: TestimonialItemType[];
}

const TestimonialSwiper: React.FC<TestimonialSwiperProps> = ({ testimonials }) => {
  return (
    <div className="swiper testimonial-fin__slider">
      <Swiper
        modules={[Navigation]}
        slidesPerView={1}
        spaceBetween={15}
        speed={1500}
        loop={true}
        navigation={{
          nextEl: ".testimonial-fin-next",
          prevEl: ".testimonial-fin-prev",
        }}
        breakpoints={{
          992: {
            slidesPerView: 2,
            spaceBetween: 25,
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 32,
          },
        }}
        className="testimonial-fin__slider"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <TestimonialItem testimonial={testimonial} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialSwiper;
