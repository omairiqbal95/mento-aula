"use client";

import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { FaqItem } from '@/types/financial-advisor/faq';

interface FaqAccordionProps {
  faqItems: FaqItem[];
}

const FaqAccordion: React.FC<FaqAccordionProps> = ({ faqItems }) => {
  const defaultActiveKey = faqItems.find((item) => item.isDefaultOpen)?.id;
  const defaultActiveKeyString =
    defaultActiveKey !== undefined ? String(defaultActiveKey) : undefined;

  return (
    <div className="faq-fin__accordion">
      <Accordion defaultActiveKey={defaultActiveKeyString}>
        {faqItems.map((item) => {
          const eventKey = String(item.id);
          const animationProps = item.animationDelay
            ? { 'data-delay': item.animationDelay }
            : undefined;

          return (
            <Accordion.Item
              eventKey={eventKey}
              key={item.id}
              className="accordion-item fade_up_anim"
              {...animationProps}
            >
              <Accordion.Header className="accordion-header">
                {item.question}
              </Accordion.Header>
              <Accordion.Body className="accordion-body">
                {item.answer}
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </div>
  );
};

export default FaqAccordion;
