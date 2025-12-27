import { StaticImageData } from "next/image";

export interface ImageSliderItem {
  id: number;
  image: StaticImageData;
  altText: string;
}

export interface ImageSliderConfig {
  centeredSlides: boolean;
  speed: number;
  effect: string;
  autoplay: {
    delay: number;
    disableOnInteraction: boolean;
  };
  pagination: {
    el: string;
    clickable: boolean;
  };
  navigation: {
    nextEl: string;
    prevEl: string;
  };
}

export interface ImageSliderContent {
  items: ImageSliderItem[];
  config: ImageSliderConfig;
}