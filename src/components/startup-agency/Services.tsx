import React from "react";
import Image from "next/image";
import { servicesContent } from "@/content/startup-agency/home/services";

const Services = () => {
  return (
    <section className="service-sa__area pt-150 pb-150 overflow-hidden">
      <div className="container container-3xl">
        <div className="row justify-content-between align-items-end">
          <div className="col-md-6 col-xxl-4 fade_up_anim">
            <div className="section__title mb-2 mb-md-0">
              <h2 className="h2">{servicesContent.section.title}</h2>
            </div>
          </div>
          <div className="col-md-6 col-xxl-3 fade_up_anim" data-delay=".4">
            <p className="text-light-gray">
              {servicesContent.section.description}
            </p>
          </div>
        </div>
        <div className="pt-100 service-sa__items">
          {servicesContent.items.map((item) => (
            <div key={item.id} className="service-sa__item">
              <span className="service-sa__item-number d-none d-md-block">
                {item.number}
              </span>
              <figure className="service-sa__item-thumb">
                <Image
                  src={item.icon}
                  alt="service-icon"
                  width={0}
                  height={0}
                  style={{ width: "auto", height: "auto" }}
                />
              </figure>
              <div className="service-sa__item-content">
                <h5 className="h5">{item.title}</h5>
                <p className="text-light-gray">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
