import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ServiceItem } from "@/types/fitness/services";

interface ServiceCardProps {
  service: ServiceItem;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <div
      className="col-sm-6 col-xl-4 col-xxl-3 fade_up_anim"
      data-delay={service.delay}
    >
      <div className="service-fit__item">
        <div className="service-fit__item-body">
          <figure className="service-fit__item-thumb">
            <Image src={service.image} alt="services-fit" />
          </figure>
          <h5 className="h5 service-fit__item-title">
            <Link href={service.link}>{service.title}</Link>
          </h5>
          <p>{service.description}</p>
        </div>
        <Link href={service.link} className="learn-more-btn">
          LEARN MORE
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="7"
            viewBox="0 0 100 7"
            fill="none"
          >
            <path
              d="M100 3.5L95 0.613249V6.38675L100 3.5ZM0 4H95.5V3H0V4Z"
              fill="currentColor"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
