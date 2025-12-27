import { StaticImageData } from "next/image";

// Work images imports
import workAs1 from "@/assets/images/work/work-as-1.png";
import workAs2 from "@/assets/images/work/work-as-2.png";
import workAs3 from "@/assets/images/work/work-as-3.png";
import workAs4 from "@/assets/images/work/work-as-4.png";
import workAs5 from "@/assets/images/work/work-as-5.png";
import arrow from "@/assets/images/work/arrow.svg";

export interface WorkItem {
  id: number;
  image: StaticImageData;
  title: string;
  description: string;
  href: string;
  delay?: string;
  isFullWidth?: boolean;
}

export interface WorkContent {
  section: {
    title: string;
    description: string;
  };
  items: WorkItem[];
  button: {
    text: string;
    href: string;
  };
  arrow: StaticImageData;
}

export const workContent: WorkContent = {
  section: {
    title: "Recent works",
    description:
      "Dive into our latest innovations. Explore our recent projects and see how we're pushing the boundaries of what's possible for startups.",
  },
  items: [
    {
      id: 1,
      image: workAs1,
      title: "How We Grew X's Leads by Y% Through Redesign",
      description: "Strategy & Planning/Media/Social Media/ Digital Production",
      href: "/portfolio-details",
      delay: "0",
    },
    {
      id: 2,
      image: workAs2,
      title: "A Case Study on X School's Approach to Multilingual Education",
      description: "Strategy & Planning/Media/Social Media/ Digital Production",
      href: "/portfolio-details",
      delay: ".2",
    },
    {
      id: 3,
      image: workAs3,
      title: "Revolutionize the Geomancy Studio branding and visual identity",
      description: "Strategy & Planning/Media/Social Media/ Digital Production",
      href: "/portfolio-details",
      delay: ".4",
      isFullWidth: true,
    },
    {
      id: 4,
      image: workAs4,
      title: "A Case Study of Z Company's Interactive Shopping App",
      description: "Strategy & Planning/Media/Social Media/ Digital Production",
      href: "/portfolio-details",
      delay: ".6",
    },
    {
      id: 5,
      image: workAs5,
      title: "A Look at Y Hospital's Telemedicine Implementation",
      description: "Strategy & Planning/Media/Social Media/ Digital Production",
      href: "/portfolio-details",
      delay: "0",
    },
  ],
  button: {
    text: "View all works",
    href: "/portfolio-masonry",
  },
  arrow: arrow,
};
