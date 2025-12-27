import { StaticImageData } from "next/image";

export interface ResourceTag {
  id: number;
  name: string;
  url: string;
}

export interface ResourceItem {
  id: number;
  title: string;
  description: string;
  image: StaticImageData;
  type: string;
  date: string;
  tags: ResourceTag[];
  readMoreUrl: string;
}

export interface ResourcesSectionHeader {
  subTitle: string;
  title: string;
}

export interface ResourcesContent {
  sectionHeader: ResourcesSectionHeader;
  resources: ResourceItem[];
}