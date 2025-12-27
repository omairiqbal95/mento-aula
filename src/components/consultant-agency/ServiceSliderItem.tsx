import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ServiceItem } from "@/types/consultant-agency/services";

interface ServiceSliderItemProps {
  service: ServiceItem;
}

const ServiceSliderItem = ({ service }: ServiceSliderItemProps) => {
  return (
    <div className="service-ca__slider-item">
      <div className="service-ca__slider-thumb">
        <Image
          src={service.image}
          alt={service.alt}
        />
      </div>
      <div className="service-ca__slider-content">
        <h5 className="h5">
          <Link href={service.link}>
            {service.title}
          </Link>
        </h5>
        <p>
          {service.description}
        </p>
      </div>
    </div>
  );
};

export default ServiceSliderItem;
