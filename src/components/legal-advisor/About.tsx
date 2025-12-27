import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { aboutContent } from '@/content/legal-advisor/home/about';
import FunFactItem from './FunFactItem';
import ArrowRightIconTwo from '@/icons/ArrowRightIconTwo';

const About = () => {
  return (
    <section className="about-la__area pt-150 pb-150">
      <div className="container">
        <div className="row">
          <div className="col-xl-11">
            <div className="section__header-v2">
              <span className="section__sub-title fade_up_anim">
                {aboutContent.sectionHeader.subTitle}
              </span>
              <h3
                className="h3 section__title fade_up_anim"
                data-delay=".4"
              >
                {aboutContent.sectionHeader.title}
              </h3>
            </div>
          </div>
        </div>
        <div className="row justify-content-xl-between gx-xl-0 gy-5 pt-100">
          <div className="col-lg-6 col-xl-5">
            <div className="about-la__thumb fade_up_anim">
              <Image
                className="img-move"
                src={aboutContent.image}
                alt="About us"
              />
            </div>
          </div>
          <div className="col-lg-6 col-xl-6">
            <div className="about-la__content">
              <p className="fade_up_anim" data-delay=".4">
                {aboutContent.description}
              </p>

              <ul className="custom-ul">
                <li className="fade_up_anim" data-delay=".6">
                  <h5 className="h5">{aboutContent.valuesTitle}</h5>
                </li>
                {aboutContent.values.map((value, index) => (
                  <li 
                    key={index}
                    className="fade_up_anim" 
                    data-delay={`${0.8 + (index * 0.2)}`}
                  >
                    <span>{value.title} </span>
                    {value.description}
                  </li>
                ))}
              </ul>
              <Link
                href={aboutContent.buttonLink}
                className="common-btn__variation4 common-btn__variation4--extend fade_up_anim"
                data-delay="1.4"
              >
                <span>{aboutContent.buttonText}</span>
                <ArrowRightIconTwo width={20} height={20} />
              </Link>
            </div>
          </div>
        </div>
        <div className="row pt-100">
          <div className="col-12 funfacts">
            {aboutContent.funFacts.map((funFact, index) => (
              <FunFactItem key={index} funFact={funFact} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;