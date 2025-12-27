import testimonialSlide1 from "@/assets/images/testimonial/testimonial-slide-1.png";
import testimonialSlide2 from "@/assets/images/testimonial/testimonial-slide-2.png";
import arrowLeft from "@/assets/images/icon/arrow-left.png";
import arrowRight from "@/assets/images/icon/arrow-right.png";
import type { TestimonialContent } from "@/types/startup-agency/testimonial";

export const testimonialContent: TestimonialContent = {
  sectionTitle: "Testimonial",
  sectionDescription:
    "Discover how our innovative solutions have transformed businesses and empowered startups to achieve their goals.",
  testimonials: [
    {
      id: 1,
      image: testimonialSlide1,
      title: "Exceeded Our Expectations!",
      content:
        "The professionalism and insight provided by [Your Agency Name] are unmatched. They took the time to understand our unique needs and delivered exceptional results. We look forward to a long-term collaboration.",
      authorName: "Robert Martinez",
      authorDesignation: "CTO of FinTech Ventures",
    },
    {
      id: 2,
      image: testimonialSlide2,
      title: "Outstanding Service and Results!",
      content:
        "Working with Unikon has been a game-changer for our startup. Their innovative approach and dedication to our vision helped us achieve our goals faster than we ever thought possible. Highly recommend!",
      authorName: "Sarah Johnson",
      authorDesignation: "CEO of Tech Innovators",
    },
    {
      id: 3,
      image: testimonialSlide1,
      title: "Exceeded Our Expectations!",
      content:
        "The professionalism and insight provided by [Your Agency Name] are unmatched. They took the time to understand our unique needs and delivered exceptional results. We look forward to a long-term collaboration.",
      authorName: "Robert Martinez",
      authorDesignation: "CTO of FinTech Ventures",
    },
    {
      id: 4,
      image: testimonialSlide2,
      title: "Outstanding Service and Results!",
      content:
        "Working with Unikon has been a game-changer for our startup. Their innovative approach and dedication to our vision helped us achieve our goals faster than we ever thought possible. Highly recommend!",
      authorName: "Sarah Johnson",
      authorDesignation: "CEO of Tech Innovators",
    },
  ],
  navigation: {
    prevIcon: arrowLeft,
    nextIcon: arrowRight,
  },
};
