import { StaticImageData } from 'next/image';

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

export interface NavigationLink {
  name: string;
  href: string;
}

export interface NavigationSection {
  title: string;
  links: NavigationLink[];
}

export interface FooterBrand {
  logo: StaticImageData;
  logoHref: string;
  description: string;
  socialLinks: SocialLink[];
}

export interface NewsletterForm {
  title: string;
  emailPlaceholder: string;
  agreementText: string;
  privacyPolicyHref: string;
  privacyPolicyText: string;
}

export interface FooterBottom {
  copyrightText: string;
  currentYear: number;
}

export interface FooterContent {
  brand: FooterBrand;
  navigationSections: NavigationSection[];
  newsletter: NewsletterForm;
  bottom: FooterBottom;
}
