"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import TestimonialItem from "./TestimonialItem";
import { testimonialContent } from "@/content/legal-advisor/home/testimonial";
import { TestimonialItem as TestimonialItemType } from "@/types/legal-advisor/testimonial";

const Testimonial = () => {
  return (
    <div className="testimonial-la__area pb-150">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="testimonial-la__slider">
              <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                  clickable: true,
                  el: ".swiper-pagination",
                  type: "bullets",
                }}
                modules={[Pagination]}
                className="testimonial-la__slider"
              >
                {testimonialContent.items.map((item: TestimonialItemType) => (
                  <SwiperSlide key={item.id}>
                    <TestimonialItem item={item} />
                  </SwiperSlide>
                ))}
                <div className="swiper-pagination"></div>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
