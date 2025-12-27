import { StaticImageData } from "next/image";

export interface RoadmapItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface BlockquoteAuthor {
  name: string;
  designation: string;
  avatar: StaticImageData;
}

export interface Blockquote {
  text: string;
  author: BlockquoteAuthor;
  backgroundImage: StaticImageData;
}

export interface ServiceArticle {
  title: string;
  introText: string[];
  thumbnail: StaticImageData;
  processTitle: string;
  processDescription: string;
  processList: string[];
  processText: string;
  roadmapTitle: string;
  roadmapDescription: string;
  roadmap: RoadmapItem[];
  blockquote: Blockquote;
  finalTitle: string;
  finalText: string[];
}

export interface Category {
  id: string;
  name: string;
  href: string;
}

export interface Widget {
  search: {
    title: string;
    placeholder: string;
  };
  categories: {
    title: string;
    items: Category[];
  };
  consultation: {
    title: string;
    buttonText: string;
    buttonHref: string;
    backgroundImage: StaticImageData;
  };
  download: {
    buttonText: string;
    downloadHref: string;
    fileName: string;
  };
}

export interface ServiceDetailsContent {
  article: ServiceArticle;
  sidebar: Widget;
  currentYear: number;
}
