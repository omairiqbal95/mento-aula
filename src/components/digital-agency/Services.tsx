import React from "react";
import { servicesData } from "@/content/digital-agency/home/service";
import Link from "next/link";
import ServicesAccordion from "./ServicesAccordion";

const Services = () => {
  return (
    <div className="services-digital pt-150 pb-150">
      <div className="container container-mini">
        <div className="row">
          <div className="col-12 d-sm-flex justify-content-between align-items-center text-center text-sm-start">
            <div className="section__header-v12 fade_up_anim">
              <span className="section__header-sub-title-v12">
                {servicesData.sectionSubtitle}
              </span>
              <h2 className="h2 section__header-title-v12">
                {servicesData.sectionTitle}
              </h2>
            </div>
            <Link
              href={servicesData.viewAllLink}
              className="common-btn common-btn-v1 white-btn mt-4 mt-sm-0"
            >
              <span>{servicesData.viewAllText}</span>
            </Link>
          </div>
        </div>
        <div className="row pt-100">
          <div className="col-12">
            <ServicesAccordion services={servicesData.services} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
