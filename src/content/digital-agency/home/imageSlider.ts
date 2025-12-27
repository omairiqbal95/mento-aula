import { StaticImageData } from "next/image";
import imageSlider1 from "@/assets/images/image-slider/image-1.png";
import imageSlider2 from "@/assets/images/image-slider/image-2.png";

export interface SliderImage {
  id: string;
  image: StaticImageData;
  alt: string;
}

export interface ImageSliderData {
  autoplayDelay: number;
  speed: number;
  loop: boolean;
  fadeEffect?: boolean;
  crossFade?: boolean;
  images: SliderImage[];
}

export const imageSliderData: ImageSliderData = {
  autoplayDelay: 3000,
  speed: 1000,
  loop: true,
  fadeEffect: true,
  crossFade: true,
  images: [
    {
      id: "1",
      image: imageSlider2,
      alt: "Digital Agency Portfolio Showcase",
    },
    {
      id: "2",
      image: imageSlider1,
      alt: "Creative Design Solutions",
    },
    {
      id: "3",
      image: imageSlider2,
      alt: "Modern Web Development",
    },
    {
      id: "4",
      image: imageSlider1,
      alt: "Brand Identity Design",
    },
  ],
};
