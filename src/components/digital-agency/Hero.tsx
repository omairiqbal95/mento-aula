import React from "react";
import { heroData } from "../../content/digital-agency/home/hero";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="hero-digital">
      <span className="hero-digital__circle-shape"></span>
      <div className="container container-fitness pb-150">
        <div className="row">
          <div className="col-12">
            <div className="hero-digital__header">
              <h1 className="h1 hero-digital__title">
                <span className="word word-animation">
                  {heroData.title.firstLine}
                </span>
                <br />
                <span className="word word-animation">
                  {heroData.title.secondLine}
                </span>
              </h1>
              <Link
                href={heroData.button.href}
                className="hero-digital__btn-wrapper btn-hover btn-item d-none d-lg-block fade_up_anim"
                data-delay={heroData.button.delay}
              >
                <span></span>
                <p className="hero-digital__btn-text">{heroData.button.text}</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="row g-4 hero-digital__content-container">
          <div className="col-sm-12 col-md-4 col-xl-5 d-none d-md-inline-block">
            <Link
              href={heroData.scrollLink.href}
              className="hero-digital__section-jump section-link"
            >
              <Image
                src={heroData.scrollLink.image}
                alt={heroData.scrollLink.alt}
              />
            </Link>
          </div>
          <div className="col-sm-12 col-md-8 col-xl-7">
            <div className="hero-digital__content">
              <span
                className="hero-digital__content-stablish-info fade_up_anim"
                data-delay=".4"
              >
                Were since
                <span className="year">{heroData.content.establishedYear}</span>
              </span>
              <p
                className="hero-digital__content-info fade_up_anim"
                data-delay={heroData.content.delay}
              >
                {heroData.content.description}
              </p>
            </div>
          </div>
          <div className="col-12 btn-item d-lg-none">
            <Link
              href={heroData.button.href}
              className="hero-digital__btn-wrapper btn-hover fade_up_anim"
              data-delay={heroData.button.delay}
            >
              <span></span>
              <p className="hero-digital__btn-text">{heroData.button.text}</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="video-mar__area hero-digital__video-area">
        <div className="video-wrapper">
          {heroData.videoArea.videoSrc && (
            <video
              src={heroData.videoArea.videoSrc}
              autoPlay={heroData.videoArea.autoplay}
              muted={heroData.videoArea.muted}
              loop={heroData.videoArea.loop}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
