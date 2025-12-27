"use client";
import React from "react";
import { Accordion } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import type { ServiceItem } from "@/content/digital-agency/home/service";

interface ServicesAccordionProps {
  services: ServiceItem[];
}

const ServicesAccordion: React.FC<ServicesAccordionProps> = ({ services }) => {
  return (
    <Accordion
      defaultActiveKey="0"
      className="services-digital__accordion"
    >
      {services.map((service) => (
        <Accordion.Item
          key={service.id}
          eventKey={service.id}
          className="services-digital__item fade_up_anim"
          data-delay={service.delay}
        >
          <Accordion.Header className="h4 services-digital__item-title">
            {service.title}
          </Accordion.Header>
          <Accordion.Body className="services-digital__item-content-wrapper">
            <div className="services-digital__item-content">
              <p>{service.description}</p>
              <ul className="custom-ul services-digital__item-tags">
                <li>
                  <Link href={service.link}>Discover More</Link>
                </li>
              </ul>
            </div>
            <figure className="services-digital__item-thumb">
              <Image src={service.image} alt={service.title} />
            </figure>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default ServicesAccordion;
