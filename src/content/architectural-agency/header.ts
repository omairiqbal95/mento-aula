import { StaticImageData } from "next/image";
import logo from "@/assets/images/logo.svg";
import megaMenuHome1 from "@/assets/images/mega-menu/mega-menu-home-1.png";
import megaMenuHome2 from "@/assets/images/mega-menu/mega-menu-home-2.png";
import megaMenuHome3 from "@/assets/images/mega-menu/mega-menu-home-3.png";
import megaMenuHome4 from "@/assets/images/mega-menu/mega-menu-home-4.png";
import megaMenuHome6 from "@/assets/images/mega-menu/mega-menu-home-6.png";
import megaMenuHome7 from "@/assets/images/mega-menu/mega-menu-home-7.png";
import megaMenuHome8 from "@/assets/images/mega-menu/mega-menu-home-8.png";
import megaMenuHome9 from "@/assets/images/mega-menu/mega-menu-home-9.png";
import megaMenuHome10 from "@/assets/images/mega-menu/mega-menu-home-10.png";
import megaMenuShowcase from "@/assets/images/mega-menu/mega-menu-showcase.png";

export interface MegaMenuItem {
  id: number;
  title: string;
  image: StaticImageData;
  link: string;
  isActive?: boolean;
}

export interface SubMenuItem {
  id: number;
  title: string;
  link: string;
}

export interface MenuItem {
  id: number;
  title: string;
  link: string;
  hasChildren?: boolean;
  hasMegaMenu?: boolean;
  megaMenuItems?: MegaMenuItem[];
  subMenu?: (SubMenuItem | SubMenuGroup)[];
  isActive?: boolean;
}

export interface SubMenuGroup {
  id: number;
  title: string;
  hasChildren: boolean;
  subMenu: SubMenuItem[];
}

export const logoImage = logo;

export const megaMenuHomeItems: MegaMenuItem[] = [
  {
    id: 1,
    title: "Digital Agency",
    image: megaMenuHome1,
    link: "/",
  },
  {
    id: 2,
    title: "Marketing Agency",
    image: megaMenuHome2,
    link: "/marketing-agency",
  },
  {
    id: 3,
    title: "Startup Agency",
    image: megaMenuHome3,
    link: "/startup-agency",
  },
  {
    id: 4,
    title: "Consultant Agency",
    image: megaMenuHome4,
    link: "/consultant-agency",
  },
  {
    id: 5,
    title: "Legal Advisor",
    image: megaMenuHome6,
    link: "/legal-advisor",
  },
  {
    id: 6,
    title: "Architectural Agency",
    image: megaMenuHome7,
    link: "/architectural-agency",
    isActive: true,
  },
  {
    id: 7,
    title: "Healthcare",
    image: megaMenuHome8,
    link: "/healthcare",
  },
  {
    id: 8,
    title: "Financial Advisor",
    image: megaMenuHome9,
    link: "/financial-advisor",
  },
  {
    id: 9,
    title: "Fitness",
    image: megaMenuHome10,
    link: "/fitness",
  },
  {
    id: 10,
    title: "Showcase",
    image: megaMenuShowcase,
    link: "/showcase",
  },
];

export const navigationMenu: MenuItem[] = [
  {
    id: 1,
    title: "Home",
    link: "#",
    hasChildren: true,
    hasMegaMenu: true,
    megaMenuItems: megaMenuHomeItems,
    isActive: true,
    subMenu: megaMenuHomeItems.map((item) => ({
      id: item.id,
      title: item.title,
      link: item.link,
    })),
  },
  {
    id: 2,
    title: "Pages",
    link: "#",
    hasChildren: true,
    subMenu: [
      {
        id: 1,
        title: "Service",
        hasChildren: true,
        subMenu: [
          { id: 1, title: "Service Default", link: "/service" },
          { id: 2, title: "Service Grid", link: "/service-grid" },
          { id: 3, title: "Service Details", link: "/service-details" },
        ],
      },
      {
        id: 2,
        title: "Portfolio",
        hasChildren: true,
        subMenu: [
          { id: 1, title: "Portfolio Default", link: "/portfolio" },
          { id: 2, title: "Portfolio Masonry", link: "/portfolio-masonry" },
          { id: 3, title: "Portfolio Details", link: "/portfolio-details" },
        ],
      },
      {
        id: 3,
        title: "Team",
        hasChildren: true,
        subMenu: [
          { id: 1, title: "Team", link: "/team" },
          { id: 2, title: "Team Details", link: "/team-details" },
        ],
      },
      { id: 4, title: "FAQ", link: "/faq" },
      { id: 5, title: "Error 404", link: "/404" },
    ],
  },
  {
    id: 3,
    title: "Blog",
    link: "#",
    hasChildren: true,
    subMenu: [
      { id: 1, title: "Blog Default", link: "/blog" },
      { id: 2, title: "Blog Standard", link: "/blog-standard" },
      { id: 3, title: "Blog Grid", link: "/blog-grid" },
      { id: 4, title: "Blog Details", link: "/blog-details" },
    ],
  },
  {
    id: 4,
    title: "About Us",
    link: "/about",
    hasChildren: false,
  },
  {
    id: 5,
    title: "Contact",
    link: "/contact",
    hasChildren: false,
  },
];

export const ctaButton = {
  text: "Let's Talk",
  link: "/contact",
};
