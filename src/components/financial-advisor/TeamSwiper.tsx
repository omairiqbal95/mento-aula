'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { TeamMember } from '@/types/financial-advisor/team';
import TeamSliderItem from './TeamSliderItem';

interface TeamSwiperProps {
  members: TeamMember[];
}

const TeamSwiper: React.FC<TeamSwiperProps> = ({ members }) => {
  return (
    <div className="swiper team-fin__slider">
      <Swiper
        modules={[Navigation, Autoplay]}
        slidesPerView={1}
        spaceBetween={20}
        speed={1500}
        loop={true}
        navigation={{
          nextEl: ".team-fin-next",
          prevEl: ".team-fin-prev",
        }}
        breakpoints={{
          576: {
            slidesPerView: 2,
          },
          992: {
            slidesPerView: 3,
          },
          1200: {
            spaceBetween: 40,
            slidesPerView: 4,
          },
        }}
        className="team-fin__slider"
      >
        {members.map((member) => (
          <SwiperSlide key={member.id}>
            <TeamSliderItem member={member}  />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TeamSwiper;
