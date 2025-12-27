import { StaticImageData } from 'next/image';
import { ReactNode } from 'react';

export interface BreadcrumbContent {
  backgroundImage: StaticImageData;
  title: string;
}

export interface BreadcrumbProps {
  title?: ReactNode;
  backgroundImage?: StaticImageData;
}
