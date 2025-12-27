import { StaticImageData } from 'next/image';

export interface MegaMenuItem {
  id: string;
  title: string;
  image: StaticImageData;
  href: string;
  active?: boolean;
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
  isMegaMenu?: boolean;
  megaMenuItems?: MegaMenuItem[];
  subMenuItems?: SubMenuItem[];
  sections?: MenuSection[];
  subItems?: SubMenuItem[];
}

export interface HeaderContent {
  logo: {
    image: StaticImageData;
    alt: string;
    href: string;
  };
  navigation: MenuItem[];
  searchPlaceholder: string;
  currentYear: number;
}

export interface SearchPopupProps {
  isActive: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
}
