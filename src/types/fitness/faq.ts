export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  isOpen: boolean;
  delay: string;
}

export interface FaqContent {
  sectionHeader: {
    title: string;
  };
  ctaButton: {
    text: string;
    href: string;
    delay: string;
  };
  faqs: FaqItem[];
}
