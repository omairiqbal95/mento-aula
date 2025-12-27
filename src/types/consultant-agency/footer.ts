import { StaticImageData } from "next/image";

export interface SocialLink {
  id: number;
  platform: string;
  url: string;
  icon: string;
}

export interface FooterLink {
  id: number;
  text: string;
  url: string;
}

export interface FooterNavSection {
  id: number;
  title: string;
  links: FooterLink[];
  delay?: string;
  type?: "links" | "newsletter";
}

export interface FooterBrand {
  logo: StaticImageData;
  logoUrl: string;
  description: string;
  socialLinks: SocialLink[];
}

export interface NewsletterForm {
  title: string;
  action: string;
  method: string;
  emailPlaceholder: string;
  agreementText: string;
  privacyPolicyUrl: string;
}

export interface ContactInfo {
  phone: string;
  phoneUrl: string;
  address: string;
}

export interface FooterCopyright {
  text: string;
  companyName: string;
  year: number;
}

export interface FooterContent {
  brand: FooterBrand;
  navigation: FooterNavSection[];
  newsletter: NewsletterForm;
  contact: ContactInfo;
  copyright: FooterCopyright;
}