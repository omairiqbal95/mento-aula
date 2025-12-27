import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ServiceGridItem as ServiceGridItemType } from '@/types/inner-pages/service-grid';
import ArrowRightIconOne from '@/icons/ArrowRightIconOne';

interface ServiceGridItemProps {
  service: ServiceGridItemType;
  buttonText: string;
}

const ServiceGridItem: React.FC<ServiceGridItemProps> = ({ service, buttonText }) => {
  return (
    <div className="col-12">
      <div className="service__item">
        <div 
          className={`service__thumb service__thumb--extend ${service.animation.thumb}`} 
          data-delay=".2"
        >
          <Image
            src={service.image}
            alt={service.title}
          />
        </div>
        <div className="service__content service__content--extend">
          <span 
            className={`service-number ${service.animation.number}`} 
            data-delay=".3"
          >
            {service.number}
          </span>
          <div className="service__info">
            <h2 className={`h2 ${service.animation.title}`} data-delay=".35">
              {service.title}
            </h2>
            <p className={service.animation.description} data-delay=".4">
              {service.description}
            </p>
            <div className="btn-group d-flex align-items-lg-center gap-3">
              <Link
                href={service.detailsLink}
                className={`common-btn ${service.animation.button}`}
                data-delay=".45"
              >
                <span>{buttonText}</span>
                <ArrowRightIconOne />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceGridItem;
