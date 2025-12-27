import React from "react";
import { aboutData } from "../../content/digital-agency/home/about";
import Image from "next/image";
import FunFact from "./FunFact";
import Link from "next/link";

const About = () => {
  return (
    <div id="about-digital" className="about-digital pt-150 pb-150">
      <div className="container container-mini">
        <div className="row g-4 gy-md-0">
          <div className="col-md-3 col-lg-4">
            <span
              className="section__header-sub-title-v12 fade_up_anim"
              data-delay=".2"
            >
              {aboutData.content.subtitle}
            </span>
            <div className="about-digital__shap pt-100 d-none d-md-block">
              <Image
                src={aboutData.content.shapeImage}
                alt={aboutData.content.shapeAlt}
              />
            </div>
          </div>
          <div className="col-md-9 col-lg-8">
            <div className="about-digital__content">
              <h4 className="h4 fade_up_anim" data-delay=".6">
                {aboutData.content.description}
              </h4>
              <Link
                href={aboutData.content.buttonHref}
                className="common-btn common-btn-v1 fade_up_anim"
                data-delay="1"
              >
                {aboutData.content.buttonText}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <FunFact />
    </div>
  );
};

export default About;
