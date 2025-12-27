import heroMarketing from '@/assets/images/hero/hero-marketing.png';
import brand1 from '@/assets/images/brand-slider/adobe.png';
import brand2 from '@/assets/images/brand-slider/notion.png';
import brand3 from '@/assets/images/brand-slider/hubspot.png';
import brand4 from '@/assets/images/brand-slider/github.png';
import brand5 from '@/assets/images/brand-slider/adobe.png';
import brand6 from '@/assets/images/brand-slider/notion.png';
import brand7 from '@/assets/images/brand-slider/hubspot.png';
import brand8 from '@/assets/images/brand-slider/github.png';
import { HeroContent } from '@/types/marketing-agency/hero';

export const heroContent: HeroContent = {
  title: {
    words: ["Formación online", "", "para empresas"]
  },
  description: "Ayudamos a las empresas a formar a sus trabajadores mediante formación bonificada FUNDAE, generando resultados tangibles y mejora en el rendimiento del equipo.",
  button: {
    text: "SOLICITAR INFORMACIÓN",
    href: "/contacto",
    className: "common-btn square-btn fade_up_anim"
  },
  brandSection: {
    title: "Empresas que confían en nosotros:",
    brands: [
      {
        id: "brand-1",
        name: "Empresa A",
        image: brand1,
        alt: "Empresa A"
      },
      {
        id: "brand-2", 
        name: "Empresa B",
        image: brand2,
        alt: "Empresa B"
      },
      {
        id: "brand-3",
        name: "Empresa C", 
        image: brand3,
        alt: "Empresa C"
      },
      {
        id: "brand-4",
        name: "Empresa D",
        image: brand4,
        alt: "Empresa D"
      },
      {
        id: "brand-5",
        name: "Empresa E",
        image: brand5,
        alt: "Empresa E"
      },
      {
        id: "brand-6",
        name: "Empresa F",
        image: brand6,
        alt: "Empresa F"
      },
      {
        id: "brand-7",
        name: "Empresa G",
        image: brand7,
        alt: "Empresa G"
      },
      {
        id: "brand-8",
        name: "Empresa H",
        image: brand8,
        alt: "Empresa H"
      }
    ]
  },
  heroImage: {
    src: heroMarketing,
    alt: "Formación Online para Empresas"
  },
  videoSection: {
    circularText: "ver video",
    videoId: "dQw4w9WgXcQ", // Reemplaza con un video relevante de tu plataforma
    className: "popup-youtube"
  }
};