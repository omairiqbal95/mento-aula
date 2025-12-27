import award1 from "@/assets/images/hero/award-1.png";
import award2 from "@/assets/images/hero/award-2.png";
import award3 from "@/assets/images/hero/award-3.png";
import award4 from "@/assets/images/hero/award-4.png";
import heroThumbnail from "@/assets/images/hero/hero-la-thumbnail.png";
import heroBg from "@/assets/images/hero/hero-la-bg.png";
import { HeroData } from "@/types/legal-advisor/hero";

export const heroData: HeroData = {
  circularText: {
    content: "years of experiance",
    years: "15+",
  },
  backgroundImage: heroBg,
  content: {
    title: {
      line1: "Expert legal",
      line2: "advice at your",
      line3: "fingerprint",
    },
    description:
      "Protecting Your Rights with Professional Guidance and Personalized Solutions",
    button: {
      text: "Book Free Consultation",
      href: "/contact",
    },
    awards: {
      items: [
        {
          id: 1,
          image: award1,
          alt: "award",
        },
        {
          id: 2,
          image: award2,
          alt: "award",
        },
        {
          id: 3,
          image: award3,
          alt: "award",
        },
        {
          id: 4,
          image: award4,
          alt: "award",
        },
      ],
      text: "Received 10+ Awards",
    },
    thumbnail: {
      image: heroThumbnail,
      alt: "Hero Thumbnail",
    },
  },
};
