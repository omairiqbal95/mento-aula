import { StaticImageData } from "next/image";

export interface CircularTextData {
  content: string;
  years: string;
}

export interface AwardItem {
  id: number;
  image: StaticImageData;
  alt: string;
}

export interface HeroContent {
  title: {
    line1: string;
    line2: string;
    line3: string;
  };
  description: string;
  button: {
    text: string;
    href: string;
  };
  awards: {
    items: AwardItem[];
    text: string;
  };
  thumbnail: {
    image: StaticImageData;
    alt: string;
  };
}

export interface HeroData {
  circularText: CircularTextData;
  content: HeroContent;
  backgroundImage: StaticImageData;
}

export interface CircularTextProps {
  content: string;
  years: string;
  className?: string;
}
