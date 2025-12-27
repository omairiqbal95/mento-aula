import postWidget1 from "@/assets/images/widget/post-widget-1.png";
import postWidget2 from "@/assets/images/widget/post-widget-2.png";
import postWidget3 from "@/assets/images/widget/post-widget-3.png";
import blogGallery1 from "@/assets/images/gallery/blog-gallery-1.png";
import blogGallery2 from "@/assets/images/gallery/blog-gallery-2.png";
import blogGallery3 from "@/assets/images/gallery/blog-gallery-3.png";
import blogGallery4 from "@/assets/images/gallery/blog-gallery-4.png";
import blogGallery5 from "@/assets/images/gallery/blog-gallery-5.png";
import blogGallery6 from "@/assets/images/gallery/blog-gallery-6.png";
import blogGallery7 from "@/assets/images/gallery/blog-gallery-7.png";
import blogGallery8 from "@/assets/images/gallery/blog-gallery-8.png";
import blogGallery9 from "@/assets/images/gallery/blog-gallery-9.png";
import blogMainThumb from "@/assets/images/blog-details/blocg-main-thumb.png";
import innerBlock1 from "@/assets/images/blog-details/inner-block-1.png";
import innerBlock2 from "@/assets/images/blog-details/inner-block-2.png";
import avatar1 from "@/assets/images/blog-details/avatar-1.png";
import avatar2 from "@/assets/images/blog-details/avatar-2.png";
import avatar3 from "@/assets/images/blog-details/avatar-3.png";
import { StaticImageData } from "next/image";

export interface Category {
  id: number;
  name: string;
  href: string;
}

export interface RecentPost {
  id: number;
  title: string;
  href: string;
  image: StaticImageData;
  date: string;
}

export interface Tag {
  id: number;
  name: string;
  href: string;
}

export interface GalleryItem {
  id: number;
  image: StaticImageData;
  alt: string;
}

export interface Comment {
  id: number;
  author: string;
  avatar: StaticImageData;
  content: string;
  date: string;
  isNested?: boolean;
}

export interface BlogArticle {
  mainImage: StaticImageData;
  author: string;
  authorLink: string;
  category: string;
  categoryLink: string;
  date: string;
  comments: string;
  commentsLink: string;
  content: {
    intro: string[];
    storyBehind: {
      title: string;
      paragraphs: string[];
    };
    blockquote: string;
    middleContent: string;
    innerImages: {
      image: StaticImageData;
      caption: string;
    }[];
    openToFeedback: {
      title: string;
      paragraphs: string[];
    };
    finalThoughts: {
      title: string;
      paragraphs: string[];
    };
  };
  authorInfo: {
    avatar: StaticImageData;
    name: string;
    label: string;
    socialLinks: {
      facebook: string;
      twitter: string;
      linkedin: string;
      instagram: string;
    };
  };
  commentsList: Comment[];
}

export const categories = {
  title: "Categorías",
  categories: [
    { id: 1, name: "Formación Bonificada", href: "/categorias/formacion-bonificada" },
    { id: 2, name: "eLearning", href: "/categorias/elearning" },
    { id: 3, name: "FUNDAE", href: "/categorias/fundae" },
    { id: 4, name: "Gestión Formativa", href: "/categorias/gestion-formativa" },
    { id: 5, name: "Desarrollo Profesional", href: "/categorias/desarrollo-profesional" },
    { id: 6, name: "Cursos Empresariales", href: "/categorias/cursos-empresariales" },
    { id: 7, name: "Otros", href: "/categorias/otros" },
  ],
};

export const recentPosts = {
  title: "Artículos Recientes",
  posts: [
    {
      id: 1,
      title: "Cómo aprovechar al máximo la formación bonificada",
      href: "/blog/aprovechar-formacion-bonificada",
      image: postWidget1,
      date: "26 June, 2024",
    },
    {
      id: 2,
      title: "Beneficios de la formación online para empresas",
      href: "/blog/beneficios-formacion-online-empresas",
      image: postWidget2,
      date: "26 June, 2024",
    },
    {
      id: 3,
      title: "Guía completa para la gestión FUNDAE",
      href: "/blog/guia-completa-gestion-fundae",
      image: postWidget3,
      date: "25 June, 2024",
    },
  ],
};

