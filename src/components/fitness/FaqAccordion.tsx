"use client";

import React, { useState } from "react";
import { FaqItem } from "@/types/fitness/faq";

interface FaqAccordionProps {
  faqs: FaqItem[];
}

const FaqAccordion = ({ faqs }: FaqAccordionProps) => {
  const [openId, setOpenId] = useState<string>(faqs[0]?.id || "");

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? "" : id);
  };

  return (
    <div className="faq-fit__accordion accordion" id="accordionExample">
      {faqs.map((faq) => (
        <div
          key={faq.id}
          className="accordion-item fade_up_anim"
          data-delay={faq.delay}
        >
          <h2 className="accordion-header">
            <button
              className={`accordion-button ${
                openId !== faq.id ? "collapsed" : ""
              }`}
              type="button"
              onClick={() => toggleAccordion(faq.id)}
              aria-expanded={openId === faq.id}
              aria-controls={faq.id}
            >
              {faq.question}
            </button>
          </h2>
          <div
            id={faq.id}
            className={`accordion-collapse collapse ${
              openId === faq.id ? "show" : ""
            }`}
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">{faq.answer}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FaqAccordion;
