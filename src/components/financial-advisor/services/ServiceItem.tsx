import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ServiceItem as ServiceItemType } from "@/types/financial-advisor/services";

interface ServiceItemProps {
  service: ServiceItemType;
}

const ServiceItem = ({ service }: ServiceItemProps) => {
  return (
    <div className="services-fin__item an-pine-vanish">
      <div className="services-fin__item-content">
        <h3
          className="h3 services-fin__item-title fade_up_anim"
          data-delay=".4"
        >
          {service.title}
        </h3>
        <ul className="custom-ul tags">
          {service.tags.map((tag, index) => (
            <li key={index}>
              <Link href={tag.href}>{tag.name}</Link>
            </li>
          ))}
        </ul>
        <p>{service.description}</p>
        <Link
          href={service.buttonHref}
          className="common-btn__variation9 common-btn__variation9--noicon"
        >
          {service.buttonText}
        </Link>
      </div>
      <div className="services-fin__item-thumb">
        <Image
          className="img-move"
          src={service.image}
          alt={service.title}
        />
      </div>
    </div>
  );
};

export default ServiceItem;
