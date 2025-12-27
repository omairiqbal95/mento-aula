import React from "react";
import Image from "next/image";
import Link from "next/link";
import { heroContent } from "@/content/consultant-agency/home/hero";
import HeroStats from "./HeroStats";

const Hero = () => {
  return (
    <div className="hero-ca__area overflow-hidden border-grid-lr border-grid-tb">
      <div className="container container-4xl p-lg-0 border-grid-z">
        <div className="hero-ca__wrapper">
          <div className="hero-ca__thumb order-lg-2">
            <Image 
              src={heroContent.images.heroImage} 
              alt="hero-bg" 
            />
          </div>

          <div className="hero-ca__content order-lg-1">
            <h1 className="h1">
              {heroContent.title.words.map((word, index) => (
                <span key={index} className="word-animation">
                  {word}
                </span>
              ))}
            </h1>
            <p className="fade_up_anim" data-delay=".4">
              {heroContent.description}
            </p>
            <Link
              href={heroContent.ctaButton.href}
              className="common-btn__variation3 fade_up_anim"
              data-delay={heroContent.ctaButton.delay}
            >
              {heroContent.ctaButton.text}
            </Link>
            <div className="hero-ca__frame">
              <ul className="custom-ul">
                {heroContent.features.map((feature, index) => (
                  <li 
                    key={index}
                    className="fade_up_anim" 
                    data-delay={feature.delay}
                  >
                    <i className="fa-solid fa-circle-check"></i>
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Image
        src={heroContent.images.circularArrow}
        alt="arrow"
        className="rounded-arrow"
      />
      <HeroStats stats={heroContent.stats} />
    </div>
  );
};

export default Hero;
