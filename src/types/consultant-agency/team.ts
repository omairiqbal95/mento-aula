import { StaticImageData } from "next/image";

export interface SocialLink {
  id: number;
  platform: string;
  url: string;
  icon: string;
}

export interface TeamMember {
  id: number;
  name: string;
  position: string;
  image: StaticImageData;
  profileUrl: string;
  socialLinks: SocialLink[];
  delay?: string;
}

export interface TeamSectionHeader {
  subTitle: string;
  title: string;
  description: string;
}

export interface TeamContent {
  sectionHeader: TeamSectionHeader;
  members: TeamMember[];
}