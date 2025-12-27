import { StaticImageData } from "next/image";

export interface AboutListItem {
  id: number;
  title: string;
  description: string;
  delay?: string;
}

export interface AboutSectionHeader {
  subTitle: string;
  title: string;
}

export interface AboutHeaderContent {
  description: string;
  delay?: string;
}

export interface AboutVideoSection {
  image: StaticImageData;
  videoUrl: string;
  videoId: string;
  altText: string;
}

export interface AboutContent {
  sectionHeader: AboutSectionHeader;
  headerContent: AboutHeaderContent;
  aboutList: AboutListItem[];
  videoSection: AboutVideoSection;
}