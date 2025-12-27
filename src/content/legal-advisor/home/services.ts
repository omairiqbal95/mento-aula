import servicesAccordion1 from "@/assets/images/services/services-la__accordion-1.png";
import servicesAccordion2 from "@/assets/images/services/services-la__accordion-2.png";
import servicesAccordion3 from "@/assets/images/services/services-la__accordion-3.png";
import servicesAccordion4 from "@/assets/images/services/services-la__accordion-4.png";
import servicesAccordion5 from "@/assets/images/services/services-la__accordion-5.png";
import servicesAccordion6 from "@/assets/images/services/services-la__accordion-6.png";
import { ServicesContent } from "@/types/legal-advisor/services";

export const servicesContent: ServicesContent = {
  sectionHeader: {
    subTitle: "SERVICES",
    title: "Our Legal Expertise",
    description: "From complex corporate issues to personal legal matters, our expertise spans across multiple disciplines to provide you with tailored, precise, and effective legal solutions."
  },
  services: [
    {
      id: 1,
      title: "Contract Review and Drafting",
      description: "Our expertise spans across multiple disciplines to provide you with tailored, precise, and effective legal solutions.",
      delay: "",
      isExpanded: true
    },
    {
      id: 2,
      title: "Legal Consultation",
      description: "Our expertise spans across multiple disciplines to provide you with tailored, precise, and effective legal solutions.",
      delay: ".2",
      isExpanded: false
    },
    {
      id: 3,
      title: "Real Estate Law",
      description: "Our expertise spans across multiple disciplines to provide you with tailored, precise, and effective legal solutions.",
      delay: ".4",
      isExpanded: false
    },
    {
      id: 4,
      title: "Tax Law",
      description: "Our expertise spans across multiple disciplines to provide you with tailored, precise, and effective legal solutions.",
      delay: ".6",
      isExpanded: false
    },
    {
      id: 5,
      title: "Corporate Law",
      description: "Our expertise spans across multiple disciplines to provide you with tailored, precise, and effective legal solutions.",
      delay: ".8",
      isExpanded: false
    },
    {
      id: 6,
      title: "Family Law",
      description: "Our expertise spans across multiple disciplines to provide you with tailored, precise, and effective legal solutions.",
      delay: "1",
      isExpanded: false
    }
  ],
  images: [
    {
      id: 1,
      image: servicesAccordion1,
      alt: "Contract Review and Drafting",
      isActive: true
    },
    {
      id: 2,
      image: servicesAccordion2,
      alt: "Legal Consultation",
      isActive: false
    },
    {
      id: 3,
      image: servicesAccordion3,
      alt: "Real Estate Law",
      isActive: false
    },
    {
      id: 4,
      image: servicesAccordion4,
      alt: "Tax Law",
      isActive: false
    },
    {
      id: 5,
      image: servicesAccordion5,
      alt: "Corporate Law",
      isActive: false
    },
    {
      id: 6,
      image: servicesAccordion6,
      alt: "Family Law",
      isActive: false
    }
  ]
};
