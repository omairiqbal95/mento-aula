// Hero figure imports
import heroSa1 from "@/assets/images/hero/hero-sa-1.png";
import heroSa2 from "@/assets/images/hero/hero-sa-2.png";
import heroSa3 from "@/assets/images/hero/hero-sa-3.png";
import heroSa4 from "@/assets/images/hero/hero-sa-4.png";

// Avatar imports
import avatar1 from "@/assets/images/hero/avatar-1.png";
import avatar2 from "@/assets/images/hero/avatar-2.png";
import avatar3 from "@/assets/images/hero/avatar-3.png";

// Brand slider imports
import adobe from "@/assets/images/brand-slider/adobe.png";
import notion from "@/assets/images/brand-slider/notion.png";
import hubspot from "@/assets/images/brand-slider/hubspot.png";
import trustpilot from "@/assets/images/brand-slider/trustpilot.png";
import github from "@/assets/images/brand-slider/github.png";
import { StaticImageData } from "next/image";

export interface HeroContent {
  title: {
    firstLine: string;
    secondLine: string;
  };
  description: string;
  button: {
    text: string;
    href: string;
  };
  figures: {
    src: StaticImageData;
    alt: string;
    delay: string;
  }[];
  statsBox: {
    avatars: {
      src: StaticImageData;
      alt: string;
    }[];
    counter: {
      value: string;
      suffix: string;
      label: string;
    };
  };
  brands: {
    src: StaticImageData;
    alt: string;
  }[];
}

export const heroContent: HeroContent = {
  title: {
    firstLine: "Top-Tier",
    secondLine: "Startup Agency",
  },
  description:
    "Unikon is a dynamic startup agency specializing in innovative technology solutions.",
  button: {
    text: "Explore Services",
    href: "/service",
  },
  figures: [
    {
      src: heroSa1,
      alt: "hero-figure",
      delay: "0",
    },
    {
      src: heroSa2,
      alt: "hero-figure",
      delay: "0.4",
    },
    {
      src: heroSa3,
      alt: "hero-figure",
      delay: "0.8",
    },
    {
      src: heroSa4,
      alt: "hero-figure",
      delay: "1.2",
    },
  ],
  statsBox: {
    avatars: [
      {
        src: avatar1,
        alt: "avatar",
      },
      {
        src: avatar2,
        alt: "avatar",
      },
      {
        src: avatar3,
        alt: "avatar",
      },
    ],
    counter: {
      value: "100",
      suffix: "k+",
      label: "Projects Done",
    },
  },
  brands: [
    {
      src: adobe,
      alt: "adobe",
    },
    {
      src: notion,
      alt: "notion",
    },
    {
      src: hubspot,
      alt: "hubspot",
    },
    {
      src: trustpilot,
      alt: "trustpilot",
    },
    {
      src: github,
      alt: "github",
    },
    {
      src: adobe,
      alt: "adobe",
    },
    {
      src: notion,
      alt: "notion",
    },
    {
      src: hubspot,
      alt: "hubspot",
    },
    {
      src: trustpilot,
      alt: "trustpilot",
    },
    {
      src: github,
      alt: "github",
    },
  ],
};
