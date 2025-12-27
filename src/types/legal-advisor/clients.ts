import { StaticImageData } from 'next/image';

export interface ClientItem {
  id: number;
  name: string;
  logo: StaticImageData;
  alt: string;
}

export interface ClientsContent {
  title: string;
  items: ClientItem[];
}
