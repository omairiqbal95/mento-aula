import { StaticImageData } from 'next/image';

export interface MegaMenuItem {
  id: number;
  title: string;
  image: StaticImageData;
  href: string;
  isActive?: boolean;
}

export interface SubMenuItem {
  title: string;
  href?: string;
  hasSubmenu?: boolean;
  submenu?: SubMenuItem[];
}

export interface MenuItem {
  title: string;
  href?: string;
  hasSubmenu?: boolean;
  submenu?: SubMenuItem[];
  megaMenuItems?: MegaMenuItem[];
  isMegaMenu?: boolean;
}

export interface HeaderContent {
  logo: StaticImageData;
  navigation: MenuItem[];
  sidebarData: {
    logo: StaticImageData;
    closeIcon: string;
    description: string;
    contacts: Array<{
      id: number;
      title: string;
      value: string;
      href?: string;
      icon: string;
    }>;
    copyright: {
      brand: string;
      text: string;
    };
  };
  contactButton: {
    text: string;
    href: string;
  };
}

export interface MegaMenuProps {
  items: MegaMenuItem[];
}

export interface SubMenuProps {
  items: SubMenuItem[];
}

export interface NavigationProps {
  items: MenuItem[];
}