export const tags = {
  title: "Etiquetas",
  tags: [
    { id: 1, name: "formación bonificada", href: "/etiquetas/formacion-bonificada" },
    { id: 2, name: "elearning", href: "/etiquetas/elearning" },
    { id: 3, name: "FUNDAE", href: "/etiquetas/fundae" },
    { id: 4, name: "desarrollo profesional", href: "/etiquetas/desarrollo-profesional" },
    { id: 5, name: "cursos online", href: "/etiquetas/cursos-online" },
    { id: 6, name: "gestión formativa", href: "/etiquetas/gestion-formativa" },
    { id: 7, name: "formación empresarial", href: "/etiquetas/formacion-empresarial" },
    { id: 8, name: "capacitación", href: "/etiquetas/capacitacion" },
    { id: 9, name: "RRHH", href: "/etiquetas/rrhh" },
  ],
};

export const newsletter = {
  title: "Boletín",
  placeholder: "Introduce tu dirección de correo",
  buttonText: "Suscribirse",
};

export const gallery = {
  title: "Galería",
  galleryItems: [
    { id: 1, image: blogGallery1, alt: "blog-gallery" },
    { id: 2, image: blogGallery2, alt: "blog-gallery" },
    { id: 3, image: blogGallery3, alt: "blog-gallery" },
    { id: 4, image: blogGallery4, alt: "blog-gallery" },
    { id: 5, image: blogGallery5, alt: "blog-gallery" },
    { id: 6, image: blogGallery6, alt: "blog-gallery" },
    { id: 7, image: blogGallery7, alt: "blog-gallery" },
    { id: 8, image: blogGallery8, alt: "blog-gallery" },
    { id: 9, image: blogGallery9, alt: "blog-gallery" },
  ],
};

