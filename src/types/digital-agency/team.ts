import { StaticImageData } from "next/image";

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: StaticImageData;
  link: string;
}

export interface NavigationIcons {
  prev: StaticImageData;
  next: StaticImageData;
}

export interface TeamData {
  sectionTitle: string;
  sectionDescription: string;
  navigationIcons: NavigationIcons;
  teamMembers: TeamMember[];
}
