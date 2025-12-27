import { TypeCaseStudy } from '@/types/marketing-agency/case-study';
import caseStudyMar1 from '@/assets/images/case-studies/case-study-mar-1.png';
import caseStudyMar2 from '@/assets/images/case-studies/case-study-mar-2.png';
import caseStudyMar3 from '@/assets/images/case-studies/case-study-mar-3.png';

export const CONSTANT_CASE_STUDIES: TypeCaseStudy[] = [
  {
    id: 1,
    imageSrc: caseStudyMar1,
    subTitle: "Estudio de caso",
    number: "01",
    title: "Formación bonificada para empresa industrial",
    description:
      "Empresa industrial con 150 empleados. Gestión completa del proceso FUNDAE para formación técnica y seguridad laboral.",
    link: "/estudio-caso/formacion-industrial",
  },
  {
    id: 2,
    imageSrc: caseStudyMar2,
    subTitle: "Estudio de caso",
    number: "02",
    title: "Transformación digital del proceso formativo",
    description:
      "Multinacional de servicios implementó nuestra plataforma eLearning para formación continua de su equipo.",
    link: "/estudio-caso/transformation-digital",
  },
  {
    id: 3,
    imageSrc: caseStudyMar3,
    subTitle: "Estudio de caso",
    number: "03",
    title: "Formación personalizada por departamentos",
    description:
      "Empresa de logística con diferentes perfiles profesionales. Diseño de planes formativos específicos por área.",
    link: "/estudio-caso/formacion-personalizada",
  },
];