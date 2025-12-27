import { StaticImageData } from "next/image";

export interface CounterItem {
  id: number;
  value: number;
  suffix: string;
  label: string;
  delay: string;
}

export interface AboutContent {
  sectionHeader: {
    subTitle: string;
  };
  image: StaticImageData;
  title: string;
  description: string;
  counters: CounterItem[];
}
