import { StaticImageData } from 'next/image';

export interface AboutValue {
  title: string;
  description: string;
}

export interface AboutFunFact {
  number: string;
  label: string;
  delay: string;
}

export interface AboutSectionHeader {
  subTitle: string;
  title: string;
}

export interface AboutContent {
  sectionHeader: AboutSectionHeader;
  image: StaticImageData;
  description: string;
  valuesTitle: string;
  values: AboutValue[];
  buttonText: string;
  buttonLink: string;
  funFacts: AboutFunFact[];
}
