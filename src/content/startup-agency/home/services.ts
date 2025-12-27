import { StaticImageData } from "next/image";

// Service icon imports
import serviceSa1 from "@/assets/images/icon/service-sa-1.png";
import serviceSa2 from "@/assets/images/icon/service-sa-2.png";
import serviceSa3 from "@/assets/images/icon/service-sa-3.png";
import serviceSa4 from "@/assets/images/icon/service-sa-4.png";

export interface ServiceItem {
  id: number;
  number: string;
  icon: StaticImageData;
  title: string;
  description: string;
}

export interface ServicesContent {
  section: {
    title: string;
    description: string;
  };
  items: ServiceItem[];
}

export const servicesContent: ServicesContent = {
  section: {
    title: "Our comprehensive services",
    description:
      "Dive into our latest innovations. Explore our recent projects and see how we're pushing the boundaries of what's possible for startups.",
  },
  items: [
    {
      id: 1,
      number: "001",
      icon: serviceSa1,
      title: "Brand Design",
      description:
        "Craft a brand identity that turns heads and resonates with your target audience.",
    },
    {
      id: 2,
      number: "002",
      icon: serviceSa2,
      title: "UI/UX Design",
      description:
        "Craft a brand identity that turns heads and resonates with your target audience.",
    },
    {
      id: 3,
      number: "003",
      icon: serviceSa3,
      title: "Web & App Development",
      description:
        "Development web and mobile applications that deliver good experiences.",
    },
    {
      id: 4,
      number: "004",
      icon: serviceSa4,
      title: "Product Development",
      description:
        "From concept to launch, we help you build products that solve real problems.",
    },
    {
      id: 5,
      number: "005",
      icon: serviceSa1,
      title: "Brand Design",
      description:
        "Craft a brand identity that turns heads and resonates with your target audience.",
    },
  ],
};
