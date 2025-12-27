import { TypeCaseStudy } from '@/types/marketing-agency/case-study';
import caseStudyMar1 from '@/assets/images/case-studies/case-study-mar-1.png';
import caseStudyMar2 from '@/assets/images/case-studies/case-study-mar-2.png';
import caseStudyMar3 from '@/assets/images/case-studies/case-study-mar-3.png';


export const CONSTANT_CASE_STUDIES: TypeCaseStudy[] = [
  {
    id: 1,
    imageSrc: caseStudyMar1,
    subTitle: "Case study",
    number: "01",
    title: "Data-Driven Success for JKL",
    description:
      "JKL Healthcare, a chain of healthcare clinics. Leverage data analytics to improve marketing strategies and ROI.",
    link: "/case-study/data-driven-success",
  },
  {
    id: 2,
    imageSrc: caseStudyMar2,
    subTitle: "Case study",
    number: "02",
    title: "Boosting brand awareness",
    description:
      "Increase brand awareness and website traffic through content marketing.",
    link: "/case-study/boosting-brand-awareness",

  },
  {
    id: 3,
    imageSrc: caseStudyMar3,
    subTitle: "Case study",
    number: "03",
    title: "Amplifying organic reach",
    description:
      "Created exclusive discount codes and affiliate links for influencers to share with their followers. Enhance brand reach.",
    link: "/case-study/amplifying-organic-reach",
    },
];