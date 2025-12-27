"use client";

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules'; 
import { TypeTestimonial, TypeTestimonialSwiperProps } from '@/types/marketing-agency/testimonial';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';


const SWIPER_PARAMS = {
  modules: [Autoplay], 
  slidesPerView: 1,
  speed: 5000,
  loop: true,
  autoplay: { 
    delay: 3000,
    disableOnInteraction: false,
  }, 
  breakpoints: {
    992: {
      slidesPerView: 2,
    },
    1200: {
      slidesPerView: 2.5, 
    },
  },
  className: "testimonial-mar__slider",
};

const StarIcon: React.FC = () => (
  <li>
    <FontAwesomeIcon icon={faStar} />
  </li>
);

const TestimonialContent: React.FC<TypeTestimonial> = ({
  rating,
  quote,
  authorName,
  authorPosition,
  authorAvatarSrc,
  brandLogoSrc,
}) => {
  const stars = Array.from({ length: rating }, (_, index) => (
    <StarIcon key={index} />
  ));

  return (
    < >
      <div className="testimonial-mar__item-body">
        <ul className="custom-ul testimonial-mar__item-ratings">
          {stars}
        </ul>
        <p>{`"${quote}"`}</p>
      </div>
      <div className="testimonial-mar__item-footer">
        <div className="testimonial-mar__author">
          <div className="author-thumb">
            <Image
              src={authorAvatarSrc}
              alt={`${authorName} avatar`}
            />
          </div>
          <div className="author-info">
            <h6 className="h6 author-name">{authorName}</h6>
            <span className="author-position">{authorPosition}</span>
          </div>
        </div>
        <div className="testimonial-mar__item-footer-logo">
          <Image
            src={brandLogoSrc}
            alt="brand logo"
          />
        </div>
      </div>
    </>
  );
};

const TestimonialSwiper: React.FC<TypeTestimonialSwiperProps> = ({ testimonials }) => {
  return (
    
      <Swiper {...SWIPER_PARAMS}>
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id} className="testimonial-mar__item">
            <TestimonialContent {...testimonial} />
          </SwiperSlide>
        ))}
      </Swiper>
  );
};

export default TestimonialSwiper;