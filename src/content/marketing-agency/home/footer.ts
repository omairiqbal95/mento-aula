// constants/footer.ts

import { TypeFooterProps } from "@/types/marketing-agency/footer";
import LOGO_LIGHT_IMG from "@/assets/images/logo.svg";

// SVG Path Data (Extracted from the HTML)

export const CONSTANT_FOOTER_DATA: TypeFooterProps = {
  contactInfo: {
    title: "Contacta con Nosotros",
    items: [
      { id: 1, label: "Email", value: "info@mentoaula.com", icon: "MaiIcon" },
      { id: 2, label: "Teléfono", value: "+34 933 930 435", icon: "PhoneIcon" },
      {
        id: 3,
        label: "Dirección",
        value: "Rda. de Sant Antoni, 8, Ciutat Vella, 08001 Barcelona, Spain",
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
    ],
  },
  form: {
    title: "Envíanos un Mensaje",
    actionUrl: "/",
  },
  navigation: {
    logoSrc: LOGO_LIGHT_IMG,
    mainLinks: [
      { id: 20, label: "Inicio", href: "/" },
      { id: 21, label: "Sobre Nosotros", href: "/sobre-mentoaula" },
      { id: 22, label: "Servicios", href: "/servicios" },
      { id: 23, label: "Cursos", href: "/catalogo-cursos" },
      { id: 24, label: "Plataforma", href: "/plataforma-elearning" },
    ],
    utilityLinks: [
      { id: 30, label: "Política de Privacidad", href: "#" },
      { id: 31, label: "Términos y Condiciones", href: "#" },
    ],
    copyrightText: `Copyright ${new Date().getFullYear()} Mentoaula, SL.`,
  },
};