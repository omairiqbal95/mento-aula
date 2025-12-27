import { StaticImageData } from 'next/image';

export interface SocialLink {
  href: string;
  icon: string;
  label: string;
}

export interface FooterLink {
  href: string;
  text: string;
}

export interface ContactInfo {
  icon: string;
  href: string;
  text: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface ContactSection {
  title: string;
  contacts: ContactInfo[];
}

export interface FooterBrand {
  logo: StaticImageData;
  logoAlt: string;
  description: string;
  socialLinks: SocialLink[];
}

export interface BottomLink {
  href: string;
  text: string;
}

export interface FooterContent {
  brand: FooterBrand;
  sections: FooterSection[];
  contactSection: ContactSection;
  bottomLinks: BottomLink[];
  currentYear: number;
}
