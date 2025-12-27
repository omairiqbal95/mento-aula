"use client";
import React, { useState } from "react";
import Image from "next/image";
import { teamHealthContent } from "@/content/healthcare/home/team-health";
import { TeamHealthProps } from "@/types/healthcare/team-health";
import { Swiper as SwiperClass } from "swiper/types";
import TeamHealthContent from "./TeamHealthContent";
import TeamHealthSlider from "./TeamHealthSlider";

const TeamHealthHeader = () => {
  const { header, navigationIcons } = teamHealthContent;

  return (
    <div className="col-lg-4 section-header-v8">
      <h2 className="h2 section__header-title-v8 fade_up_anim" data-delay=".2">
        {header.title}
      </h2>
      <p className="health fade_up_anim" data-delay=".4">
        {header.description}
      </p>
      <div className="team-health__navigation fade_up_anim" data-delay=".6">
        <div className="team-health-prev slider-health-arrow common-btn__variation8--extend common-btn__variation8--extend-2" role="button">
          <span>
            <Image src={navigationIcons.arrowLeft} alt="Previous" />
          </span>
        </div>
        <div className="team-health-next slider-health-arrow common-btn__variation8--extend common-btn__variation8--extend-2" role="button">
          <span>
            <Image src={navigationIcons.arrowRight} alt="Next" />
          </span>
        </div>
      </div>
    </div>
  );
};

const TeamHealth = ({ className }: TeamHealthProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper: SwiperClass) => {
    setActiveIndex(swiper.realIndex);
  };

  return (
    <div className={`team-health__area pt-150 pb-150 ${className || ""}`}>
      <div className="container container-2xl">
        <div className="row gy-5 justify-content-between">
          <TeamHealthHeader />
          <div className="col-lg-4">
            <TeamHealthContent activeIndex={activeIndex} />
          </div>
        </div>
      </div>
      <TeamHealthSlider onSlideChange={handleSlideChange} />
    </div>
  );
};

export default TeamHealth;
