export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  delay: string;
  isDefaultOpen?: boolean;
}

export interface FaqFooter {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  delay: string;
}

export interface FaqContent {
  items: FaqItem[];
  footer: FaqFooter;
}
