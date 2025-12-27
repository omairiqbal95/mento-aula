import React from "react";
import Image from "next/image";
import { aboutContent } from "@/content/about/about";
import AboutCounter from "./AboutCounter";
import AboutGallery from "./AboutGallery";

const About = () => {
  return (
    <>
      <div className="about__area pt-150 pb-150">
        <div className="container">
          <div className="row g-3 g-md-4 justify-content-between">
            <div className="col-lg-6 col-xl-5 fade_up_anim" data-delay=".2">
              <h2 className="h2">{aboutContent.hero.title}</h2>
            </div>
            <div className="col-lg-6 col-xl-6">
              <h6 className="h6 about__subhading fade_up_anim" data-delay=".4">
                {aboutContent.hero.subheading}
              </h6>
              <p className="fade_up_anim" data-delay=".6">
                {aboutContent.hero.description}
              </p>
            </div>
          </div>
          <div className="row g-4 justify-content-between about__quoteAuthor-wrapper">
            <div className="col-lg-5 fade_up_anim" data-delay=".2">
              <div className="about__quoteAuthor">
                <Image
                  src={aboutContent.author.avatar}
                  alt={aboutContent.author.name}
                  width={80}
                  height={80}
                />
                <div className="author-info">
                  <h6 className="h6 author-title">
                    {aboutContent.author.name}
                  </h6>
                  <p className="author-designation">
                    {aboutContent.author.designation}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 fade_up_anim" data-delay=".4">
              <blockquote className="about__quote">
                <h4 className="h4">{aboutContent.quote}</h4>
              </blockquote>
            </div>
          </div>
          <AboutCounter funFacts={aboutContent.funFacts} />
        </div>
      </div>

      <AboutGallery gallery={aboutContent.gallery} />
    </>
  );
};

export default About;
