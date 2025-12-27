import { StaticImageData } from "next/image";
import { ComponentType } from "react";

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  image: StaticImageData;
  alt: string;
  link: string;
}

export interface ServiceSliderConfig {
  spaceBetween: number;
  centeredSlides: boolean;
  speed: number;
  autoplay: {
    delay: number;
  };
  loop: boolean;
  slidesPerView: number | "auto";
  allowTouchMove: boolean;
  navigation: {
    enabled: boolean;
    prevIcon: ComponentType;
    nextIcon: ComponentType;
  };
  breakpoints: {
    [key: number]: {
      spaceBetween: number;
      slidesPerView: number;
    };
  };
}

export interface ServicesContent {
  sectionHeader: {
    subTitle: string;
    title: string;
  };
  services: ServiceItem[];
  sliderConfig: ServiceSliderConfig;
}