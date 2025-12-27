import thunderIcon from "@/assets/images/icon/thunder.png";
import servicesFit1 from "@/assets/images/services/services-fit-1.png";
import servicesFit2 from "@/assets/images/services/services-fit-2.png";
import servicesFit3 from "@/assets/images/services/services-fit-3.png";
import servicesFit4 from "@/assets/images/services/services-fit-4.png";
import { ServicesContent } from "@/types/fitness/services";

export const servicesContent: ServicesContent = {
  sectionHeader: {
    icon: thunderIcon,
    subTitle: "Our Features",
    title: "See Our Service During Training Time"
  },
  ctaButton: {
    text: "START YOUR JOURNEY",
    href: "/contact",
    delay: ".6"
  },
  services: [
    {
      id: 1,
      image: servicesFit1,
      title: "Free food and drink during training",
      description: "You can determine which trainer you want during the fitness tutorial. As well as a trainer who is ready to guide you.",
      link: "/service-details",
      delay: ".2"
    },
    {
      id: 2,
      image: servicesFit2,
      title: "Free to choose fitness trainer",
      description: "You can determine which trainer you want during the fitness tutorial. As well as a trainer who is ready to guide you.",
      link: "/service-details",
      delay: ".4"
    },
    {
      id: 3,
      image: servicesFit3,
      title: "Fast service when you practice",
      description: "We have service with premium quality when you have subscribed with minimum duration of three months or above plans.",
      link: "/service-details",
      delay: ".6"
    },
    {
      id: 4,
      image: servicesFit4,
      title: "Cool and clean rest room",
      description: "We always pay attention to provide a best quality of comfort and clean room in order to make members fresh and comfortable.",
      link: "/service-details",
      delay: ".8"
    }
  ]
};
