// Import blog images
import blog1 from "@/assets/images/blog/blog-1.png";
import blog2 from "@/assets/images/blog/blog-2.png";
import blog3 from "@/assets/images/blog/blog-3.png";
import blog4 from "@/assets/images/blog/blog-4.png";
import blog5 from "@/assets/images/blog/blog-5.png";
import blog6 from "@/assets/images/blog/blog-6.png";
import { BlogClassicContent } from "@/types/inner-pages/blog-classic";
import { blogSidebar } from "@/content/common/blog-sidebar";

const currentYear = new Date().getFullYear();

export const blogClassicContent: BlogClassicContent = {
  blogItems: [
    {
      id: 1,
      image: blog1,
      meta: {
        date: "24 June, " + currentYear,
        comments: 3
      },
      title: "Cómo aprovechar al máximo la formación bonificada FUNDAE",
      href: "/blog/aprovechar-formacion-bonificada-fundae",
      description: "Descubre estrategias para maximizar el crédito formativo de tu empresa y elegir las formaciones más adecuadas para mejorar el rendimiento del equipo."
    },
    {
      id: 2,
      image: blog2,
      meta: {
        date: "21 June, " + currentYear,
        comments: 3
      },
      title: "Beneficios de la formación online para empresas",
      href: "/blog/beneficios-formacion-online-empresas",
      description: "Explora cómo la formación 100% online puede mejorar la productividad y flexibilidad del proceso formativo en tu organización."
    },
    {
      id: 3,
      image: blog3,
      meta: {
        date: "23 June, " + currentYear,
        comments: 3
      },
      title: "Casos de éxito: Cómo transformamos la formación en una empresa industrial",
      href: "/blog/casos-exito-transformacion-formacion",
      description: "Detallamos un proyecto exitoso de implementación de formación bonificada, incluyendo desafíos, soluciones y resultados obtenidos."
    },
    {
      id: 4,
      image: blog4,
      meta: {
        date: "20 June, " + currentYear,
        comments: 5
      },
      title: "Gestión de la formación bonificada: Guía completa para RRHH",
      href: "/blog/gestion-formacion-bonificada-rrhh",
      description: "Todo lo que los departamentos de recursos humanos necesitan saber sobre la gestión de la formación bonificada FUNDAE."
    },
    {
      id: 5,
      image: blog5,
      meta: {
        date: "18 June, " + currentYear,
        comments: 2
      },
      title: "Formación personalizada: Adapta la capacitación a tus necesidades",
      href: "/blog/formacion-personalizada-adaptacion",
      description: "Cómo diseñar programas formativos específicos según las necesidades del sector, perfiles profesionales y objetivos de la empresa."
    },
    {
      id: 6,
      image: blog6,
      meta: {
        date: "15 June, " + currentYear,
        comments: 4
      },
      title: "Tendencias en formación corporativa para el futuro",
      href: "/blog/tendencias-formacion-corporativa-futuro",
      description: "Exploramos las nuevas tendencias en formación empresarial y tecnologías que están transformando la capacitación profesional."
    }
  ],
  sidebar: blogSidebar,
  pagination: [
    { id: "1", label: "1", href: "/blog?page=1", type: "page", isActive: true },
    { id: "2", label: "2", href: "/blog?page=2", type: "page" },
    { id: "3", label: "3", href: "/blog?page=3", type: "page" },
    { id: "arrow", label: "", href: "/blog?page=2", type: "page" }
  ]
};