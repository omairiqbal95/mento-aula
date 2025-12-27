import React from "react";
import Link from "next/link";
import { faqContent } from "@/content/startup-agency/home/faq";
import FAQAccordion from "./FAQAccordion";
import ArrowIcon from "@/icons/ArrowIcon";

const FAQ = () => {
  return (
    <div className="faq-sa__area pt-150 pb-150">
      <div className="container container-3xl">
        <div className="row justify-content-between g-4 gy-5">
          <div className="col-xl-5 col-xxl-4">
            <div className="section__header text-center text-xl-start">
              <h3 className="h3 section__title fade_up_anim">
                {faqContent.sectionTitleLine1}
                <br />
                {faqContent.sectionTitleLine2}
              </h3>
              <p className="fade_up_anim" data-delay=".4">
                {faqContent.sectionDescription}
              </p>
              <div className="faq-sa__btn-wrapper">
                <Link
                  href={faqContent.contactButton.link}
                  className="common-btn outline border-light fade_up_anim"
                  data-delay=".8"
                >
                  <span>{faqContent.contactButton.text}</span>
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-xxl-6">
            <FAQAccordion faqs={faqContent.faqs} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
