import logoImage from "@/assets/images/logo-light-large.svg";
import PhoneIconTwo from "@/icons/PhoneIconTwo";
import MailIconThree from "@/icons/MailIconThree";
import PinIconTwo from "@/icons/PinIconTwo";
import type { SidebarData } from "@/types/common/sidebar";

export const defaultSidebarData: SidebarData = {
  logo: {
    image: logoImage,
    alt: "Mentoaula",
    href: "/",
  },
  closeIcon: "bi bi-x-lg",
  menus: [
    {
      id: "home",
      title: "Inicio",
      items: [
        { title: "Formación Bonificada", href: "/formacion-bonificada" },
        { title: "Plataforma eLearning", href: "/plataforma-elearning" },
        { title: "Catálogo de Cursos", href: "/catalogo-cursos" },
        { title: "Gestión FUNDAE", href: "/gestion-fundae" },
        { title: "Cursos Personalizados", href: "/formacion-personalizada" },
        { title: "Consultoría Formativa", href: "/consultoria" },
        { title: "Cómo Trabajamos", href: "/como-trabajamos" },
        { title: "Casos de Éxito", href: "/estudios-caso" },
        { title: "Sobre Nosotros", href: "/sobre-mentoaula" },
        { title: "Contacto", href: "/contacto" },
      ],
    },
    {
      id: "services",
      title: "Servicios",
      items: [
        { title: "Formación Bonificada", href: "/formacion-bonificada" },
        { title: "Plataforma eLearning", href: "/plataforma-elearning" },
        { title: "Gestión FUNDAE", href: "/gestion-fundae" },
      ],
    },
    {
      id: "pages",
      title: "Páginas",
      subMenus: [
        {
          title: "Formación",
          items: [
            { title: "Catálogo de Cursos", href: "/catalogo-cursos" },
            { title: "Formación Personalizada", href: "/formacion-personalizada" },
            { title: "Formación Online", href: "/formacion-online" },
          ],
        },
        {
          title: "Plataforma",
          items: [
            { title: "Campus Mentoaula", href: "/plataforma-elearning" },
            { title: "Tutorización", href: "/tutorizacion" },
            { title: "Evaluación", href: "/evaluacion" },
          ],
        },
        {
          title: "Gestión FUNDAE",
          items: [
            { title: "Tramitación", href: "/tramitacion" },
            { title: "Justificación", href: "/justificacion" },
            { title: "Seguimiento", href: "/seguimiento" },
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
    { title: "Sobre Nosotros", href: "/sobre-mentoaula" },
    { title: "Contacto", href: "/contacto" },
  ],
  sidePanel: {
    description:
      "Ayudamos a las empresas a formar a sus trabajadores mediante formación bonificada FUNDAE, generando resultados tangibles y mejora en el rendimiento del equipo. Ofrecemos formación 100% online con flexibilidad total y acompañamiento continuo.",
    contacts: [
      {
        icon: PhoneIconTwo,
        title: "Contacta con Nosotros",
        value: "+34 933 930 435",
        href: "tel:+34933930435",
      },
      {
        icon: MailIconThree,
        title: "Correo Electrónico",
        value: "info@mentoaula.com",
        href: "mailto:info@mentoaula.com",
      },
      {
        icon: PinIconTwo,
        title: "Dirección",
        value: "Rda. de Sant Antoni, 8, Ciutat Vella, 08001 Barcelona, Spain",
        href: null,
      },
    ],
    copyright: {
      brand: "@Mentoaula ",
      text: `  .Copyright © ${new Date().getFullYear()}`,
    },
  },
};

export default defaultSidebarData;