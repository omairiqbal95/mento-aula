export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  learnMoreLink: string;
  features: string[];
  isOpen?: boolean;
}

export interface ServiceSection {
  subTitle: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

export const serviceSectionData: ServiceSection = {
  subTitle: "What we offer",
  title: "Services",
  description:
    "We believe in putting you, the patient, at the center of everything we do. Our experienced team of healthcare professionals is committed to providing compassionate",
  ctaText: "Book Consultation",
  ctaLink: "/contact",
};

export const servicesData: ServiceItem[] = [
  {
    id: 1,
    title: "Primary Care",
    description:
      "Our state-of-the-art emergency department is equipped to handle all medical emergencies with speed and efficiency.",
    learnMoreLink: "/service-details",
    features: [
      "24/7 emergency care",
      "Rapid diagnostics and imaging",
      "Urgent medical treatment",
    ],
    isOpen: true,
  },
  {
    id: 2,
    title: "Specialized Medical Care",
    description:
      "Our state-of-the-art emergency department is equipped to handle all medical emergencies with speed and efficiency.",
    learnMoreLink: "/service-details",
    features: [
      "24/7 emergency care",
      "Rapid diagnostics and imaging",
      "Urgent medical treatment",
    ],
  },
  {
    id: 3,
    title: "Emergency Care",
    description:
      "Our state-of-the-art emergency department is equipped to handle all medical emergencies with speed and efficiency.",
    learnMoreLink: "/service-details",
    features: [
      "24/7 emergency care",
      "Rapid diagnostics and imaging",
      "Urgent medical treatment",
    ],
  },
  {
    id: 4,
    title: "Diagnostic",
    description:
      "Our state-of-the-art emergency department is equipped to handle all medical emergencies with speed and efficiency.",
    learnMoreLink: "/service-details",
    features: [
      "24/7 emergency care",
      "Rapid diagnostics and imaging",
      "Urgent medical treatment",
    ],
  },
  {
    id: 5,
    title: "Preventive Care",
    description:
      "Our state-of-the-art emergency department is equipped to handle all medical emergencies with speed and efficiency.",
    learnMoreLink: "/service-details",
    features: [
      "24/7 emergency care",
      "Rapid diagnostics and imaging",
      "Urgent medical treatment",
    ],
  },
  {
    id: 6,
    title: "Rehabilitation",
    description:
      "Our state-of-the-art emergency department is equipped to handle all medical emergencies with speed and efficiency.",
    learnMoreLink: "/service-details",
    features: [
      "24/7 emergency care",
      "Rapid diagnostics and imaging",
      "Urgent medical treatment",
    ],
  },
];
