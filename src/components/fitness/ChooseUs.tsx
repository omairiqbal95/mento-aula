import React from "react";
import Image from "next/image";
import Link from "next/link";
import { chooseUsContent } from "@/content/fitness/home/choose-us";

const ChooseUs = () => {
  return (
    <div className="choose-us-fit pb-150">
      <div className="container container-fitness">
        <div className="row align-items-xl-center g-4">
          <div className="col-md-6">
            <div className="choose-us-fit__thumb">
              <Image
                src={chooseUsContent.image}
                alt="choose-us-fit__thumb"
                className="img-move"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="choose-us-fit__content">
              <h3 className="h3 section__header-title-v10 fade_up_anim">
                {chooseUsContent.title}
              </h3>
              <p className="fade_up_anim" data-delay=".2">
                {chooseUsContent.description}
              </p>
              <ul className="custom-ul choose-us-fit__service-lists">
                {chooseUsContent.features.map((feature) => (
                  <li
                    key={feature.id}
                    className="fade_up_anim"
                    data-delay={feature.delay}
                  >
                    <h5 className="h5 list-title">{feature.title}</h5>
                    {feature.description}
                  </li>
                ))}
              </ul>
              <Link
                href={chooseUsContent.ctaButton.href}
                className="common-btn__variation10"
              >
                {chooseUsContent.ctaButton.text}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseUs;
