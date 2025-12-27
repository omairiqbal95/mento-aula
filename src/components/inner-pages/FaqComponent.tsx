import React from "react";
import Link from "next/link";
import { faqContent } from "@/content/inner-pages/faq";
import FaqAccordion from "./faq/FaqAccordion";
import ArrowIcon from "@/icons/ArrowIcon";

const FaqComponent = () => {
  const { items, footer } = faqContent;

  return (
    <div className="faq-common faq-sa__area pt-150 pb-150 bg-transparent">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <FaqAccordion items={items} />
          </div>
        </div>
        <div className="row pt-100">
          <div className="col-12">
            <div className="faq-common__footer">
              <h2 className="h2 fade_up_anim" data-delay=".2">
                {footer.title}
              </h2>
              <p className="fade_up_anim" data-delay=".4">
                {footer.description}
              </p>
              <div
                className="faq-common__btns d-flex align-items-lg-center pt-75 gap-3 fade_up_anim"
                data-delay={footer.delay}
              >
                <Link
                  href={footer.buttonHref}
                  className="common-btn outline border-light"
                >
                  <span>{footer.buttonText}</span>
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqComponent;