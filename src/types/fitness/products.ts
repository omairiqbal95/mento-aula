import { StaticImageData } from "next/image";

export interface ProductItem {
  id: number;
  image: StaticImageData;
  alt: string;
  delay?: string;
}

export interface ProductsContent {
  sectionHeader: {
    title: string;
  };
  products: ProductItem[];
}
