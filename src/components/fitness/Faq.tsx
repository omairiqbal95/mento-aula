import React from "react";
import Link from "next/link";
import { faqContent } from "@/content/fitness/home/faq";
import FaqAccordion from "./FaqAccordion";

const Faq = () => {
  return (
    <div className="faq-fit pt-150 pb-150">
      <div className="container container-fitness">
        <div className="row g-4 justify-content-between">
          <div className="col-md-6 col-xxl-4">
            <h3
              className="h3 section__header-title-v10 fade_up_anim"
              data-delay=".2"
            >
              {faqContent.sectionHeader.title}
            </h3>
            <Link
              href={faqContent.ctaButton.href}
              className="common-btn__variation10 fade_up_anim"
              data-delay={faqContent.ctaButton.delay}
            >
              {faqContent.ctaButton.text}
            </Link>
          </div>
          <div className="col-md-6 col-xxl-7">
            <FaqAccordion faqs={faqContent.faqs} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
