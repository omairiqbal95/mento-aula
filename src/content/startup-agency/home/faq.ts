export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  isOpen?: boolean;
  delay?: string;
}

export const faqContent = {
  sectionTitle: "Frequently asked questions",
  sectionTitleLine1: "Frequently",
  sectionTitleLine2: "asked questions",
  sectionDescription:
    "If you have a question that isn't covered, please feel free to contact us directly.",
  contactButton: {
    text: "Contact Us",
    link: "/contact",
  },
  faqs: [
    {
      id: 1,
      question: "What is Unikon?",
      answer:
        "Unikon is a creative agency that offers a sleek and modern HTML template designed for creative agencies and businesses. Our template features a clean layout and intuitive navigation, providing a professional platform to showcase your portfolio and services.",
      isOpen: true,
      delay: "0",
    },
    {
      id: 2,
      question: "What services does your agency offer?",
      answer:
        "Our agency offers a range of services including web design, graphic design, branding, digital marketing, and development services. We specialize in creating visually appealing and functional websites that help businesses stand out.",
      isOpen: false,
      delay: ".2",
    },
    {
      id: 3,
      question: "How can I get in touch with your agency?",
      answer:
        'You can contact us through our website\'s contact form, email us at <a class="mailto-link" href="mailto:unikon@gmail.com">unikon@gmail.com</a>, or call us at [your phone number]. We\'re also available on our social media channels.',
      isOpen: false,
      delay: ".4",
    },
    {
      id: 4,
      question: "Do you require a contract?",
      answer:
        "Yes, we require a contract to ensure that all terms and conditions are clearly defined and agreed upon by both parties. This helps to ensure a smooth and successful collaboration.",
      isOpen: false,
      delay: ".6",
    },
    {
      id: 5,
      question: "What payment methods do you accept?",
      answer:
        "We accept various payment methods including credit cards, bank transfers, and online payment platforms like PayPal. Please contact us for more details regarding payment options.",
      isOpen: false,
      delay: ".8",
    },
  ],
};
