import React from "react";
import Image from "next/image";
import Link from "next/link";
import CircularText from "./CircularText";
import ArrowRightIconTwo from "@/icons/ArrowRightIconTwo";
import { heroData } from "@/content/legal-advisor/home/hero";
import { AwardItem as AwardItemType } from "@/types/legal-advisor/hero";

const AwardItem = ({ item }: { item: AwardItemType }) => (
  <li>
    <Image src={item.image} alt={item.alt} />
  </li>
);

const Hero = () => {
  const { circularText, content, backgroundImage } = heroData;

  return (
    <section className="hero-la__area" style={{ backgroundImage: `url(${backgroundImage.src})` }}>
      <CircularText 
        content={circularText.content} 
        years={circularText.years} 
      />
      <div className="container">
        <div className="row gy-5 align-items-center">
          <div className="col-md-6">
            <div className="hero-la__content">
              <h1 className="h1">
                <span className="word-animation">{content.title.line1}</span>
                <span className="word-animation d-block">{content.title.line2}</span>
                <span className="word-animation">{content.title.line3}</span>
              </h1>
              <p className="fade_up_anim" data-delay=".4">
                {content.description}
              </p>
              <Link
                href={content.button.href}
                className="common-btn__variation4 fade_up_anim"
                data-delay=".6"
              >
                <span>{content.button.text}</span>
                <ArrowRightIconTwo />
              </Link>
              <div className="awards fade_up_anim" data-delay=".8">
                <ul className="custom-ul awards-images">
                  {content.awards.items.map((item) => (
                    <AwardItem key={item.id} item={item} />
                  ))}
                </ul>
                <p className="awards-content">{content.awards.text}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="hero-la__thumbnail">
              <div className="hero-la__thumbnail-wrapper">
                <Image 
                  src={content.thumbnail.image} 
                  alt={content.thumbnail.alt} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
