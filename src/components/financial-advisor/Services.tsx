import React from "react";
import Link from "next/link";
import { servicesContent } from "@/content/financial-advisor/home/services";
import ArrowRightIconFour from "@/icons/ArrowRightIconFour";
import ServiceItem from "./services/ServiceItem";

const Services = () => {
  return (
    <div className="services-fin pt-150">
      <div className="container container-2xl">
        <div className="row g-4 justify-content-center justify-content-md-between align-items-center">
          <div className="col-sm-6 col-md-9 text-center text-md-start">
            <h2
              className="h2 section__header-title-v9 fade_up_anim"
              data-delay={servicesContent.header.titleDelay}
            >
              {servicesContent.header.title}
            </h2>
          </div>
          <div
            className="col-sm-6 col-md-3 text-center text-md-end fade_up_anim"
            data-delay={servicesContent.header.exploreButton.delay}
          >
            <Link href={servicesContent.header.exploreButton.href} className="common-btn__variation9">
              {servicesContent.header.exploreButton.text}
              <ArrowRightIconFour />
            </Link>
          </div>
        </div>
        <div className="row pt-100">
          <div className="col-12">
            {servicesContent.services.map((service) => (
              <ServiceItem key={service.id} service={service} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
