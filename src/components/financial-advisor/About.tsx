import React from "react";
import Link from "next/link";
import { aboutContent } from "@/content/financial-advisor/home/about";
import ArrowRightIconFour from "@/icons/ArrowRightIconFour";
import ExperienceCounter from "./about/ExperienceCounter";

const About = () => {
  return (
    <div className="about-fin pt-150">
      <div className="container container-2xl">
        <div className="row g-4 justify-content-between">
          <div className="col-md-6 col-xl-5">
            <div className="about-fin__left">
              <span className="sub-heading fade_up_anim" data-delay=".2">
                {aboutContent.subHeading}
              </span>
              <ExperienceCounter 
                years={aboutContent.experience.years}
                label={aboutContent.experience.label}
              />
            </div>
          </div>
          <div className="col-md-6 col-xl-6">
            <div className="about-fin__right">
              <h3 className="h3 fade_up_anim" data-delay=".4">
                {aboutContent.title}
              </h3>
              <p className="fade_up_anim" data-delay=".6">
                {aboutContent.description}
              </p>
              <Link
                href={aboutContent.buttonHref}
                className="common-btn__variation9 fade_up_anim"
                data-delay=".8"
              >
                {aboutContent.buttonText}
                <ArrowRightIconFour />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
