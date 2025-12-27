import { StaticImageData } from "next/image";

export interface HeroFeature {
  text: string;
  delay?: string;
}

export interface HeroStat {
  value: number;
  label: string;
  delay: string;
}

export interface HeroContent {
  title: {
    words: string[];
  };
  description: string;
  ctaButton: {
    text: string;
    href: string;
    delay: string;
  };
  features: HeroFeature[];
  stats: HeroStat[];
  images: {
    heroImage: StaticImageData;
    circularArrow: StaticImageData;
  };
}