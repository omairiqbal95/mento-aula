import { StaticImageData } from 'next/image';

export interface TypeLink {
  id: number | string;
  label: string;
  href: string;
  iconClass?: string;
}

export interface TypeContactInfo {
  id: number | string;
  label: string;
  value: string;
  icon: string;
}

export interface TypeFooterProps {
  contactInfo: {
    title: string;
    items: TypeContactInfo[];
    socialLinks: TypeLink[];
  };
  form: {
    title: string;
    actionUrl: string;
  };
  navigation: {
    logoSrc: StaticImageData;
    mainLinks: TypeLink[];
    utilityLinks: TypeLink[];
    copyrightText: string;
  };
}