"use client";

import { useState } from "react";
import Image from "next/image";
import { awardsData } from "@/content/architectural-agency/awards";

export default function Awards() {
  const [activeAward, setActiveAward] = useState(0);

  return (
    <div className="award__area pb-150">
      <div className="container container-4xl">
        <div className="row">
          <div className="col-md-8 col-lg-6">
            <h3
              className="h3 section__header-title-v3 fade_up_anim"
              data-delay=".2"
            >
              Our Awards and Recognitions
            </h3>
          </div>
        </div>
        <div className="row pt-100">
          <div className="col-12">
            <div className="award__items">
              {awardsData.map((award, index) => (
                <div
                  key={award.id}
                  className={`award__item ${
                    activeAward === index ? "active" : ""
                  }`}
                  onClick={() => setActiveAward(index)}
                >
                  <div className="award__item-left">
                    <h4 className="h4 title">{award.title}</h4>
                    <div className="award">
                      <p>{award.description}</p>
                      {award.awardIcon && (
                        <Image
                          src={award.awardIcon}
                          alt="award"
                          width={100}
                          height={100}
                        />
                      )}
                    </div>
                  </div>
                  <div className="description">
                    <p>{award.description}</p>
                    <div className="images">
                      {award.images.map((img, imgIndex) => (
                        <div key={imgIndex}>
                          <Image
                            src={img}
                            alt={`${award.title} - Image ${imgIndex + 1}`}
                            width={500}
                            height={400}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="year-wrapper">
                      /<span className="year">{award.year}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
