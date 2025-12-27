import { StaticImageData } from 'next/image';

export interface SocialLink {
  platform: string;
  url: string;
  iconClass: string;
}

export interface TeamMember {
  id: number;
  name: string;
  position: string;
  image: StaticImageData;
  socialLinks: SocialLink[];
  detailsUrl: string;
}

export interface TeamNavigation {
  prevIcon: StaticImageData;
  nextIcon: StaticImageData;
}

export interface TeamSectionHeader {
  title: string;
  animationDelay: string;
}

export interface TeamContent {
  sectionHeader: TeamSectionHeader;
  navigation: TeamNavigation;
  members: TeamMember[];
  currentYear: number;
}

export interface TeamSliderItemProps {
  member: TeamMember;
}

export interface TeamProps {
  className?: string;
}
