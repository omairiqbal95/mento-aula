import logoImage from "@/assets/images/logo.svg";
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
        { title: "Inicio", href: "/" },
      ],
    },
    {
      id: "services",
      title: "Servicios",
      items: [
        { title: "Formación Bonificada", href: "/formacion-bonificada" },
        { title: "Plataforma eLearning", href: "/plataforma-elearning" },
        { title: "Gestión FUNDAE", href: "/gestion-fundae" },
        { title: "Consultoría Formativa", href: "/consultoria" },
      ],
    },
    {
      id: "courses",
      title: "Cursos",
      items: [
        { title: "Catálogo de Cursos", href: "/catalogo-cursos" },
        { title: "Formación Personalizada", href: "/formacion-personalizada" },
        { title: "Formación Online", href: "/formacion-online" },
        { title: "Competencias Digitales", href: "/cursos/competencias-digitales" },
        { title: "Gestión Empresarial", href: "/cursos/gestion-empresarial" },
        { title: "Comercial y Ventas", href: "/cursos/comercial-ventas" },
        { title: "Atención al Cliente", href: "/cursos/atencion-cliente" },
        { title: "Calidad y Procesos", href: "/cursos/calidad-procesos" },
        { title: "Prevención y Normativa", href: "/cursos/prevencion" },
        { title: "Idiomas para Empresas", href: "/cursos/idiomas" },
      ],
    },
    {
      id: "platform",
      title: "Plataforma",
      items: [
        { title: "Campus Mentoaula", href: "/plataforma-elearning" },
        { title: "Tutorización", href: "/tutorizacion" },
        { title: "Evaluación", href: "/evaluacion" },
        { title: "Seguimiento", href: "/seguimiento" },
      ],
    },
    {
      id: "about",
      title: "Sobre Nosotros",
      items: [
        { title: "Sobre Nosotros", href: "/sobre-mentoaula" },
        { title: "Cómo Trabajamos", href: "/como-trabajamos" },
        { title: "Casos de Éxito", href: "/estudios-caso" },
      ],
    },
    {
      id: "contact",
      title: "Contacto",
      items: [
        { title: "Contacto", href: "/contacto" },
        { title: "FAQ", href: "/faq" },
      ],
    },
  ],
  directNavItems: [],
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