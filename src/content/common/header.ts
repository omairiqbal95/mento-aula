import Logo from "@/assets/images/logo.svg";
import MegaMenuHome1 from "@/assets/images/mega-menu/mega-menu-home-1.png";
import MegaMenuHome2 from "@/assets/images/mega-menu/mega-menu-home-2.png";
import MegaMenuHome3 from "@/assets/images/mega-menu/mega-menu-home-3.png";
import MegaMenuHome4 from "@/assets/images/mega-menu/mega-menu-home-4.png";
import MegaMenuHome6 from "@/assets/images/mega-menu/mega-menu-home-6.png";
import MegaMenuHome7 from "@/assets/images/mega-menu/mega-menu-home-7.png";
import MegaMenuHome8 from "@/assets/images/mega-menu/mega-menu-home-8.png";
import MegaMenuHome9 from "@/assets/images/mega-menu/mega-menu-home-9.png";
import MegaMenuHome10 from "@/assets/images/mega-menu/mega-menu-home-10.png";
import MegaMenuShowcase from "@/assets/images/mega-menu/mega-menu-showcase.png";
import { StaticImageData } from "next/image";

export interface HomePage {
  name: string;
  href: string;
  image: StaticImageData;
  isActive?: boolean;
}

export interface NavigationItem {
  name: string;
  href: string;
}

export interface Navigation {
  services: NavigationItem[];
  portfolio: NavigationItem[];
  team: NavigationItem[];
  blog: NavigationItem[];
  directLinks: NavigationItem[];
}

export interface HeaderButtons {
  letsTalk: string;
  search: string;
}

export interface Contact {
  id: string;
  title: string;
  value: string;
  href?: string;
  icon: string;
}

export interface SidebarData {
  logo: StaticImageData;
  closeIcon: string;
  description: string;
  contacts: Contact[];
  copyright: {
    brand: string;
    text: string;
  };
}

export interface HeaderContent {
  logo: StaticImageData;
  homePages: HomePage[];
  navigation: Navigation;
  buttons: HeaderButtons;
  sidebarData: SidebarData;
}

export const headerContent: HeaderContent = {
  logo: Logo,
  homePages: [
    {
      name: "Digital Agency",
      href: "/",
      image: MegaMenuHome1,
      isActive: true,
    },
    {
      name: "Marketing Agency",
      href: "/marketing-agency",
      image: MegaMenuHome2,
    },
    {
      name: "Startup Agency",
      href: "/startup-agency",
      image: MegaMenuHome3,
    },
    {
      name: "Consultant Agency",
      href: "/consultant-agency",
      image: MegaMenuHome4,
    },
    {
      name: "Legal Advisor",
      href: "/legal-advisor",
      image: MegaMenuHome6,
    },
    {
      name: "Architectural Agency",
      href: "/architectural-agency",
      image: MegaMenuHome7,
    },
    {
      name: "Healthcare",
      href: "/healthcare",
      image: MegaMenuHome8,
    },
    {
      name: "Financial Advisor",
      href: "/financial-advisor",
      image: MegaMenuHome9,
    },
    {
      name: "Fitness",
      href: "/fitness",
      image: MegaMenuHome10,
    },
    {
      name: "Showcase",
      href: "/showcase",
      image: MegaMenuShowcase,
    },
  ],
  navigation: {
    services: [
      { name: "Service Default", href: "/service" },
      { name: "Service Grid", href: "/service-grid" },
      { name: "Service Details", href: "/service-details" },
    ],
    portfolio: [
      { name: "Portfolio Default", href: "/portfolio" },
      { name: "Portfolio Masonry", href: "/portfolio-masonry" },
      { name: "Portfolio Details", href: "/portfolio-details" },
    ],
    team: [
      { name: "Team", href: "/team" },
      { name: "Team Details", href: "/team-details" },
    ],
    blog: [
      { name: "Blog Default", href: "/blog" },
      { name: "Blog Standard", href: "/blog-standard" },
      { name: "Blog Grid", href: "/blog-grid" },
      { name: "Blog Details", href: "/blog-details" },
    ],
    directLinks: [
      { name: "About Us", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "FAQ", href: "/faq" },
      { name: "Error 404", href: "/404" },
    ],
  },
  buttons: {
    letsTalk: "Let's Talk",
    search: "Search",
  },
  sidebarData: {
    logo: Logo,
    closeIcon: "bi bi-x-lg",
    description:
      "Discover, Explore & Understanding The Product Description Maecenas ullamcorper eros libero, facilities tempore mi darius vel. Sed ut felid ligula. Pellentesque.",
    contacts: [
      {
        id: "1",
        title: "Contact Us 24/7",
        value: "+55 (9900) 666 22",
        href: "tel:+55990066622",
        icon: "bi bi-telephone",
      },
      {
        id: "2",
        title: "Contact Mail",
        value: "info.unikon@demo.com",
        href: "mailto:info.unikon@demo.com",
        icon: "bi bi-envelope",
      },
      {
        id: "3",
        title: "Contact Location",
        value: "18/2, Topkhana Road, Australia.",
        icon: "bi bi-geo-alt",
      },
    ],
    copyright: {
      brand: "@Unikon",
      text: ".Copyright © 2025",
    },
  },
};
