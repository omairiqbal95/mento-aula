import { StaticImageData } from "next/image";

export interface PortfolioItemData {
  id: string;
  image: StaticImageData;
  title: string;
  categories: string;
  href: string;
}

export interface PortfolioSectionContent {
  items: PortfolioItemData[];
}
