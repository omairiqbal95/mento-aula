import React from "react";
import Image from "next/image";
import { aboutContent } from "@/content/fitness/home/about";
import AboutCounters from "./AboutCounters";

const About = () => {
  return (
    <div className="about-fit pt-150">
      <div className="container container-fitness">
        <div className="row text-center text-md-start">
          <div className="col-12">
            <span
              className="section__header-sub-title-v10 fade_up_anim pb-100"
              data-delay=".2"
            >
              {aboutContent.sectionHeader.subTitle}
            </span>
          </div>
        </div>
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="about-fit__thumb">
              <Image src={aboutContent.image} alt="about-fit-thumb" />
            </div>
          </div>
          <div className="col-lg-8">
            <div className="about-fit__content">
              <h3 className="h3 fade_up_anim" data-delay=".4">
                {aboutContent.title}
              </h3>
              <AboutCounters counters={aboutContent.counters} />
              <p className="fade_up_anim" data-delay=".5">
                {aboutContent.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
