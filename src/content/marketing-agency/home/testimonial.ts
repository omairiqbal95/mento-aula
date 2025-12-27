// constants/testimonials.ts

import { TypeTestimonial } from "@/types/marketing-agency/testimonial";

// Mock imports for local images
import AVATAR_1 from '@/assets/images/testimonial/author-avatar-1.png';
import AVATAR_2 from '@/assets/images/testimonial/author-avatar-2.png';
import AVATAR_3 from '@/assets/images/testimonial/author-avatar-3.png';
import AVATAR_4 from '@/assets/images/testimonial/author-avatar-4.png';
import AVATAR_5 from '@/assets/images/testimonial/avatar-2.png';
import BRAND_1 from '@/assets/images/brand-slider/testimonial-mar__brand-1.png';
import BRAND_2 from '@/assets/images/brand-slider/testimonial-mar__brand-2.png';

export const CONSTANT_TESTIMONIAL_HEADER = {
  subTitle: "TESTIMONIALES",
  title: "Lo que nuestros clientes dicen sobre nosotros",
  description:
    "Ayudamos a empresas a formar a sus trabajadores mediante formación bonificada FUNDAE, generando resultados tangibles y mejora en el rendimiento del equipo.",
};

export const CONSTANT_TESTIMONIALS: TypeTestimonial[] = [
  {
    id: 1,
    rating: 5,
    quote:
      "Trabajar con Mentoaula ha sido una experiencia fantástica. Su gestión integral del proceso FUNDAE nos permitió formar a nuestros empleados sin coste, mejorando significativamente sus competencias.",
    authorName: "MARÍA GONZÁLEZ",
    authorPosition: "DIRECTORA DE RECURSOS HUMANOS",
    authorAvatarSrc: AVATAR_2,
    brandLogoSrc: BRAND_1,
  },
  {
    id: 2,
    rating: 5,
    quote:
      "La formación online ha sido un éxito total para nuestra empresa. La plataforma es intuitiva y el acompañamiento del equipo de Mentoaula excelente. Altamente recomendable.",
    authorName: "CARLOS RODRÍGUEZ",
    authorPosition: "GERENTE DE OPERACIONES",
    authorAvatarSrc: AVATAR_1,
    brandLogoSrc: BRAND_2,
  },
  {
    id: 3,
    rating: 5,
    quote:
      "Desde la detección de necesidades hasta la justificación final, todo el proceso ha sido impecable. La formación ha estado perfectamente adaptada a nuestro sector y ha generado resultados reales.",
    authorName: "ANA MARTÍNEZ",
    authorPosition: "JEFA DE FORMACIÓN",
    authorAvatarSrc: AVATAR_5,
    brandLogoSrc: BRAND_2,
  },
  {
    id: 4,
    rating: 5,
    quote:
      "Una asociación verdaderamente colaborativa. Los resultados superaron nuestras expectativas, consiguiendo formación de calidad para nuestros empleados con la máxima flexibilidad.",
    authorName: "JAVIER LÓPEZ",
    authorPosition: "DIRECTOR GENERAL",
    authorAvatarSrc: AVATAR_4,
    brandLogoSrc: BRAND_1,
  },
];