"use client";
import { useState } from "react";
import Link from "next/link";
import { Accordion } from "react-bootstrap";
import { ServiceItem } from "@/content/healthcare/home/service";

interface ServiceAccordionInteractiveProps {
  services: ServiceItem[];
}

const ServiceAccordionInteractive: React.FC<ServiceAccordionInteractiveProps> = ({
  services,
}) => {
  const [activeKey, setActiveKey] = useState<string>("0");

  return (
    <Accordion
      activeKey={activeKey}
      onSelect={(key) => setActiveKey(key as string)}
      className="service-health__accordion"
    >
      {services.map((service, index) => (
        <Accordion.Item
          key={service.id}
          eventKey={index.toString()}
          className="fade_up_anim"
          data-delay={`.${2 + index * 2}`}
        >
          <Accordion.Header as="h4" className="h4">
            {service.title}
          </Accordion.Header>
          <Accordion.Body>
            <div className="left-content">
              <p>{service.description}</p>
              <Link href={service.learnMoreLink} className="learn-more">
                Learn More
              </Link>
            </div>
            <ul className="custom-ul right-content">
              {service.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default ServiceAccordionInteractive;
