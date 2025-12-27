import { StaticImageData } from "next/image";

export interface TypeTestimonial {
  id: string | number;
  rating: number;
  quote: string;
  authorName: string;
  authorPosition: string;
  authorAvatarSrc: StaticImageData;
  brandLogoSrc: StaticImageData;
}

export interface TypeTestimonialListProps {
  subTitle: string;
  title: string;
  description: string;
  testimonials: TypeTestimonial[];
}

export interface TypeTestimonialSwiperProps {
  testimonials: TypeTestimonial[];
}
