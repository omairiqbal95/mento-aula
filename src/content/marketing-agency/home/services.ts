import { Services } from "@/types/marketing-agency/services";

import servicesMarThumb1 from "@/assets/images/services/services-mar-thumb-1.png";
import servicesMarThumb2 from "@/assets/images/services/services-mar-thumb-2.png";
import servicesMarThumb3 from "@/assets/images/services/services-mar-thumb-3.png";
import servicesMarThumb4 from "@/assets/images/services/services-mar-thumb-4.png";
import servicesMarThumb5 from "@/assets/images/services/services-mar-thumb-5.png";

export const CONSTANT_SERVICES: Services[] = [
  {
    id: 1,
    name: "Influencer Marketing",
    href: "/service-details",
    imageSrc: servicesMarThumb1,
    delay: 0,
  },
  {
    id: 2,
    name: "Content Marketing",
    href: "/service-details",
    imageSrc: servicesMarThumb2,
    delay: 0.2,
  },
  {
    id: 3,
    name: "Social Media Marketing",
    href: "/service-details",
    imageSrc: servicesMarThumb3,
    delay: 0.4,
  },
  {
    id: 4,
    name: "Analytics & Reporting",
    href: "/service-details",
    imageSrc: servicesMarThumb4,
    delay: 0.6,
  },
  {
    id: 5,
    name: "Lead Generation",
    href: "/service-details",
    imageSrc: servicesMarThumb5,
    delay: 0.8,
  },
];
