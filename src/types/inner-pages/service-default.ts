import { StaticImageData } from 'next/image';

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  image: StaticImageData;
  detailsLink: string;
  animation: {
    thumb: string;
    number: string;
    title: string;
    description: string;
    button: string;
  };
}

export interface ServiceDefaultContent {
  services: ServiceItem[];
  buttonText: string;
  currentYear: number;
}
