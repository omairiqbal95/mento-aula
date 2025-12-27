import { StaticImageData } from "next/image";

export interface Testimonial {
  id: number;
  image: StaticImageData;
  title: string;
  content: string;
  authorName: string;
  authorDesignation: string;
}

export interface NavigationIcons {
  prevIcon: StaticImageData;
  nextIcon: StaticImageData;
}

export interface TestimonialContent {
  sectionTitle: string;
  sectionDescription: string;
  testimonials: Testimonial[];
  navigation: NavigationIcons;
}
