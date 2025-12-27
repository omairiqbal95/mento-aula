import { StaticImageData } from 'next/image';

export interface TestimonialRating {
  value: number;
  maxValue: number;
}

export interface TestimonialItem {
  id: number;
  name: string;
  date: string;
  content: string;
  rating: TestimonialRating;
}

export interface TestimonialNavigation {
  prevIcon: StaticImageData;
  nextIcon: StaticImageData;
}

export interface TestimonialSectionHeader {
  title: string;
  description: string;
  titleAnimationDelay: string;
  descriptionAnimationDelay: string;
}

export interface TestimonialContent {
  sectionHeader: TestimonialSectionHeader;
  navigation: TestimonialNavigation;
  testimonials: TestimonialItem[];
  currentYear: number;
}

export interface TestimonialItemProps {
  testimonial: TestimonialItem;
}

export interface TestimonialProps {
  className?: string;
}
