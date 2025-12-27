import { StaticImageData } from "next/image";

export interface PortfolioLink {
  id: string;
  name: string;
  href: string;
}

export interface ContactLink {
  id: string;
  href: string;
  icon: string;
  platform: string;
}

export interface TeamMemberDetails {
  id: string;
  welcomeText: string;
  name: string;
  description: string;
  image: StaticImageData;
  alt: string;
  portfolioTitle: string;
  portfolioLinks: PortfolioLink[];
  contactTitle: string;
  contactLinks: ContactLink[];
}

export interface TeamDetailsContent {
  member: TeamMemberDetails;
}
