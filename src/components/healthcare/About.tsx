import React from "react";
import Image from "next/image";
import { aboutData } from "@/content/healthcare/home/about";
import Link from "next/link";
import ArrowIcon from "@/icons/ArrowIcon";

const About = () => {
  return (
    <div className="about-health__area overflow-hidden pt-150 pb-150">
      <div className="container container-2xl">
        <div className="row g-4 gy-5 align-items-center">
          <div className="col-md-6">
            <div className="about-health__content">
              <div className="about-health__content-shaps fade_up_anim">
                <span className="shap"></span>
                <span className="shap"></span>
              </div>
              <h2
                className="h2 section__header-title-v8 fade_up_anim"
                data-delay=".2"
              >
                {aboutData.title}
              </h2>
              <p className="health fade_up_anim" data-delay=".4">
                {aboutData.description}
              </p>
              <Link
                href={aboutData.button.href}
                className="common-btn__variation8--extend common-btn__variation8--extend-2 fade_up_anim"
                data-delay=".6"
              >
                <span>
                  {aboutData.button.text}
                  <ArrowIcon />
                </span>
              </Link>
            </div>
          </div>
          <div className="col-md-6">
            <div className="about-health__thumb fade_up_anim" data-delay=".2">
              <div className="thumbnail">
                <Image
                  src={aboutData.image.src}
                  alt={aboutData.image.alt}
                  width={0}
                  height={0}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div className="about-health__thumb-shaps">
                <span className="shap"></span>
                <span className="shap"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
