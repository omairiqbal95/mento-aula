import React from "react";
import Link from "next/link";
import { aboutData } from "@/content/architectural-agency/about";
import FunFactsCounter from "./FunFactsCounter";

const About = () => {
  return (
    <div
      id={aboutData.sectionId}
      className="about-ad__area text-reveal-section pt-150 pb-150"
    >
      <div className="container container-4xl">
        <div className="row g-4">
          <div className="col-lg-5">
            <h6 className="h6 about-ad__title fade_up_anim">
              {aboutData.title}
            </h6>
          </div>
          <div className="col-lg-7">
            <div className="about-ad__content">
              <h4 className="h4 fade_up_anim text-reveal" data-delay=".4">
                {aboutData.heading}
              </h4>
              <div className="row gy-2 gy-xl-0 gx-xl-4 about-ad__content-grid">
                <div className="col-xl-6 fade_up_anim" data-delay=".6">
                  <p>{aboutData.content.paragraph1}</p>
                </div>
                <div className="col-xl-6 fade_up_anim" data-delay=".8">
                  <p>{aboutData.content.paragraph2}</p>
                </div>
              </div>
              <Link
                href={aboutData.cta.href}
                className="common-btn__variation6 fade_up_anim"
                data-delay=".9"
              >
                <span>{aboutData.cta.text}</span>
                <i className=""></i>
              </Link>
            </div>
          </div>
        </div>
        <FunFactsCounter funFacts={aboutData.funFacts} />
      </div>
    </div>
  );
};

export default About;
