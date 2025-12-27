import React from "react";
import Link from "next/link";
import Image from "next/image";
import { heroContent } from "@/content/financial-advisor/home/hero";
import ArrowRightIconFour from "@/icons/ArrowRightIconFour";

const Hero = () => {
  return (
    <div className="hero-fin">
      <div className="container container-2xl">
        <div className="row">
          <div className="col-12">
            <div className="hero-fin__content">
              <div className="upper-content">
                <div className="btn-container">
                  <Link
                    href={heroContent.button.href}
                    className="common-btn__variation9 fade_up_anim"
                    data-delay={heroContent.button.delay}
                  >
                    {heroContent.button.text}
                    <ArrowRightIconFour />
                  </Link>
                </div>
                <p className="info fade_up_anim" data-delay={heroContent.descriptionDelay}>
                  {heroContent.description}
                </p>
              </div>
              <div className="hero-fin__title">
                <h1 className="h1 title">
                  <span className="word-animation">{heroContent.title.text}</span>
                </h1>
                <Image
                  className="img-cursor d-none d-md-block"
                  src={heroContent.title.titleImage}
                  alt="hero-title-image"
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
