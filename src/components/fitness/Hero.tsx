import React from "react";
import Image from "next/image";
import Link from "next/link";
import { heroContent } from "@/content/fitness/home/hero";
import BrandSlider from "./BrandSlider";
import VideoModal from "../healthcare/VideoModal";

const Hero = () => {
  return (
    <div className="hero-fit">
      <div className="container container-fitness-hero">
        <div className="row justify-content-between">
          <div className="col-xl-6 d-flex flex-column justify-content-between">
            <div className="hero-fit__content">
              <span
                className="section__header-sub-title-v10--extend fade_up_anim"
                data-delay=".2"
              >
                <Image src={heroContent.subTitle.icon} alt="thunder" />
                {heroContent.subTitle.text}
              </span>
              <h1 className="h1">
                <span className="word-animation">{heroContent.title}</span>
              </h1>
              <p className="fade_up_anim" data-delay=".4">
                {heroContent.description}
              </p>
              <Link
                href={heroContent.ctaButton.href}
                className="common-btn__variation10 fade_up_anim"
                data-delay={heroContent.ctaButton.delay}
              >
                {heroContent.ctaButton.text}
              </Link>
            </div>
            {/* brand slider */}
            <BrandSlider brands={heroContent.brands} />
          </div>
          <div className="col-xl-6 p-xxl-0">
            <div className="hero-fit__thumb">
              <Image
                src={heroContent.heroImage}
                alt="hero-fit-thumb"
                className="img-move"
              />
              <div className="hero-fit__player">
                <VideoModal
                  youtubeUrl={heroContent.videoPlayer.videoUrl}
                  thumbnail={heroContent.videoPlayer.thumbnailImage}
                  description={heroContent.videoPlayer.playButtonText}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
