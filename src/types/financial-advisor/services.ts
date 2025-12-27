import { StaticImageData } from 'next/image';

export interface ServiceTag {
  name: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  tags: ServiceTag[];
  description: string;
  buttonText: string;
  buttonHref: string;
  image: StaticImageData;
}

export interface ServicesHeader {
  title: string;
  titleDelay: string;
  exploreButton: {
    text: string;
    href: string;
    delay: string;
  };
}

export interface ServicesContent {
  header: ServicesHeader;
  services: ServiceItem[];
}
