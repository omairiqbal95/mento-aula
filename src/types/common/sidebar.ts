import { ComponentType } from "react";
import { StaticImageData } from "next/image";

export interface MenuItem {
  title: string;
  href: string;
}

export interface SubMenu {
  title: string;
  items: MenuItem[];
}

export interface DirectNavItem {
  title: string;
  href: string;
}

export interface AccordionItem {
  id: string;
  title: string;
  items?: MenuItem[];
  subMenus?: SubMenu[];
  additionalItems?: DirectNavItem[];
}

export interface NestedAccordionProps {
  items: AccordionItem[];
  directNavItems?: DirectNavItem[];
}

export interface ContactInfo {
  icon: ComponentType;
  title: string;
  value: string;
  href: string | null;
}

export interface LogoInfo {
  image: StaticImageData;
  alt: string;
  href: string;
}

export interface SidePanelInfo {
  description: string;
  contacts: ContactInfo[];
  copyright: {
    brand: string;
    text: string;
  };
}

export interface SidebarData {
  logo: LogoInfo;
  closeIcon: string;
  menus: AccordionItem[];
  directNavItems: DirectNavItem[];
  additionalItems?: DirectNavItem[];
  sidePanel: SidePanelInfo;
}

export interface SidebarProps {
  isOpen: boolean;
  handleSidebar: () => void;
  menuClass?: string;
}
