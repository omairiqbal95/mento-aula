import logoImage from "@/assets/images/logo-light-large.svg";
import PhoneIconTwo from "@/icons/PhoneIconTwo";
import MailIconThree from "@/icons/MailIconThree";
import PinIconTwo from "@/icons/PinIconTwo";
import type { SidebarData } from "@/types/common/sidebar";

export const defaultSidebarData: SidebarData = {
  logo: {
    image: logoImage,
    alt: "Unikon",
    href: "/",
  },
  closeIcon: "bi bi-x-lg",
  menus: [
    {
      id: "home",
      title: "Home",
      items: [
        { title: "Digital Agency", href: "/digital-agency" },
        { title: "Marketing Agency", href: "/marketing-agency" },
        { title: "Startup Agency", href: "/startup-agency" },
        { title: "Consultant Agency", href: "/consultant-agency" },
        { title: "Legal Advisor", href: "/legal-advisor" },
        { title: "Architectural Agency", href: "/architectural-agency" },
        { title: "Healthcare", href: "/healthcare" },
        { title: "Financial Advisor", href: "/financial-advisor" },
        { title: "Fitness", href: "/fitness" },
        { title: "Showcase", href: "/showcase" },
      ],
    },
    {
      id: "services",
      title: "Services",
      items: [
        { title: "Service Default", href: "/service" },
        { title: "Service Grid", href: "/service-grid" },
        { title: "Service Details", href: "/service-details" },
      ],
    },
    {
      id: "pages",
      title: "Pages",
      subMenus: [
        {
          title: "Service",
          items: [
            { title: "Service Default", href: "/service" },
            { title: "Service Grid", href: "/service-grid" },
            { title: "Service Details", href: "/service-details" },
          ],
        },
        {
          title: "Portfolio",
          items: [
            { title: "Portfolio Default", href: "/portfolio" },
            { title: "Portfolio Masonry", href: "/portfolio-masonry" },
            { title: "Portfolio Details", href: "/portfolio-details" },
          ],
        },
        {
          title: "Team",
          items: [
            { title: "Team", href: "/team" },
            { title: "Team Details", href: "/team-details" },
          ],
        },
      ],
      additionalItems: [
        { title: "FAQ", href: "/faq" },
        { title: "Error 404", href: "/404" },
      ],
    },
  ],
  directNavItems: [
    { title: "About Us", href: "/about" },
    { title: "Contact", href: "/contact" },
  ],
  sidePanel: {
    description:
      "Discover, Explore & Understanding The Product Description Maecenas ullamcorper eros libero, facilities tempore mi darius vel. Sed ut felid ligula. Pellentesque.",
    contacts: [
      {
        icon: PhoneIconTwo,
        title: "Contact Us 24/7",
        value: "+55 (9900) 666 22",
        href: "tel:+55990066622",
      },
      {
        icon: MailIconThree,
        title: "Contact Mail",
        value: "info.unikon@demo.com",
        href: "mailto:info.unikon@demo.com",
      },
      {
        icon: PinIconTwo,
        title: "Contact Location",
        value: "18/2, Topkhana Road, Australia.",
        href: null,
      },
    ],
    copyright: {
      brand: "@Unikon",
      text: `.Copyright © ${new Date().getFullYear()}`,
    },
  },
};

export default defaultSidebarData;
