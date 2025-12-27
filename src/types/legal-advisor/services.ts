import { StaticImageData } from 'next/image';

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  delay: string;
  isExpanded: boolean;
}

export interface ServiceImage {
  id: number;
  image: StaticImageData;
  alt: string;
  isActive: boolean;
}

export interface ServicesSectionHeader {
  subTitle: string;
  title: string;
  description: string;
}

export interface ServicesContent {
  sectionHeader: ServicesSectionHeader;
  services: ServiceItem[];
  images: ServiceImage[];
}
