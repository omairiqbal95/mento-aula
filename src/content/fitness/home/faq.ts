import { FaqContent } from "@/types/fitness/faq";

export const faqContent: FaqContent = {
  sectionHeader: {
    title: "Frequently asked questions"
  },
  ctaButton: {
    text: "Visit our Faq",
    href: "/faq",
    delay: ".4"
  },
  faqs: [
    {
      id: "collapseOne",
      question: "What can I expect during my first training session?",
      answer: "Safety is a top priority. Please inform me of any injuries or medical conditions before we start. I will modify exercises to accommodate your needs and ensure a safe workout.",
      isOpen: true,
      delay: ".2"
    },
    {
      id: "collapseTwo",
      question: "How often should I train?",
      answer: "Safety is a top priority. Please inform me of any injuries or medical conditions before we start. I will modify exercises to accommodate your needs and ensure a safe workout.",
      isOpen: false,
      delay: ".4"
    },
    {
      id: "collapseThree",
      question: "What if I have an injury or a medical condition?",
      answer: "Safety is a top priority. Please inform me of any injuries or medical conditions before we start. I will modify exercises to accommodate your needs and ensure a safe workout.",
      isOpen: false,
      delay: ".6"
    }
  ]
};
