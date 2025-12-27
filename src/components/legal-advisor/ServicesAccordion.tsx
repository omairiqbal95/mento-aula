"use client";

import React from 'react';
import { Accordion } from 'react-bootstrap';
import type { AccordionEventKey } from 'react-bootstrap/esm/AccordionContext';
import { ServiceItem } from '@/types/legal-advisor/services';

interface ServicesAccordionProps {
  services: ServiceItem[];
  onImageChange: (id: number) => void;
}

const ServicesAccordion = ({ services, onImageChange }: ServicesAccordionProps) => {
  const handleAccordionSelect = (eventKey: AccordionEventKey) => {
    if (eventKey && typeof eventKey === 'string') {
      const serviceId = parseInt(eventKey);
      onImageChange(serviceId);
    }
  };

  const defaultActiveKey = services.find(service => service.isExpanded)?.id.toString() || services[0]?.id.toString();

  return (
    <Accordion 
      className="services-la__accordion"
      defaultActiveKey={defaultActiveKey}
      onSelect={handleAccordionSelect}
    >
      {services.map((service) => (
        <Accordion.Item 
          key={service.id} 
          eventKey={service.id.toString()}
          className="fade_up_anim"
          data-delay={service.delay}
        >
          <Accordion.Header>
            <span className="accordion-title">
              {service.title}
            </span>
          </Accordion.Header>
          <Accordion.Body>
            {service.description}
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default ServicesAccordion;
