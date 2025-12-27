import { StaticImageData } from 'next/image';

export interface HeroButton {
  text: string;
  href: string;
  delay: string;
}

export interface HeroTitle {
  text: string;
  titleImage: StaticImageData;
}

export interface HeroContent {
  button: HeroButton;
  description: string;
  descriptionDelay: string;
  title: HeroTitle;
}
