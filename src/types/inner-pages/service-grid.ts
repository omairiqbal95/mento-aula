import { StaticImageData } from 'next/image';

export interface ServiceGridItem {
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

export interface ServiceGridContent {
  services: ServiceGridItem[];
  buttonText: string;
  currentYear: number;
}
