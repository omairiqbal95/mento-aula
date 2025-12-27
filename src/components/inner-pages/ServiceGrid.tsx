import React from 'react';
import { serviceGridContent } from '@/content/inner-pages/service-grid';
import ServiceGridItem from './ServiceGridItem';

const ServiceGrid: React.FC = () => {
  return (
    <div className="service__area pt-150 pb-150">
      <div className="container">
        <div className="service__wrapper row g-4 gy-5">
          {serviceGridContent.services.map((service) => (
            <ServiceGridItem
              key={service.id}
              service={service}
              buttonText={serviceGridContent.buttonText}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceGrid;
