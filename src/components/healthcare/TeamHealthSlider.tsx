"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Swiper as SwiperClass } from "swiper/types";
import { teamHealthContent } from "@/content/healthcare/home/team-health";

interface TeamHealthSliderProps {
  onSlideChange: (swiper: SwiperClass) => void;
}

const TeamHealthSlider = ({ onSlideChange }: TeamHealthSliderProps) => {
  const { teamMembers } = teamHealthContent;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="team-health__slider">
            <Swiper
              modules={[Navigation]}
              onSlideChange={onSlideChange}
              navigation={{
                prevEl: ".team-health-prev",
                nextEl: ".team-health-next",
              }}
              spaceBetween={5}
              slidesPerView={2}
              centeredSlides={true}
              loop={true}
              breakpoints={{
                576: {
                  spaceBetween: 1,
                  slidesPerView: 3,
                },
                768: {
                  spaceBetween: 1,
                  slidesPerView: 4,
                },
                1200: {
                  slidesPerView: 5,
                  spaceBetween: 10,
                },
                1300: {
                  slidesPerView: 6,
                  spaceBetween: 10,
                },
                1400: {
                  slidesPerView: 7,
                  spaceBetween: 10,
                },
                1500: {
                  slidesPerView: 10,
                  spaceBetween: 10,
                },
              }}
            >
              {teamMembers.map((member) => (
                <SwiperSlide
                  key={member.id}
                  className="team-health__slider-item"
                >
                  <div
                    className="team-health__slider-thumb"
                    id={member.id.toString()}
                  >
                    <Image
                      src={member.image}
                      alt={`Team member ${member.id}`}
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

export default TeamHealthSlider;
