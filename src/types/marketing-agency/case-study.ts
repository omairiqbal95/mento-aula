import { StaticImageData } from 'next/image';

export interface TypeCaseStudy {
  id: string | number;
  imageSrc: StaticImageData | string;
  subTitle: string;
  number: string;
  title: string;
  description: string;
  link: string;
}

export interface TypeCaseStudyListProps {
  caseStudies: TypeCaseStudy[];
}