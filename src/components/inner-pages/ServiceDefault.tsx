import React from 'react';
import { serviceDefaultContent } from '@/content/inner-pages/service-default';
import ServiceDefaultItem from './ServiceDefaultItem';

const ServiceDefault: React.FC = () => {
  return (
    <div className="service__area pt-150 pb-150">
      <div className="container">
        <div className="row g-4 gy-5">
          {serviceDefaultContent.services.map((service) => (
            <ServiceDefaultItem
              key={service.id}
              service={service}
              buttonText={serviceDefaultContent.buttonText}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceDefault;
