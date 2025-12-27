import { StaticImageData } from "next/image";

export interface TeamMember {
  id: number;
  name: string;
  description: string;
  features: string[];
  link: string;
  image: StaticImageData;
}

export interface TeamHealthHeader {
  title: string;
  description: string;
}

export interface NavigationIcons {
  arrowLeft: StaticImageData;
  arrowRight: StaticImageData;
}

export interface TeamHealthContent {
  header: TeamHealthHeader;
  navigationIcons: NavigationIcons;
  teamMembers: TeamMember[];
}

export interface TeamHealthProps {
  className?: string;
}
