"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import TeamMember from "./TeamMember";
import ArrowLeft from "@/icons/ArrowLeft";
import ArrowRight from "@/icons/ArrowRight";
import { teamContent } from "@/content/legal-advisor/home/team";
import { TeamMember as TeamMemberType } from "@/types/legal-advisor/team";

const Team = () => {
  return (
    <div className="team-la__area pt-150">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section__header-v2">
              <span className="section__sub-title fade_up_anim" data-delay=".2">
                {teamContent.sectionHeader.subTitle}
              </span>
              <div className="team-la__section__title">
                <h3 className="h3 section__title fade_up_anim" data-delay=".4">
                  {teamContent.sectionHeader.title}
                </h3>
                <div className="team-la__slider-navigation">
                  <div className="team-la__slider-prev">
                    <ArrowLeft />
                  </div>
                  <div className="team-la__slider-next">
                    <ArrowRight />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container custom-container-content">
        <div className="row">
          <div className="col-12">
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              speed={2000}
              loop={true}
              navigation={{
                nextEl: ".team-la__slider-next",
                prevEl: ".team-la__slider-prev",
              }}
              modules={[Navigation]}
              breakpoints={{
                640: {
                  slidesPerView: 1.5,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 15,
                },
                1200: {
                  slidesPerView: 3,
                },
                1400: {
                  spaceBetween: 30,
                  slidesPerView: 4,
                },
              }}
              className="team-la__slider pt-100 pb-150"
            >
              {teamContent.members.map((member: TeamMemberType) => (
                <SwiperSlide key={member.id} className="team-la__item">
                  <TeamMember member={member} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
