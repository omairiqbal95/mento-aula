import work1 from "@/assets/images/work/work-as-1.png";
import work2 from "@/assets/images/work/work-as-2.png";
import work3 from "@/assets/images/work/work-as-3.png";
import work4 from "@/assets/images/work/work-as-4.png";
import work5 from "@/assets/images/work/work-as-5.png";

import type { PortfolioSectionContent } from "@/types/inner-pages/portfolio-default";

export const portfolioDefaultContent: PortfolioSectionContent = {
  items: [
    {
      id: "work-1",
      image: work1,
      title: "How We Grew X's Leads by Y% Through Redesign",
      categories: "Strategy & Planning/Media/Social Media/ Digital Production",
      href: "/portfolio-details",
    },
    {
      id: "work-2",
      image: work2,
      title: "A Case Study on X School's Approach to Multilingual Education",
      categories: "Strategy & Planning/Media/Social Media/ Digital Production",
      href: "/portfolio-details",
    },
    {
      id: "work-3",
      image: work3,
      title: "Revolutionize the Geomancy Studio branding and visual identity",
      categories: "Strategy & Planning/Media/Social Media/ Digital Production",
      href: "/portfolio-details",
    },
    {
      id: "work-4",
      image: work4,
      title: "A Case Study of Z Company's Interactive Shopping App",
      categories: "Strategy & Planning/Media/Social Media/ Digital Production",
      href: "/portfolio-details",
    },
    {
      id: "work-5",
      image: work5,
      title: "A Look at Y Hospital's Telemedicine Implementation",
      categories: "Strategy & Planning/Media/Social Media/ Digital Production",
      href: "/portfolio-details",
    },
  ],
};
