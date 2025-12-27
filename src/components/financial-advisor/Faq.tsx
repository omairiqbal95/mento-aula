import React from 'react';
import Link from 'next/link';
import { FaqProps } from '@/types/financial-advisor/faq';
import { faqContent } from '@/content/financial-advisor/home/faq';
import FaqAccordion from './FaqAccordion';
import ArrowRightIconFive from '@/icons/ArrowRightIconFive';

const Faq: React.FC<FaqProps> = ({ className = "" }) => {
  return (
    <div className={`faq-fin pb-150 ${className}`}>
      <div className="container container-2xl">
        <div className="row gy-5 justify-content-between">
          <div className="col-lg-6 col-xl-5">
            <div className="section__header-v9">
              <h3
                className="h3 section__header-title-v9 fade_up_anim"
                data-delay={faqContent.sectionHeader.titleAnimationDelay}
              >
                {faqContent.sectionHeader.title}
              </h3>
              <Link
                href={faqContent.sectionHeader.buttonUrl}
                className="common-btn__variation9 fade_up_anim"
                data-delay={faqContent.sectionHeader.buttonAnimationDelay}
              >
                {faqContent.sectionHeader.buttonText}
                <ArrowRightIconFive />
              </Link>
            </div>
          </div>
          <div className="col-lg-6 col-xl-7">
            <FaqAccordion faqItems={faqContent.faqItems} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
