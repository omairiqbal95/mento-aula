import workAs6 from "@/assets/images/work/work-as-6.png";
import workAs7 from "@/assets/images/work/work-as-7.png";
import workAs8 from "@/assets/images/work/work-as-8.png";
import workAs9 from "@/assets/images/work/work-as-9.png";
import { PortfolioMasonryContent } from "@/types/inner-pages/portfolio-masonry";

export const portfolioMasonryContent: PortfolioMasonryContent = {
  items: [
    {
      id: "item-1",
      image: workAs6,
      title: "How We Grew X's Leads by Y% Through Redesign",
      href: "/portfolio-details",
      categories: "Strategy & Planning/Media/Social Media/ Digital Production",
      delay: ".2",
    },
    {
      id: "item-2",
      image: workAs7,
      title: "A Case Study on X School's Approach to Multilingual Education",
      href: "/portfolio-details",
      categories: "Strategy & Planning/Media/Social Media/ Digital Production",
      delay: ".25",
    },
    {
      id: "item-3",
      image: workAs8,
      title: "A Look at Y Hospital's Telemedicine Implementation",
      href: "/portfolio-details",
      categories: "Strategy & Planning/Media/Social Media/ Digital Production",
      delay: ".30",
    },
    {
      id: "item-4",
      image: workAs9,
      title: "A Case Study of Z Company's Interactive Shopping App",
      href: "/portfolio-details",
      categories: "Strategy & Planning/Media/Social Media/ Digital Production",
      delay: ".35",
    },
  ],
};
