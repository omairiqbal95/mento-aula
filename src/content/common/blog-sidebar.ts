import { BlogSidebar } from "@/types/common/blog-sidebar";

// Import widget images
import postWidget1 from "@/assets/images/widget/post-widget-1.png";
import postWidget2 from "@/assets/images/widget/post-widget-2.png";
import postWidget3 from "@/assets/images/widget/post-widget-3.png";

// Import gallery images
import blogGallery1 from "@/assets/images/gallery/blog-gallery-1.png";
import blogGallery2 from "@/assets/images/gallery/blog-gallery-2.png";
import blogGallery3 from "@/assets/images/gallery/blog-gallery-3.png";
import blogGallery4 from "@/assets/images/gallery/blog-gallery-4.png";
import blogGallery5 from "@/assets/images/gallery/blog-gallery-5.png";
import blogGallery6 from "@/assets/images/gallery/blog-gallery-6.png";
import blogGallery7 from "@/assets/images/gallery/blog-gallery-7.png";
import blogGallery8 from "@/assets/images/gallery/blog-gallery-8.png";
import blogGallery9 from "@/assets/images/gallery/blog-gallery-9.png";

const currentYear = new Date().getFullYear();

export const blogSidebar: BlogSidebar = {
  search: {
    title: "Buscar",
    placeholder: "Buscar aquí"
  },
  categories: {
    title: "Categorías",
    items: [
      { id: 1, name: "Formación Bonificada", count: 12, href: "/categorias/formacion-bonificada" },
      { id: 2, name: "eLearning", count: 8, href: "/categorias/elearning" },
      { id: 3, name: "FUNDAE", count: 15, href: "/categorias/fundae" },
      { id: 4, name: "Gestión Formativa", count: 6, href: "/categorias/gestion-formativa" },
      { id: 5, name: "Desarrollo Profesional", count: 10, href: "/categorias/desarrollo-profesional" },
      { id: 6, name: "Otros", count: 4, href: "/categorias/otros" }
    ]
  },
  recentPosts: {
    title: "Artículos Recientes",
    items: [
      {
        id: 1,
        image: postWidget1,
        alt: "post",
        title: "Cómo aprovechar al máximo la formación bonificada FUNDAE",
        href: "/blog/aprovechar-formacion-bonificada-fundae",
        date: "26 June, " + currentYear
      },
      {
        id: 2,
        image: postWidget2,
        alt: "post",
        title: "Beneficios de la formación online para empresas",
        href: "/blog/beneficios-formacion-online-empresas",
        date: "26 June, " + currentYear
      },
      {
        id: 3,
        image: postWidget3,
        alt: "post",
        title: "Guía completa para la gestión FUNDAE",
        href: "/blog/guia-completa-gestion-fundae",
        date: "25 June, " + currentYear
      }
    ]
  },
  tags: {
    title: "Etiquetas",
    items: [
      { id: 1, name: "formación bonificada", href: "/etiquetas/formacion-bonificada" },
      { id: 2, name: "elearning", href: "/etiquetas/elearning" },
      { id: 3, name: "FUNDAE", href: "/etiquetas/fundae" },
      { id: 4, name: "desarrollo profesional", href: "/etiquetas/desarrollo-profesional" },
      { id: 5, name: "cursos online", href: "/etiquetas/cursos-online" },
      { id: 6, name: "gestión formativa", href: "/etiquetas/gestion-formativa" },
      { id: 7, name: "formación empresarial", href: "/etiquetas/formacion-empresarial" },
      { id: 8, name: "capacitación", href: "/etiquetas/capacitacion" },
      { id: 9, name: "RRHH", href: "/etiquetas/rrhh" }
    ]
  },
  newsletter: {
    title: "Boletín",
    placeholder: "Introduce tu dirección de correo",
    buttonText: "Suscribirse"
  },
  gallery: {
    title: "Galería",
    items: [
      { id: 1, image: blogGallery1, alt: "blog-gallery", href: "/galeria/1" },
      { id: 2, image: blogGallery2, alt: "blog-gallery", href: "/galeria/2" },
      { id: 3, image: blogGallery3, alt: "blog-gallery", href: "/galeria/3" },
      { id: 4, image: blogGallery4, alt: "blog-gallery", href: "/galeria/4" },
      { id: 5, image: blogGallery5, alt: "blog-gallery", href: "/galeria/5" },
      { id: 6, image: blogGallery6, alt: "blog-gallery", href: "/galeria/6" },
      { id: 7, image: blogGallery7, alt: "blog-gallery", href: "/galeria/7" },
      { id: 8, image: blogGallery8, alt: "blog-gallery", href: "/galeria/8" },
      { id: 9, image: blogGallery9, alt: "blog-gallery", href: "/galeria/9" }
    ]
  }
};