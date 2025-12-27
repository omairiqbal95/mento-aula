import { StaticImageData } from "next/image";

export interface ChooseUsFeature {
  id: number;
  title: string;
  description: string;
  delay: string;
}

export interface ChooseUsContent {
  image: StaticImageData;
  title: string;
  description: string;
  features: ChooseUsFeature[];
  ctaButton: {
    text: string;
    href: string;
  };
}
