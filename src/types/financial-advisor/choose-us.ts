import { StaticImageData } from 'next/image';

export interface TabItem {
  id: string;
  title: string;
  content: string;
  isActive: boolean;
}

export interface VideoSection {
  image: StaticImageData;
  videoId: string;
  altText: string;
}

export interface ChooseUsHeader {
  title: string;
  titleDelay: string;
  description: string;
  descriptionDelay: string;
}

export interface ChooseUsContent {
  header: ChooseUsHeader;
  tabs: TabItem[];
  video: VideoSection;
}
