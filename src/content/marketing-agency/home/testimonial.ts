// constants/testimonials.ts

import { TypeTestimonial } from "@/types/marketing-agency/testimonial";

// Mock imports for local images
import AVATAR_1 from '@/assets/images/testimonial/author-avatar-1.png';
import AVATAR_2 from '@/assets/images/testimonial/author-avatar-2.png';
import AVATAR_3 from '@/assets/images/testimonial/author-avatar-3.png';
import BRAND_1 from '@/assets/images/brand-slider/testimonial-mar__brand-1.png';
import BRAND_2 from '@/assets/images/brand-slider/testimonial-mar__brand-2.png';

export const CONSTANT_TESTIMONIAL_HEADER = {
  subTitle: "TESTIMONIAL",
  title: "What our customers are saying about us",
  description:
    "Created exclusive discount codes and affiliate links for influencers to share with their followers. Enhance brand reach.",
};

export const CONSTANT_TESTIMONIALS: TypeTestimonial[] = [
  {
    id: 1,
    rating: 5,
    quote:
      "Partnering with this team has been a fantastic experience. Their innovative strategies and thorough execution have helped us achieve remarkable growth and engagement.",
    authorName: "KAREN WILSON",
    authorPosition: "MARKETING MANAGER",
    authorAvatarSrc: AVATAR_1,
    brandLogoSrc: BRAND_1,
  },
  {
    id: 2,
    rating: 5,
    quote:
      "The influencer marketing campaign was a huge success! We saw our social media following skyrocket and our sales increase dramatically. The influencers they chose were a perfect fit for our brand.",
    authorName: "SARAH THOMPSON",
    authorPosition: "VP OF MARKETING",
    authorAvatarSrc: AVATAR_2,
    brandLogoSrc: BRAND_2,
  },
  {
    id: 3,
    rating: 5,
    quote:
      "From content creation to data analysis, their services are top-notch. They understand our business needs and always deliver outstanding results. I love their support also",
    authorName: "MARK ANDERSON",
    authorPosition: "CHIEF OPERATING OFFICER",
    authorAvatarSrc: AVATAR_3,
    brandLogoSrc: BRAND_2,
  },
  {
    id: 4,
    rating: 5,
    quote:
      "A truly collaborative partnership. The results exceeded our expectations, delivering both brand awareness and a measurable boost in conversion rates.",
    authorName: "DAVID CHEN",
    authorPosition: "HEAD OF GROWTH",
    authorAvatarSrc: AVATAR_1,
    brandLogoSrc: BRAND_1,
  },
];