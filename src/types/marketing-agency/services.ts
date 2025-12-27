import type { StaticImageData } from "next/image";
export interface Services {
  id: number;
  name: string;
  href: string;
  imageSrc: string | StaticImageData;
  delay: number;
}

export type ServicesListProps = {
  services: Services[];
};
