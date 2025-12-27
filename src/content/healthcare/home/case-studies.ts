import { StaticImageData } from "next/image";
import caseStudy1 from "@/assets/images/case-studies/case-studies-1.png";
import caseStudy2 from "@/assets/images/case-studies/case-studies-2.png";
import caseStudy3 from "@/assets/images/case-studies/case-studies-3.png";
import caseStudy4 from "@/assets/images/case-studies/case-studies-4.png";
import caseStudy5 from "@/assets/images/case-studies/case-studies-5.png";
import caseStudy6 from "@/assets/images/case-studies/case-studies-6.png";

export interface CaseStudy {
  id: number;
  image: StaticImageData;
  alt: string;
  link: string;
  itemClass: string;
}

export interface CaseStudiesHeader {
  title: string;
  ctaText: string;
  ctaLink: string;
}

export const caseStudiesHeader: CaseStudiesHeader = {
  title: "Our recent works",
  ctaText: "View All Works",
  ctaLink: "/portfolio",
};

export const caseStudiesData: CaseStudy[] = [
  {
    id: 1,
    image: caseStudy1,
    alt: "case-study-1",
    link: "/portfolio-details",
    itemClass: "item-1",
  },
  {
    id: 2,
    image: caseStudy2,
    alt: "case-study-2",
    link: "/portfolio-details",
    itemClass: "item-2",
  },
  {
    id: 3,
    image: caseStudy3,
    alt: "case-study-3",
    link: "/portfolio-details",
    itemClass: "item-3",
  },
  {
    id: 4,
    image: caseStudy4,
    alt: "case-study-4",
    link: "/portfolio-details",
    itemClass: "item-4",
  },
  {
    id: 5,
    image: caseStudy5,
    alt: "case-study-5",
    link: "/portfolio-details",
    itemClass: "item-5",
  },
  {
    id: 6,
    image: caseStudy6,
    alt: "case-study-6",
    link: "/portfolio-details",
    itemClass: "item-6",
  },
];
