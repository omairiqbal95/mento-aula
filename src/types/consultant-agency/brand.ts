import { StaticImageData } from "next/image";

export interface BrandItem {
  id: number;
  name: string;
  image: StaticImageData;
  alt: string;
}

export interface BrandSliderConfig {
  spaceBetween: number;
  centeredSlides: boolean;
  speed: number;
  autoplay: {
    delay: number;
  };
  loop: boolean;
  slidesPerView: number | "auto";
  allowTouchMove: boolean;
  breakpoints: {
    [key: number]: {
      spaceBetween: number;
    };
  };
}

export interface BrandContent {
  brands: BrandItem[];
  sliderConfig: BrandSliderConfig;
}