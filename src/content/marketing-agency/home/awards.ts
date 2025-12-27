import { TypeAwardsSectionProps } from "@/types/marketing-agency/awards";

import AWARD_1_IMG from '@/assets/images/awards/awards-mar-1.png';
import AWARD_2_IMG from '@/assets/images/awards/awards-mar-2.png';
import AWARD_3_IMG from '@/assets/images/awards/awards-mar-3.png';
import AWARD_4_IMG from '@/assets/images/awards/awards-mar-4.png';
import AWARD_5_IMG from '@/assets/images/awards/awards-mar-5.png';
import AWARD_6_IMG from '@/assets/images/awards/awards-mar-6.png';

export const CONSTANT_AWARDS_DATA: TypeAwardsSectionProps = {
  header: {
    subTitle: "CERTIFICACIONES & RECONOCIMIENTOS",
    title: "Nuestros Logros",
  },
  awards: [
    {
      id: 1,
      year: 2023,
      title: "Proveedor Autorizado FUNDAE",
      imageSrc: AWARD_1_IMG,
      category: "FUNDAE",
      delay: 0,
    },
    {
      id: 2,
      year: 2023,
      title: "Excelencia en Formación Online",
      imageSrc: AWARD_2_IMG,
      category: "Ministerio de Educación",
      delay: 0.2,
    },
    {
      id: 3,
      year: 2022,
      title: "Mejor Plataforma eLearning",
      imageSrc: AWARD_3_IMG,
      category: "Asociación Española de eLearning",
      delay: 0.4,
    },
    {
      id: 4,
      year: 2021,
      title: "Servicio al Cliente Destacado",
      imageSrc: AWARD_4_IMG,
      category: "Cámara de Comercio",
      delay: 0.6,
    },
    {
      id: 5,
      year: 2020,
      title: "Innovación en Formación Empresarial",
      imageSrc: AWARD_5_IMG,
      category: "Foro de Formación Profesional",
      delay: 0.8,
    },
    {
      id: 6,
      year: 2020,
      title: "Empresa Referente en Formación",
      imageSrc: AWARD_6_IMG,
      category: "Confederación Empresarial",
      delay: 1.0,
    },
  ],
};