export const blogArticle: BlogArticle = {
  mainImage: blogMainThumb,
  author: "Mentoaula Team",
  authorLink: "/equipo/mentoaula-team",
  category: "Formación Empresarial",
  categoryLink: "/categorias/formacion-empresarial",
  date: "January 25, 2024",
  comments: "Sin Comentarios",
  commentsLink: "#",
  content: {
    intro: [
      "En 2022, la formación bonificada FUNDAE se convirtió en una herramienta fundamental para las empresas que buscan mejorar las competencias de sus trabajadores. La formación bonificada permite a las empresas formar a sus empleados y restar el coste de la formación de los seguros sociales, aprovechando el crédito anual disponible. En Mentoaula gestionamos todo el proceso de principio a fin, asegurando el cumplimiento normativo y una gestión clara, ordenada y segura.",
      "Consequat mauris nunc congue nisi vitae suscipit tellus. Quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus. Mauris ultrices eros in cursus turpis massa tincidunt. Integer quis auctor elit sed vulputate mi sit amet. Quis varius quam quisque id diam vel quam. Ultrices sagittis orci a scelerisque purus semper eget duis pros. Accumsan tortor posuere ac ut consequat semper viverra nam libero. Malesuada fames ac turpis egestas integer. Eget arcu dictum varius duis. Faucibus nisl tincidunt eget nullam non nisi est. Duis ut diam quam nulla porttitor massa. Iaculis eu non diam phasellus vestibulum. Imperdiet dui accumsan sit amet nulla facilisi morbi.",
    ],
    storyBehind: {
      title: "La historia detrás de la formación bonificada",
      paragraphs: [
        "Quodsi integer eget aliquet nibh praesent tristique magna sit. Porttitor lacus luctus accumsan tortor posuere ac ut consequat semper. Convallis aenean et tortor at risus viverra adipiscing at. Eu lobortis elementum nibh tellus molestie nunc non blandit massa. Diam phasellus vestibulum lorem sed risus ultricies tristique nulla. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin gravida. Netus et malesuada fames ac turpis egestas maecenas.",
        "Ultrices sagittis orci a scelerisque purus semper eget duis. Accumsan tortor posuere ac ut consequat semper viverra nam libero. Malesuada fames ac turpis egestas integer. Eget arcu dictum varius duis. Faucibus nisl tincidunt eget nullam non nisi est. Duis ut diam quam nulla porttitor massa. Iaculis eu non diam phasellus vestibulum.",
      ],
    },
    blockquote:
      "La formación bonificada es una oportunidad para mejorar el rendimiento y la competitividad de tu equipo sin coste para la empresa.",
    middleContent:
      "Appetere mauris nunc congue nisi vitae suscipit tellus. Quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus. Mauris ultrices eros in cursus turpis massa tincidunt. Integer quis auctor elit sed vulputate mi sit amet. Quis varius quam quisque id diam vel quam. Ultrices sagittis orci a scelerisque purus semper eget duis. Accumsan tortor posuere ac ut consequat semper viverra nam libero. Malesuada fames ac turpis egestas integer. Eget arcu dictum varius duis. Faucibus nisl tincidunt eget nullam non nisi est. Duis ut diam quam nulla porttitor massa.",
    innerImages: [
      {
        image: innerBlock1,
        caption: "Formación 100% online y flexible",
      },
      {
        image: innerBlock2,
        caption: "Gestión integral del proceso formativo",
      },
    ],
    openToFeedback: {
      title: "Abiertos a feedback",
      paragraphs: [
        "Egestas integer eget aliquet nibh praesent tristique magna sit. Porttitor lacus luctus accumsan tortor posuere ac ut consequat semper. Convallis aenean et tortor at risus viverra adipiscing at. Eu lobortis elementum nibh tellus molestie nunc non blandit massa. Diam phasellus vestibulum lorem sed risus ultricies tristique nulla. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin gravida. Netus et malesuada fames ac turpis egestas maecenas pharetra convallis. Sed lectus vestibulum mattis ullamcorpe velit sed ullamcorpe morbi.",
        "Appetere mauris nunc congue nisi vitae suscipit tellus. Quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus. Mauris ultrices eros in cursus turpis massa tincidunt. Integer quis auctor elit sed vulputate mi sit amet. Quis varius quam quisque id dia quam.",
      ],
    },
    finalThoughts: {
      title: "Reflexiones finales",
      paragraphs: [
        "Quodsi integer eget aliquet nibh praesent tristique magna sit. Porttitor lacus luctus accumsan tortor posuere ac ut consequat semper. Convallis aenean et tortor at risus viverra adipiscing at. Eu lobortis elementum nibh tellus molestie nunc non blandit massa. Diam phasellus vestibulum lorem sed risus ultricies tristique nulla. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin gravida. Netus et malesuada fames ac turpis egestas maecenas.",
        "Ultrices sagittis orci a scelerisque purus semper eget duis. Accumsan tortor posuere ac ut consequat semper viverra nam libero. Malesuada fames ac turpis egestas integer. Eget arcu dictum varius duis. Faucibus nisl tincidunt eget nullam non nisi est. Duis ut diam quam nulla porttitor massa. Iaculis eu non diam phasellus vestibulum.",
      ],
    },
  },
  authorInfo: {
    avatar: avatar1,
    name: "Equipo Mentoaula",
    label: "Escrito por",
    socialLinks: {
      facebook: "https://www.facebook.com/profile.php?id=100010522573686",
      twitter: "https://twitter.com/ahmed_sardar1?lang=es",
      linkedin: "https://www.linkedin.com/in/ahmedsardar?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      instagram: "https://www.instagram.com/ahmedsardar9/profilecard/?igsh=ZHAzbGRvZzJwdDA0",
    },
  },
  commentsList: [
    {
      id: 1,
      author: "Carlos Rodríguez",
      avatar: avatar2,
      content:
        "Ultrices sagittis orci a scelerisque purus semper eget duis. Accumsan tortor posuere ac ut consequat semper viverra nam libero. Malesuada fames ac turpis egestas integer. Eget arcu dictum varius duis. Faucibus nisl tincidunt eget nullam non nisi est. Duis ut diam quam nulla porttitor massa. Iaculis eu non diam phasellus vestibulum.",
      date: "25 June, 2024",
      isNested: false,
    },
    {
      id: 2,
      author: "María González",
      avatar: avatar3,
      content:
        "Ultrices sagittis orci a scelerisque purus semper eget duis. Accumsan tortor posuere ac ut consequat semper viverra nam libero. Malesuada fames ac turpis egestas integer. Eget arcu dictum varius duis.",
      date: "25 June, 2024",
      isNested: true,
    },
  ],
};