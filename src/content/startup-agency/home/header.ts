// Logo import
import logo from "@/assets/images/logo.svg";
import logoLight from "@/assets/images/logo-light.svg";

// Mega menu images imports
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

// Import types
import { HeaderContent } from "@/types/startup-agency/header";

export const headerContent: HeaderContent = {
  logo,
  navigation: [
    {
      title: "Home",
      isMegaMenu: true,
      megaMenuItems: [
        {
          id: 1,
          title: "Digital Agency",
          href: "/",
          image: megaMenuHome1,
        },
        {
          id: 2,
          title: "Marketing Agency",
          href: "/marketing-agency",
          image: megaMenuHome2,
        },
        {
          id: 3,
          title: "Startup Agency",
          href: "/startup-agency",
          image: megaMenuHome3,
          isActive: true,
        },
        {
          id: 4,
          title: "Consultant Agency",
          href: "/consultant-agency",
          image: megaMenuHome4,
        },
        {
          id: 5,
          title: "Legal Advisor",
          href: "/legal-advisor",
          image: megaMenuHome6,
        },
        {
          id: 6,
          title: "Architectural Agency",
          href: "/architectural-agency",
          image: megaMenuHome7,
        },
        {
          id: 7,
          title: "Healthcare",
          href: "/healthcare",
          image: megaMenuHome8,
        },
        {
          id: 8,
          title: "Financial Advisor",
          href: "/financial-advisor",
          image: megaMenuHome9,
        },
        {
          id: 9,
          title: "Fitness",
          href: "/fitness",
          image: megaMenuHome10,
        },
        {
          id: 10,
          title: "Showcase",
          href: "/showcase",
          image: megaMenuShowcase,
        },
      ],
    },
    {
      title: "Pages",
      hasSubmenu: true,
      submenu: [
        {
          title: "Service",
          hasSubmenu: true,
          submenu: [
            { title: "Service Default", href: "/service" },
            { title: "Service Grid", href: "/service-grid" },
            { title: "Service Details", href: "/service-details" },
          ],
        },
        {
          title: "Portfolio",
          hasSubmenu: true,
          submenu: [
            { title: "Portfolio Default", href: "/portfolio" },
            { title: "Portfolio Masonry", href: "/portfolio-masonry" },
            { title: "Portfolio Details", href: "/portfolio-details" },
          ],
        },
        {
          title: "Team",
          hasSubmenu: true,
          submenu: [
            { title: "Team", href: "/team" },
            { title: "Team Details", href: "/team-details" },
          ],
        },
        { title: "FAQ", href: "/faq" },
        { title: "Error 404", href: "/404" },
      ],
    },
    {
      title: "Blog",
      hasSubmenu: true,
      submenu: [
        { title: "Blog Default", href: "/blog" },
        { title: "Blog Standard", href: "/blog-standard" },
        { title: "Blog Grid", href: "/blog-grid" },
        { title: "Blog Details", href: "/blog-details" },
      ],
    },
    {
      title: "About Us",
      href: "/about",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ],
  sidebarData: {
    logo: logoLight,
    closeIcon: "bi bi-x-lg",
    description:
      "Discover, Explore & Understanding The Product Description Maecenas ullamcorper eros libero, facilities tempore mi darius vel. Sed ut felid ligula. Pellentesque.",
    contacts: [
      {
        id: 1,
        title: "Contact Us 24/7",
        value: "+55 (9900) 666 22",
        href: "tel:+55990066622",
        icon: "bi bi-telephone",
      },
      {
        id: 2,
        title: "Contact Mail",
        value: "info.unikon@demo.com",
        href: "mailto:info.unikon@demo.com",
        icon: "bi bi-envelope",
      },
      {
        id: 3,
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
  contactButton: {
    text: "Contact Us",
    href: "/contact",
  },
};
