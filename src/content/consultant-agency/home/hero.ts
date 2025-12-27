import heroImage from "@/assets/images/hero/hero-ca.png";
import circularArrow from "@/assets/images/icon/circular-arrow.png";
import { HeroContent } from "@/types/consultant-agency/hero";

export const heroContent: HeroContent = {
  title: {
    words: ["We are", "consulting", "agency"]
  },
  description: "We help businesses like yours overcome challenges and achieve their goals.",
  ctaButton: {
    text: "Schedule Consultation",
    href: "/contact",
    delay: ".6"
  },
  features: [
    {
      text: "Award winning agency"
    },
    {
      text: "Expert help",
      delay: ".4"
    },
    {
      text: "Ongoing support",
      delay: ".96"
    }
  ],
  stats: [
    {
      value: 79,
      label: "ROI Success Rate",
      delay: ".4"
    },
    {
      value: 23,
      label: "Debt Reduction",
      delay: ".8"
    }
  ],
  images: {
    heroImage,
    circularArrow
  }
};