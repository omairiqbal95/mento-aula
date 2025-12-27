import { StaticImageData } from "next/image";

export interface TypeAward {
  id: string | number;
  year: number;
  title: string;
  imageSrc: StaticImageData;
  category: string;
  delay: number;
}

export interface TypeAwardHeader {
  subTitle: string;
  title: string;
}

export interface TypeAwardsSectionProps {
  header: TypeAwardHeader;
  awards: TypeAward[];
}
