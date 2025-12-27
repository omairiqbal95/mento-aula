import { StaticImageData } from 'next/image';

export interface BrandItem {
  id: string;
  name: string;
  image: StaticImageData;
  alt: string;
}

export interface HeroContent {
  title: {
    words: string[];
  };
  description: string;
  button: {
    text: string;
    href: string;
    className: string;
  };
  brandSection: {
    title: string;
    brands: BrandItem[];
  };
  heroImage: {
    src: StaticImageData;
    alt: string;
  };
  videoSection: {
    circularText: string;
    videoId: string;
    className: string;
  };
}

export interface CircularTextProps {
  content: string;
  videoId: string;
  className?: string;
}

export interface BrandSliderProps {
  brands: BrandItem[];
}
