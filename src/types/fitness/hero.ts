import { StaticImageData } from "next/image";

export interface BrandItem {
  id: number;
  image: StaticImageData;
  alt: string;
}

export interface HeroContent {
  subTitle: {
    icon: StaticImageData;
    text: string;
  };
  title: string;
  description: string;
  ctaButton: {
    text: string;
    href: string;
    delay: string;
  };
  heroImage: StaticImageData;
  videoPlayer: {
    videoUrl: string;
    thumbnailImage: StaticImageData;
    playButtonText: string;
  };
  brands: BrandItem[];
}
