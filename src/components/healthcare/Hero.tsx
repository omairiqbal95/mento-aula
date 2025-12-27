import React from "react";
import Image from "next/image";
import Link from "next/link";
import { heroData } from "@/content/healthcare/home/hero";
import VideoModal from "./VideoModal";
import ArrowIcon from "@/icons/ArrowIcon";

const Hero = () => {
  return (
      <div className="hero-health__area">
        <div className="hero-health__main-content">
          <div className="container container-4xl">
            <div className="row align-items-end">
              <div className="col-lg-5">
                <div className="hero-health__content section-header-v8">
                  <span className="section__header-sub-title-v8 fade_up_anim">
                    {heroData.subtitle}
                  </span>
                  <h1 className="h1">
                    {heroData.title.map((line, index) => (
                      <span key={index} className="word-animation">
                        {line}
                      </span>
                    ))}
                  </h1>
                  <p className="fade_up_anim" data-delay=".6">
                    {heroData.description}
                  </p>

                  <Link
                    href={heroData.ctaButton.href}
                    className="common-btn__variation8--extend fade_up_anim"
                    data-delay=".8"
                  >
                    {heroData.ctaButton.text}
                    <ArrowIcon />
                  </Link>
                  <VideoModal
                    youtubeUrl={heroData.video.youtubeUrl}
                    thumbnail={heroData.video.thumbnail}
                    description={heroData.video.description}
                  />
                  <ul className="custom-ul hero-health__tags">
                    {heroData.tags.map((tag, index) => (
                      <li key={index}>
                        <Link href={tag.href}>{tag.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="hero-health__thumb">
                  <Image
                    src={heroData.mainImage}
                    alt="hero-health"
                    width={0}
                    height={0}
                    style={{ width: "100%", height: "auto" }}
                  />

                  <div className="total-doctors fade_up_anim" data-delay=".8">
                    <div className="doctor-avatars">
                      {heroData.doctorStats.avatars.map((avatar, index) => (
                        <Image key={index} src={avatar.src} alt={avatar.alt} />
                      ))}
                    </div>
                    <p>
                      {heroData.doctorStats.text}
                      <span
                        className="doctor-counter odometer"
                        data-odometer-final={heroData.doctorStats.count}
                      >
                        300
                      </span>
                      + Doctors
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container container-2xl mt-50">
          <div className="hero-health__features">
            {heroData.features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="hero-health__feature fade_up_anim"
                  data-delay={feature.delay}
                >
                  <div className="icon">
                    <IconComponent size={24} />
                  </div>
                  <p>{feature.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
  );
};

export default Hero;
