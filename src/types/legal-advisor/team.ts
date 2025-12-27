import { StaticImageData } from 'next/image';

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
  backgroundImage: StaticImageData;
  authorImage: StaticImageData;
  description: string;
  socialLinks: SocialLink[];
  delay: string;
}

export interface TeamSectionHeader {
  subTitle: string;
  title: string;
}

export interface TeamContent {
  sectionHeader: TeamSectionHeader;
  members: TeamMember[];
}
