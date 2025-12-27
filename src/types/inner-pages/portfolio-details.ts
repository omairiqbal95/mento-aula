import { StaticImageData } from "next/image";

export interface ProcessStep {
  id: string;
  title: string;
  items: string[];
}

export interface ProjectInfo {
  client: string;
  industry: string;
  project: string;
  duration: string;
}

export interface ResultItem {
  id: string;
  title: string;
  description: string;
}

export interface GalleryImage {
  id: string;
  image: StaticImageData;
  alt: string;
  delay: string;
}

export interface RelatedProject {
  id: string;
  image: StaticImageData;
  title: string;
  categories: string;
  href: string;
}

export interface PortfolioDetailsContent {
  background: {
    title: string;
    description: string;
  };
  objectives: {
    title: string;
    items: string[];
  };
  mainImage: {
    image: StaticImageData;
    alt: string;
  };
  process: {
    title: string;
    steps: ProcessStep[];
  };
  gallery: GalleryImage[];
  results: {
    title: string;
    items: ResultItem[];
  };
  projectInfo: ProjectInfo;
  relatedProjects: {
    title: string;
    items: RelatedProject[];
  };
}
