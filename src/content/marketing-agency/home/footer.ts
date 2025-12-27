// constants/footer.ts

import { TypeFooterProps } from "@/types/marketing-agency/footer";
import LOGO_LIGHT_IMG from "@/assets/images/logo-light.svg";

// SVG Path Data (Extracted from the HTML)

export const CONSTANT_FOOTER_DATA: TypeFooterProps = {
  contactInfo: {
    title: "Get in Touch",
    items: [
      { id: 1, label: "Email", value: "hello@unikon.com", icon: "MaiIcon" },
      { id: 2, label: "Phone", value: "+880 1234567891", icon: "PhoneIcon" },
      {
        id: 3,
        label: "Address",
        value: "1180 Pennsylvania Avenue, Michaelcester 7322",
        icon: "PinIcon",
      },
    ],
    socialLinks: [
      {
        id: 10,
        label: "Facebook",
        href: "#",
        iconClass: "fa-brands fa-facebook-f",
      },
      {
        id: 11,
        label: "Twitter",
        href: "#",
        iconClass: "fa-brands fa-x-twitter",
      },
      {
        id: 12,
        label: "Linkedin",
        href: "#",
        iconClass: "fa-brands fa-linkedin-in",
      },
      {
        id: 13,
        label: "Instagram",
        href: "#",
        iconClass: "fa-brands fa-instagram",
      },
      {
        id: 14,
        label: "Discord",
        href: "#",
        iconClass: "fa-brands fa-discord",
      },
      {
        id: 15,
        label: "Telegram",
        href: "#",
        iconClass: "fa-solid fa-paper-plane",
      },
    ],
  },
  form: {
    title: "Drop Us Texts",
    actionUrl: "/marketing-agency",
  },
  navigation: {
    logoSrc: LOGO_LIGHT_IMG,
    mainLinks: [
      { id: 20, label: "Home", href: "/marketing-agency" },
      { id: 21, label: "About Us", href: "/about" },
      { id: 22, label: "Portfolio", href: "/portfolio" },
      { id: 23, label: "Blog", href: "/portfolio-masonry" },
      { id: 24, label: "Services", href: "/service-grid" },
    ],
    utilityLinks: [
      { id: 30, label: "Privacy Policy", href: "#" },
      { id: 31, label: "Terms & Conditions", href: "#" },
    ],
    copyrightText: `Copyright ${new Date().getFullYear()} Unicon. Inc.`,
  },
};
