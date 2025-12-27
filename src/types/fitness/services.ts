import { StaticImageData } from "next/image";

export interface ServiceItem {
  id: number;
  image: StaticImageData;
  title: string;
  description: string;
  link: string;
  delay: string;
}

export interface ServicesContent {
  sectionHeader: {
    icon: StaticImageData;
    subTitle: string;
    title: string;
  };
  ctaButton: {
    text: string;
    href: string;
    delay: string;
  };
  services: ServiceItem[];
}
