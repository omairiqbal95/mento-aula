import { StaticImageData } from 'next/image';

export interface TypeBlogItem {
  id: string | number;
  date: string;
  category: string;
  title: string;
  link: string;
  imageSrc: StaticImageData;
  delay: number;
}

export interface TypeBlogHeader {
  subTitle: string;
  title: string;
  viewAllLink: string;
}

export interface TypeBlogSectionProps {
  header: TypeBlogHeader;
  posts: TypeBlogItem[];
}