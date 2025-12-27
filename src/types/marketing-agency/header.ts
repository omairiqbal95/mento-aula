import { StaticImageData } from 'next/image';

export interface MegaMenuItem {
  id: string;
  title: string;
  image: StaticImageData;
  alt: string;
  href: string;
  isActive?: boolean;
}

export interface SubMenuItem {
  id: string;
  title: string;
  href: string;
}

export interface MenuSection {
  id: string;
  title: string;
  items: SubMenuItem[];
}

export interface MenuItem {
  id: string;
  title: string;
  href?: string;
  subItems?: SubMenuItem[];
  sections?: MenuSection[];
  megaMenuItems?: MegaMenuItem[];
  isMegaMenu?: boolean;
}

export interface HeaderContent {
  logo: {
    src: StaticImageData;
    alt: string;
    href: string;
  };
  navigation: MenuItem[];
  contactButton: {
    text: string;
    href: string;
    className: string;
  };
  currentYear: number;
}

export interface MegaMenuProps {
  items: MegaMenuItem[];
}

export interface NavigationProps {
  items: MenuItem[];
}
