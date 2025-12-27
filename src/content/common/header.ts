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
      name: "Formación Bonificada",
      href: "/formacion-bonificada",
      image: MegaMenuHome1,
      isActive: true,
    },
    {
      name: "Plataforma eLearning",
      href: "/plataforma-elearning",
      image: MegaMenuHome2,
    },
    {
      name: "Catálogo de Cursos",
      href: "/catalogo-cursos",
      image: MegaMenuHome3,
    },
    {
      name: "Gestión FUNDAE",
      href: "/gestion-fundae",
      image: MegaMenuHome4,
    },
    {
      name: "Cursos Personalizados",
      href: "/formacion-personalizada",
      image: MegaMenuHome6,
    },
    {
      name: "Consultoría Formativa",
      href: "/consultoria",
      image: MegaMenuHome7,
    },
    {
      name: "Cómo Trabajamos",
      href: "/como-trabajamos",
      image: MegaMenuHome8,
    },
    {
      name: "Casos de Éxito",
      href: "/estudios-caso",
      image: MegaMenuHome9,
    },
    {
      name: "Sobre Nosotros",
      href: "/sobre-mentoaula",
      image: MegaMenuHome10,
    },
    {
      name: "Contacto",
      href: "/contacto",
      image: MegaMenuShowcase,
    },
  ],
  navigation: {
    services: [
      { name: "Formación Bonificada", href: "/formacion-bonificada" },
      { name: "Plataforma eLearning", href: "/plataforma-elearning" },
      { name: "Gestión FUNDAE", href: "/gestion-fundae" },
    ],
    portfolio: [
      { name: "Casos de Éxito", href: "/estudios-caso" },
      { name: "Clientes", href: "/clientes" },
    ],
    team: [
      { name: "Nuestro Equipo", href: "/equipo" },
      { name: "Detalles del Equipo", href: "/equipo/detalle" },
    ],
    blog: [
      { name: "Blog", href: "/blog" },
      { name: "Artículos", href: "/articulos" },
      { name: "Categorías", href: "/categorias" },
      { name: "Detalle del Artículo", href: "/blog/detalle" },
    ],
    directLinks: [
      { name: "Sobre Nosotros", href: "/sobre-mentoaula" },
      { name: "Contacto", href: "/contacto" },
      { name: "FAQ", href: "/faq" },
    ],
  },
  buttons: {
    letsTalk: "Solicitar Información",
    search: "Buscar",
  },
  sidebarData: {
    logo: Logo,
    closeIcon: "bi bi-x-lg",
    description:
      "Ayudamos a las empresas a formar a sus trabajadores mediante formación bonificada FUNDAE, generando resultados tangibles y mejora en el rendimiento del equipo. Ofrecemos formación 100% online con flexibilidad total y acompañamiento continuo.",
    contacts: [
      {
        id: "1",
        title: "Contacta con Nosotros",
        value: "+34 933 930 435",
        href: "tel:+34900123456",
        icon: "bi bi-telephone",
      },
      {
        id: "2",
        title: "Correo Electrónico",
        value: "info@mentoaula.com",
        href: "mailto:info@mentoaula.com",
        icon: "bi bi-envelope",
      },
      {
        id: "3",
        title: "Dirección",
        value: "Rda. de Sant Antoni, 8, Ciutat Vella, 08001 Barcelona, Spain",
        icon: "bi bi-geo-alt",
      },
    ],
    copyright: {
      brand: "@Mentoaula",
      text: ".Copyright © 2025",
    },
  },
};