import React from 'react';
import { servicesContent } from '@/content/legal-advisor/home/services';
import ServicesContainer from './ServicesContainer';

const Services = () => {
  return (
    <section className="services-la__area pb-150">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="section__header-v2">
              <span className="section__sub-title fade_up_anim">
                {servicesContent.sectionHeader.subTitle}
              </span>
              <h3 className="h3 section__title fade_up_anim" data-delay=".4">
                {servicesContent.sectionHeader.title}
              </h3>
              <p>
                {servicesContent.sectionHeader.description}
              </p>
            </div>
          </div>
        </div>
        <ServicesContainer 
          services={servicesContent.services}
          images={servicesContent.images}
        />
      </div>
    </section>
  );
};

export default Services;
