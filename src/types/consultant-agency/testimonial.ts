import { StaticImageData } from "next/image";

export interface TestimonialItem {
  id: number;
  author: {
    name: string;
    position: string;
    avatar: StaticImageData;
  };
  content: string;
  brandLogo: StaticImageData;
  delay?: string;
}

export interface TestimonialColumn {
  id: number;
  items: TestimonialItem[];
}

export interface TestimonialSectionHeader {
  subTitle: string;
  title: string;
}

export interface TestimonialContent {
  sectionHeader: TestimonialSectionHeader;
  columns: TestimonialColumn[];
}