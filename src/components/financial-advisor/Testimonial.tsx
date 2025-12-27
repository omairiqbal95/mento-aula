import React from 'react';
import Image from 'next/image';
import { TestimonialProps } from '@/types/financial-advisor/testimonial';
import { testimonialContent } from '@/content/financial-advisor/home/testimonial';
import TestimonialSwiper from './TestimonialSwiper';

const Testimonial: React.FC<TestimonialProps> = ({ className = "" }) => {
  return (
    <div className={`testimonial-fin pt-150 pb-150 ${className}`}>
      <div className="container container-2xl">
        <div className="row justify-content-center align-items-center text-center">
          <div className="col-12 section__header-v9">
            <h3
              className="h3 section__header-title-v9 fade_up_anim"
              data-delay={testimonialContent.sectionHeader.titleAnimationDelay}
            >
              {testimonialContent.sectionHeader.title}
            </h3>
            <p 
              className="fade_up_anim" 
              data-delay={testimonialContent.sectionHeader.descriptionAnimationDelay}
            >
              {testimonialContent.sectionHeader.description}
            </p>
          </div>
        </div>
        <div className="row testimonial-fin__navigation-outer">
          <div className="col-12 testimonial-fin__navigation">
            <div className="testimonial-fin-prev common-btn__variation9 common-btn__variation9--extend arrow">
              <Image 
                src={testimonialContent.navigation.prevIcon} 
                alt="Previous" 
              />
            </div>
            <div className="testimonial-fin-next common-btn__variation9 common-btn__variation9--extend arrow">
              <Image 
                src={testimonialContent.navigation.nextIcon} 
                alt="Next" 
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <TestimonialSwiper testimonials={testimonialContent.testimonials} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
