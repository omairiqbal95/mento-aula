export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  isDefaultOpen?: boolean;
  animationDelay?: string;
}

export interface FaqSectionHeader {
  title: string;
  titleAnimationDelay: string;
  buttonText: string;
  buttonUrl: string;
  buttonAnimationDelay: string;
}

export interface FaqContent {
  sectionHeader: FaqSectionHeader;
  faqItems: FaqItem[];
  currentYear: number;
}

export interface FaqItemProps {
  faqItem: FaqItem;
  index: number;
}

export interface FaqProps {
  className?: string;
}
