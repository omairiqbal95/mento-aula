import { StaticImageData } from "next/image";
import workDigital1 from "@/assets/images/work/work-digital-1.png";
import workDigital2 from "@/assets/images/work/work-digital-2.png";
import workDigital3 from "@/assets/images/work/work-digital-3.png";

export interface WorkItem {
  id: string;
  title: string;
  category: string;
  year: string;
  image: StaticImageData;
  link: string;
}

export interface WorkData {
  sectionSubtitle: string;
  sectionTitle: string;
  viewAllLink: string;
  viewAllText: string;
  works: WorkItem[];
}

export const workData: WorkData = {
  sectionSubtitle: "Featured",
  sectionTitle: "Work",
  viewAllLink: "/portfolio-masonry",
  viewAllText: "View all works",
  works: [
    {
      id: "1",
      title: "Creative Portfolio",
      category: "Design",
      year: "2024",
      image: workDigital1,
      link: "/portfolio-details",
    },
    {
      id: "2",
      title: "Brand Identity",
      category: "Branding",
      year: "2024",
      image: workDigital2,
      link: "/portfolio-details",
    },
    {
      id: "3",
      title: "Digital Experience",
      category: "Development",
      year: "2024",
      image: workDigital3,
      link: "/portfolio-details",
    },
    {
      id: "4",
      title: "Mobile App Design",
      category: "UI/UX",
      year: "2023",
      image: workDigital1,
      link: "/portfolio-details",
    },
    {
      id: "5",
      title: "E-commerce Platform",
      category: "Development",
      year: "2023",
      image: workDigital2,
      link: "/portfolio-details",
    },
    {
      id: "6",
      title: "Marketing Campaign",
      category: "Marketing",
      year: "2023",
      image: workDigital3,
      link: "/portfolio-details",
    },
    {
      id: "7",
      title: "Corporate Website",
      category: "Design",
      year: "2023",
      image: workDigital1,
      link: "/portfolio-details",
    },
    {
      id: "8",
      title: "Product Launch",
      category: "Branding",
      year: "2022",
      image: workDigital2,
      link: "/portfolio-details",
    },
    {
      id: "9",
      title: "Digital Strategy",
      category: "Consulting",
      year: "2022",
      image: workDigital3,
      link: "/portfolio-details",
    },
  ],
};
