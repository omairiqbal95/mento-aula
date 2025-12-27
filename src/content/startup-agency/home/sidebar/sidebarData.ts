import logoImage from "@/assets/images/logo.svg";
import PhoneIconTwo from "@/icons/PhoneIconTwo";
import MailIconThree from "@/icons/MailIconThree";
import PinIconTwo from "@/icons/PinIconTwo";

export const sidebarData = {
  logo: {
    image: logoImage,
    alt: "Unikon Logo",
    href: "/"
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
        { title: "Showcase", href: "/showcase" }
      ]
    },
    {
      id: "services",
      title: "Services",
      subMenus: [
        {
          title: "Legal Services",
          items: [
            { title: "Corporate Law", href: "/services/corporate-law" },
            { title: "Family Law", href: "/services/family-law" },
            { title: "Criminal Defense", href: "/services/criminal-defense" }
          ]
        }
      ]
    },
    {
      id: "pages",
      title: "Pages",
      subMenus: [
        {
          title: "Company",
          items: [
            { title: "About Us", href: "/about" },
            { title: "Team", href: "/team" },
            { title: "FAQ", href: "/faq" }
          ]
        },
        {
          title: "Portfolio",
          items: [
            { title: "Portfolio", href: "/portfolio" },
            { title: "Portfolio Details", href: "/portfolio-details" }
          ]
        }
      ]
    }
  ],
  directNavItems: [
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" }
  ],
  additionalItems: [
    { name: "FAQ", href: "/faq" },
    { name: "Error 404", href: "/404" }
  ],
  sidePanel: {
    description: "Discover, Explore & Understanding The Product Description Maecenas ullamcorper eros libero, facilities tempore mi darius vel. Sed ut felid ligula. Pellentesque.",
    contacts: [
      {
        icon: PhoneIconTwo,
        title: "Contact Us 24/7",
        value: "+55 (9900) 666 22",
        href: "tel:+55990066622"
      },
      {
        icon: MailIconThree,
        title: "Contact Mail",
        value: "info.unikon@demo.com",
        href: "mailto:info.unikon@demo.com"
      },
      {
        icon: PinIconTwo,
        title: "Contact Location",
        value: "18/2, Topkhana Road, Australia.",
        href: null
      }
    ],
    copyright: {
      brand: "@Unikon",
      text: `.Copyright © ${new Date().getFullYear()}`
    }
  }
};

export default sidebarData;
