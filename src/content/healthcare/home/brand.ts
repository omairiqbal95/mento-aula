import { StaticImageData } from "next/image";
import brand1 from "@/assets/images/brand-slider/brand-1.png";
import brand2 from "@/assets/images/brand-slider/brand-2.png";
import brand3 from "@/assets/images/brand-slider/brand-3.png";
import brand4 from "@/assets/images/brand-slider/brand-4.png";

export interface Brand {
  id: number;
  image: StaticImageData;
  alt: string;
}

export const brandsData: Brand[] = [
  {
    id: 1,
    image: brand1,
    alt: "brand-1",
  },
  {
    id: 2,
    image: brand2,
    alt: "brand-2",
  },
  {
    id: 3,
    image: brand3,
    alt: "brand-3",
  },
  {
    id: 4,
    image: brand4,
    alt: "brand-4",
  },
  {
    id: 5,
    image: brand1,
    alt: "brand-1",
  },
  {
    id: 6,
    image: brand2,
    alt: "brand-2",
  },
  {
    id: 7,
    image: brand3,
    alt: "brand-3",
  },
  {
    id: 8,
    image: brand4,
    alt: "brand-4",
  },
];
