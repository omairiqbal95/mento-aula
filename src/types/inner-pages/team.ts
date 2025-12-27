import { StaticImageData } from "next/image";

export interface SocialLink {
  id: string;
  href: string;
  icon: string;
  platform: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: StaticImageData;
  alt: string;
  href: string;
  socialLinks: SocialLink[];
  delay: string;
}

export interface TeamContent {
  members: TeamMember[];
}
