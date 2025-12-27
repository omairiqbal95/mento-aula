"use client";
import { Accordion } from "react-bootstrap";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  delay?: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({ faqs }) => {
  return (
    <Accordion defaultActiveKey="0" className="faq-sa__accordion">
      {faqs.map((faq, index) => (
        <Accordion.Item
          key={faq.id}
          eventKey={index.toString()}
          className="fade_up_anim"
          data-delay={faq.delay}
        >
          <Accordion.Header as="h5" className="h5">
            {faq.question}
          </Accordion.Header>
          <Accordion.Body>
            <p dangerouslySetInnerHTML={{ __html: faq.answer }} />
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default FAQAccordion;
