import { StaticImageData } from "next/image";

export interface HomePage {
  name: string;
  href: string;
  image: StaticImageData;
  isActive?: boolean;
}

export interface NavigationLink {
  name: string;
  href: string;
}

export interface HeaderContent {
  logo: StaticImageData;
  homePages: HomePage[];
  navigation: {
    services: NavigationLink[];
    portfolio: NavigationLink[];
    team: NavigationLink[];
    blog: NavigationLink[];
    directLinks: NavigationLink[];
  };
  buttons: {
    cta: string;
  };
}
