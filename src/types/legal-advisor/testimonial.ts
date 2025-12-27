import { StaticImageData } from 'next/image';

export interface TestimonialAuthor {
  id: number;
  name: string;
  designation: string;
  avatar: StaticImageData;
}

export interface TestimonialItem {
  id: number;
  author: TestimonialAuthor;
  testimonial: string;
}

export interface TestimonialContent {
  items: TestimonialItem[];
}
