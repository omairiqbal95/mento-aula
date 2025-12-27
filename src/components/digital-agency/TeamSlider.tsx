"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import type { TeamMember, NavigationIcons } from "@/types/digital-agency/team";

interface TeamSliderProps {
  teamMembers: TeamMember[];
  navigationIcons: NavigationIcons;
}

const TeamSlider: React.FC<TeamSliderProps> = ({
  teamMembers,
  navigationIcons,
}) => {
  return (
    <div className="team-digital__slider-wrapper">
      <Swiper
        className="team-digital__slider"
        modules={[Navigation, Autoplay]}
        spaceBetween={30}
        slidesPerView={4}
        loop={true}
        speed={2300}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: ".team-digital__slider-next",
          prevEl: ".team-digital__slider-prev",
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 25,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
      >
        {teamMembers.map((member) => (
          <SwiperSlide key={member.id} className="team-digital__item">
            <div className="team-digital__item-thumb">
              <Image
                className="img-move"
                src={member.image}
                alt={member.name}
                width={300}
                height={350}
              />
            </div>
            <div className="team-digital__item-content">
              <h5 className="h5 team-digital__item-name">
                <Link href={member.link}>{member.name}</Link>
              </h5>
              <p className="team-digital__item-position">{member.position}</p>
            </div>
          </SwiperSlide>
        ))}
        <div className="team-digital__slider-navigation">
          <div className="team-digital__slider-prev">
            <Image
              src={navigationIcons.prev}
              alt="Previous"
              width={24}
              height={24}
            />
          </div>
          <div className="team-digital__slider-next">
            <Image
              src={navigationIcons.next}
              alt="Next"
              width={24}
              height={24}
            />
          </div>
        </div>
      </Swiper>
    </div>
  );
};

export default TeamSlider;
