import { TypeBlogSectionProps } from "@/types/marketing-agency/blogs";

import BLOG_1_IMG from "@/assets/images/blog/blog-mar-1.png";
import BLOG_2_IMG from "@/assets/images/blog/blog-mar-2.png";
import BLOG_3_IMG from "@/assets/images/blog/blog-mar-3.png";

export const CONSTANT_BLOG_DATA: TypeBlogSectionProps = {
  header: {
    subTitle: "ÚLTIMOS ARTÍCULOS",
    title: "Descubre artículos e insights sobre formación",
    viewAllLink: "/blog",
  },
  posts: [
    {
      id: 1,
      date: "04 06 2024",
      category: "Formación Empresarial",
      title: "Cómo aprovechar al máximo la formación bonificada FUNDAE",
      link: "/blog/como-aprovechar-formacion-bonificada-fundae",
      imageSrc: BLOG_1_IMG,
      delay: 0.2,
    },
    {
      id: 2,
      date: "31 05 2024",
      category: "eLearning",
      title: "Beneficios de la formación online para empresas",
      link: "/blog/beneficios-formacion-online-empresas",
      imageSrc: BLOG_2_IMG,
      delay: 0.4,
    },
    {
      id: 3,
      date: "01 06 2024",
      category: "Gestión FUNDAE",
      title: "Guía completa para gestionar la formación bonificada",
      link: "/blog/guia-completa-gestion-formacion-bonificada",
      imageSrc: BLOG_3_IMG,
      delay: 0.6,
    },
  ],
};