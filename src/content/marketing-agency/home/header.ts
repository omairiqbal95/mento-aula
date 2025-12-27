import logo from '@/assets/images/logo.svg';
import { HeaderContent } from '@/types/marketing-agency/header';

export const headerContent: HeaderContent = {
  logo: {
    src: logo,
    alt: "Mentoaula Logo",
    href: "/"
  },
  navigation: [
    {
      id: "home",
      title: "Inicio",
      href: "/inicio"
    },
    {
      id: "services",
      title: "Servicios",
      sections: [
        {
          id: "formation-section",
          title: "Formación",
          items: [
            { id: "bonificada", title: "Formación Bonificada FUNDAE", href: "/formacion-bonificada" },
            { id: "online", title: "Formación 100% Online", href: "/formacion-online" },
            { id: "personalizada", title: "Formación Personalizada", href: "/formacion-personalizada" }
          ]
        },
        {
          id: "solutions-section",
          title: "Soluciones",
          items: [
            { id: "catalogo", title: "Catálogo de Cursos", href: "/catalogo-cursos" },
            { id: "elearning", title: "Plataforma eLearning", href: "/plataforma-elearning" },
            { id: "asesoria", title: "Gestión FUNDAE", href: "/gestion-fundae" }
          ]
        }
      ]
    },
    {
      id: "courses",
      title: "Cursos",
      sections: [
        {
          id: "areas-section",
          title: "Áreas Formativas",
          items: [
            { id: "digital", title: "Competencias Digitales", href: "/cursos/competencias-digitales" },
            { id: "gestion", title: "Gestión Empresarial", href: "/cursos/gestion-empresarial" },
            { id: "comercial", title: "Comercial y Ventas", href: "/cursos/comercial-ventas" },
            { id: "atencion-cliente", title: "Atención al Cliente", href: "/cursos/atencion-cliente" },
            { id: "calidad", title: "Calidad y Procesos", href: "/cursos/calidad-procesos" },
            { id: "prevencion", title: "Prevención y Normativa", href: "/cursos/prevencion" },
            { id: "idiomas", title: "Idiomas para Empresas", href: "/cursos/idiomas" }
          ]
        }
      ]
    },
    {
      id: "platform",
      title: "Plataforma",
      href: "/campus-mentoaula"
    },
    {
      id: "about-us",
      title: "Sobre Nosotros",
      href: "/sobre-mentoaula"
    },
    {
      id: "contact",
      title: "Contacto",
      href: "/contacto"
    }
  ],
  contactButton: {
    text: "Solicitar Información",
    href: "/contacto",
    className: "common-btn square-btn"
  },
  currentYear: new Date().getFullYear()
};