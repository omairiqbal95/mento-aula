import { StaticImageData } from "next/image";

export interface PortfolioMasonryItem {
  id: string;
  image: StaticImageData;
  title: string;
  href: string;
  categories: string;
  delay: string;
}

export interface PortfolioMasonryContent {
  items: PortfolioMasonryItem[];
}
