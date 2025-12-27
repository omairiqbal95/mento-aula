import { StaticImageData } from 'next/image';

export interface RoadmapItem {
  id: string;
  icon: StaticImageData;
  title: string;
  description: string;
  delay: string;
}

export interface RoadmapSectionHeader {
  title: string;
  description: string;
}

export interface RoadmapContent {
  sectionHeader: RoadmapSectionHeader;
  items: RoadmapItem[];
}
