import React from "react";
import { aboutContent } from "@/content/startup-agency/home/about";
import Link from "next/link";

const About = () => {
  return (
    <section className="about-sa__area pt-150 pb-150 text-reveal-section">
      <div className="container container-3xl">
        <div className="row">
          <div className="col-md-3">
            <div className="about-sa__header mb-2 mb-md-0">
              <span className="about-sa__sub-title fade_up_anim">
                {aboutContent.subTitle}
              </span>
            </div>
          </div>
          <div className="col-md-9">
            <div className="about-sa__content">
              <h4
                className="h4 about-sa__content-header text-reveal fade_up_anim"
                data-delay=".4"
              >
                {aboutContent.header}
              </h4>
              <div className="row g-4 mission_vision">
                <div className="col-lg-6 fade_up_anim">
                  <div className="vision">
                    <h5 className="h5">{aboutContent.vision.title}</h5>
                    <p>{aboutContent.vision.description}</p>
                  </div>
                </div>
                <div className="col-lg-6 fade_up_anim" data-delay=".2">
                  <div className="mission">
                    <h5 className="h5">{aboutContent.mission.title}</h5>
                    <p>{aboutContent.mission.description}</p>
                  </div>
                </div>
                <div className="col-12 fade_up_anim" data-delay=".4">
                  <Link href={aboutContent.button.href} className="common-btn">
                    <span>{aboutContent.button.text}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="15"
                      viewBox="0 0 20 15"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M15.6047 5.59423C17.0639 6.64489 18.83 7 20 7V8C18.83 8 17.0639 8.35511 15.6047 9.40577C14.1709 10.4381 13 12.163 13 15H12C12 11.837 13.3291 9.81193 15.0203 8.59423C15.3337 8.36859 15.6584 8.17142 15.9878 8H0V7H15.9878C15.6584 6.82858 15.3337 6.63141 15.0203 6.40577C13.3291 5.18807 12 3.16296 12 0H13C13 2.83704 14.1709 4.56193 15.6047 5.59423Z"
                        fill="currentColor"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
