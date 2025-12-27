"use client";

import React, { useState } from 'react';
import { ServiceItem, ServiceImage } from '@/types/legal-advisor/services';
import ServicesAccordion from './ServicesAccordion';
import ServiceImages from './ServiceImages';

interface ServicesContainerProps {
  services: ServiceItem[];
  images: ServiceImage[];
}

const ServicesContainer = ({ services, images }: ServicesContainerProps) => {
  const initialActiveId = services.find(service => service.isExpanded)?.id || services[0]?.id || 1;
  const [activeImageId, setActiveImageId] = useState(initialActiveId);

  const handleImageChange = (id: number) => {
    setActiveImageId(id);
  };

  return (
    <div className="row gy-5 g-md-5 pt-100">
      <div className="col-md-8">
        <ServicesAccordion 
          services={services} 
          onImageChange={handleImageChange}
        />
      </div>
      <div className="col-md-4 d-md-flex align-items-center justify-content-md-end">
        <ServiceImages 
          images={images} 
          activeImageId={activeImageId}
        />
      </div>
    </div>
  );
};

export default ServicesContainer;
