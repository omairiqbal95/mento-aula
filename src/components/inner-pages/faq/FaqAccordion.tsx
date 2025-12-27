import React from "react";
import Accordion from "react-bootstrap/Accordion";
import AccordionItem from "react-bootstrap/AccordionItem";
import AccordionHeader from "react-bootstrap/AccordionHeader";
import AccordionBody from "react-bootstrap/AccordionBody";
import { FaqItem } from "@/types/inner-pages/faq";

interface FaqAccordionProps {
  items: FaqItem[];
}

const FaqAccordion: React.FC<FaqAccordionProps> = ({ items }) => {
  return (
    <Accordion defaultActiveKey="1" className="faq-sa__accordion">
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          eventKey={item.id}
          className="fade_up_anim" 
          data-delay={item.delay}
        >
          <AccordionHeader as="h5" className="h5">
            {item.question}
          </AccordionHeader>
          <AccordionBody>
            <p>{item.answer}</p>
          </AccordionBody>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FaqAccordion;
