import { StaticImageData } from 'next/image';

export interface HomePage {
  name: string;
  href: string;
  image: StaticImageData;
  active?: boolean;
}

export interface ServiceItem {
  name: string;
  href: string;
}

export interface PortfolioItem {
  name: string;
  href: string;
}

export interface TeamItem {
  name: string;
  href: string;
}

export interface BlogItem {
  name: string;
  href: string;
}

export interface NavigationItem {
  name: string;
  href: string;
  children?: NavigationItem[];
}

export interface HeaderContent {
  logo: StaticImageData;
  homePages: HomePage[];
  navigation: {
    services: ServiceItem[];
    portfolio: PortfolioItem[];
    team: TeamItem[];
    blog: BlogItem[];
    directLinks: NavigationItem[];
  };
  buttons: {
    consultation: string;
    consultationHref: string;
    search: string;
  };
}
