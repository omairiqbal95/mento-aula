import { StaticImageData } from "next/image";
import servicesDigital1 from "@/assets/images/services/services-digital-1.png";
import servicesDigital2 from "@/assets/images/services/services-digital-2.png";
import servicesDigital3 from "@/assets/images/services/services-digital-3.png";
import servicesDigital4 from "@/assets/images/services/services-digital-4.png";
import servicesDigital5 from "@/assets/images/services/services-digital-5.png";

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: StaticImageData;
  link: string;
  delay: string;
}

export interface ServicesData {
  sectionSubtitle: string;
  sectionTitle: string;
  viewAllLink: string;
  viewAllText: string;
  services: ServiceItem[];
}

export const servicesData: ServicesData = {
  sectionSubtitle: "services",
  sectionTitle: "Areas of expertise",
  viewAllLink: "/service-grid",
  viewAllText: "View All Services",
  services: [
    {
      id: "0",
      title: "Branding",
      description:
        "That's why we promise to deliver a solid brand that ensures company establishment within saturated markets.",
      image: servicesDigital1,
      link: "/service-details",
      delay: ".2",
    },
    {
      id: "1",
      title: "Product Design",
      description:
        "We create intuitive and engaging product designs that enhance user experience and drive business growth.",
      image: servicesDigital2,
      link: "/service-details",
      delay: ".4",
    },
    {
      id: "2",
      title: "Development",
      description:
        "Our development team builds robust, scalable solutions using cutting-edge technologies and best practices.",
      image: servicesDigital3,
      link: "/service-details",
      delay: ".8",
    },
    {
      id: "3",
      title: "Digital Marketing",
      description:
        "Comprehensive digital marketing strategies that increase your online presence and drive conversions.",
      image: servicesDigital4,
      link: "/service-details",
      delay: "1.2",
    },
    {
      id: "4",
      title: "Motion Graphics",
      description:
        "Creative motion graphics and animations that bring your brand to life and captivate your audience.",
      image: servicesDigital5,
      link: "/service-details",
      delay: "1.6",
    },
  ],
};
