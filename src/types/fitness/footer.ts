import { StaticImageData } from "next/image";

export interface FooterNavLink {
  name: string;
  href: string;
}

export interface FooterNavSection {
  id: number;
  links: FooterNavLink[];
}

export interface FooterContent {
  logo: StaticImageData;
  description: string;
  contact: {
    phone: string;
    phoneUrl: string;
  };
  navigation: FooterNavSection[];
  copyright: {
    text: string;
    year: number;
    companyName: string;
  };
  address: string;
}
