import { StaticImageData } from "next/image";
import articleImg1 from "@/assets/images/articles/Image-1.png";
import articleImg2 from "@/assets/images/articles/Image-2.png";

export interface Article {
  id: number;
  image: StaticImageData;
  category: string;
  title: string;
  link: string;
}

export const latestArticlesData: Article[] = [
  {
    id: 1,
    image: articleImg1,
    category: "Expert Insights Series",
    title: "Innovation in finance adapting to a dynamic landscape",
    link: "/blog-details",
  },
  {
    id: 2,
    image: articleImg2,
    category: "Expert Insights Series",
    title: "Innovation in finance adapting to a dynamic landscape",
    link: "/blog-details",
  },
];
