import React from "react";
import Link from "next/link";
import {
  servicesData,
  serviceSectionData,
} from "@/content/healthcare/home/service";
import ServiceAccordionInteractive from "./ServiceAccordionInteractive";
import ArrowIcon from "@/icons/ArrowIcon";

const ServiceAccordion = () => {
  return (
    <div className="service-health__area pt-150 pb-150">
      <div className="container container-2xl">
        <div className="row gy-4 justify-content-between">
          <div className="col-md-6 col-lg-4 col-xxl-3">
            <div className="section-header-v8">
              <span
                className="section__header-sub-title-v8 fade_up_anim"
                data-delay=".2"
              >
                {serviceSectionData.subTitle}
              </span>
              <h2
                className="h2 section__header-title-v8 fade_up_anim"
                data-delay=".4"
              >
                {serviceSectionData.title}
              </h2>
              <p className="health fade_up_anim" data-delay=".6">
                {serviceSectionData.description}
              </p>
              <Link
                href={serviceSectionData.ctaLink}
                className="common-btn__variation8--extend common-btn__variation8--extend-2 fade_up_anim"
                data-delay=".8"
              >
                <span>
                  {serviceSectionData.ctaText}
                  <ArrowIcon />
                </span>
              </Link>
            </div>
          </div>
          <div className="col-md-6 col-lg-8 col-xxl-8">
            <ServiceAccordionInteractive services={servicesData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceAccordion;
