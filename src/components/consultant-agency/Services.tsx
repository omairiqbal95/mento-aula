import React from "react";
import { servicesContent } from "@/content/consultant-agency/home/services";
import ServicesSlider from "./ServicesSlider";

const Services = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { navigation, ...sliderConfigWithoutNav } =
    servicesContent.sliderConfig;

  return (
    <div className="service-ca__area border-grid-lr border-grid-tb">
      <div className="container container-4xl pt-50 pb-50 border-grid-px border-grid-z">
        <div className="row justify-content-center text-center">
          <div className="col-xl-6">
            <div className="setion_header">
              <span className="section__header-sub-title-v2 fade_up_anim">
                {servicesContent.sectionHeader.subTitle}
              </span>
              <h3
                className="h3 section__header-title-v2 fade_up_anim"
                data-delay=".4"
              >
                {servicesContent.sectionHeader.title}
              </h3>
            </div>
          </div>
        </div>
        <div className="row pt-100">
          <div className="col-12">
            <ServicesSlider
              services={servicesContent.services}
              sliderConfig={sliderConfigWithoutNav}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
