import React from "react";
import Image from "next/image";
import { aboutContent } from "@/content/consultant-agency/home/about";
import AboutListItem from "./AboutListItem";
import VideoModal from "./VideoModal";

const About = () => {

  return (
    <div className="about-ca__area pt-150 pb-150">
      <div className="container container-4xl border-grid-px">
        <div className="row align-items-center g-xxl-5">
          <div className="col-lg-6 col-xxl-5">
            <span className="section__header-sub-title-frontLine fade_up_anim"></span>
            <span
              className="section__header-sub-title-v2 fade_up_anim"
              data-delay=".2"
            >
              {aboutContent.sectionHeader.subTitle}
            </span>
            <h3
              className="h3 section__header-title-v2--extend fade_up_anim"
              data-delay=".4"
            >
              {aboutContent.sectionHeader.title}
            </h3>
          </div>
          <div className="col-lg-6 col-xxl-7">
            <p 
              className="about-ca__header-p fade_up_anim" 
              data-delay={aboutContent.headerContent.delay}
            >
              {aboutContent.headerContent.description}
            </p>
          </div>
        </div>

        <div className="row align-items-center gy-5 g-xxl-5 pt-100">
          <div className="col-xl-6 col-xxl-5">
            <div className="about-ca__content">
              {aboutContent.aboutList.map((item) => (
                <AboutListItem key={item.id} item={item} />
              ))}
            </div>
          </div>
          <div className="col-xl-6 col-xxl-7">
            <div className="about-ca__video">
              <Image
                src={aboutContent.videoSection.image}
                alt={aboutContent.videoSection.altText}
              />
              <VideoModal 
                videoId={aboutContent.videoSection.videoId}
                altText={aboutContent.videoSection.altText}
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;