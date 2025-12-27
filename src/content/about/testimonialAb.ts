import authorAvatar1 from "@/assets/images/testimonial/author-avatar-1.png";
import authorAvatar2 from "@/assets/images/testimonial/author-avatar-2.png";
import authorAvatar3 from "@/assets/images/testimonial/author-avatar-3.png";
import brand1 from "@/assets/images/testimonial/brandr-1.png";
import brand2 from "@/assets/images/testimonial/brandr-2.png";
import { StaticImageData } from "next/image";

export interface TestimonialAbItem {
  id: number;
  rating: number;
  content: string;
  authorName: string;
  authorDesignation: string;
  authorAvatar: StaticImageData;
  brandImage: StaticImageData;
}

export const testimonialAbContent = {
  sectionSubTitle: "Testimonial",
  sectionTitle: "What our customers are saying about us",
  sectionDescription:
    "Created exclusive discount codes and affiliate links for influencers to share with their followers. Enhance brand reach.",
  testimonials: [
    {
      id: 1,
      rating: 5,
      content:
        '"The professionalism and insight provided by [Your Agency Name] are unmatched. They took the time to understand our unique needs and delivered exceptional results. We look forward to a long-term collaboration."',
      authorName: "Karen Wilson",
      authorDesignation: "Marketing Manager",
      authorAvatar: authorAvatar1,
      brandImage: brand1,
    },
    {
      id: 2,
      rating: 5,
      content:
        '"The influencer marketing campaign was a huge success! We saw our social media following skyrocket and our sales increase dramatically. The influencers they chose were a perfect fit for our brand."',
      authorName: "Sarah Thompson",
      authorDesignation: "VP of Marketing",
      authorAvatar: authorAvatar2,
      brandImage: brand2,
    },
    {
      id: 3,
      rating: 5,
      content:
        '"From content creation to data analysis, their services are top-notch. They understand our business needs and always deliver outstanding results. I love their support also"',
      authorName: "Michael Green",
      authorDesignation: "Director of Business",
      authorAvatar: authorAvatar3,
      brandImage: brand2,
    },
    {
      id: 4,
      rating: 5,
      content:
        '"The professionalism and insight provided by [Your Agency Name] are unmatched. They took the time to understand our unique needs and delivered exceptional results. We look forward to a long-term collaboration."',
      authorName: "Karen Wilson",
      authorDesignation: "Marketing Manager",
      authorAvatar: authorAvatar1,
      brandImage: brand1,
    },
    {
      id: 5,
      rating: 5,
      content:
        '"The influencer marketing campaign was a huge success! We saw our social media following skyrocket and our sales increase dramatically. The influencers they chose were a perfect fit for our brand."',
      authorName: "Sarah Thompson",
      authorDesignation: "VP of Marketing",
      authorAvatar: authorAvatar2,
      brandImage: brand2,
    },
    {
      id: 6,
      rating: 5,
      content:
        '"From content creation to data analysis, their services are top-notch. They understand our business needs and always deliver outstanding results. I love their support also"',
      authorName: "Michael Green",
      authorDesignation: "Director of Business",
      authorAvatar: authorAvatar3,
      brandImage: brand2,
    },
  ],
};
