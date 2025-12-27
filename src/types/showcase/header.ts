import { StaticImageData } from 'next/image';

export interface NavItem {
  id: string;
  title: string;
  href: string;
  image?: StaticImageData;
  isActive?: boolean;
}

export interface SubNavItem {
  id: string;
  title: string;
  href: string;
}

export interface MenuSection {
  id: string;
  title: string;
  items: SubNavItem[];
}

export interface MenuItem {
  id: string;
  title: string;
  href?: string;
  isMegaMenu?: boolean;
  megaMenuItems?: NavItem[];
  subMenuItems?: SubNavItem[];
  sections?: MenuSection[];
  items?: SubNavItem[];
}

export interface Logo {
  src: StaticImageData;
  alt: string;
  href: string;
}

export interface Button {
  text: string;
  href: string;
  className: string;
}

export interface HeaderContent {
  logo: Logo;
  navigation: MenuItem[];
  buttons: {
    mobile: Button;
    desktop: Button;
  };
  hamburgerButton: {
    spans: number;
    className: string;
  };
}

export interface SearchPopupProps {
  isActive: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
}

export interface SidebarProps {
  isOpen: boolean;
  handleSidebar: () => void;
}
