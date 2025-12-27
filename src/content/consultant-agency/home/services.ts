import servicesSlider1 from "@/assets/images/services/services__slider-1.png";
import servicesSlider2 from "@/assets/images/services/services__slider-2.png";
import servicesSlider3 from "@/assets/images/services/services__slider-3.png";
import LeftArrow from "@/icons/LeftArrow";
import RightArrow from "@/icons/RightArrow";
import { ServicesContent } from "@/types/consultant-agency/services";

export const servicesContent: ServicesContent = {
  sectionHeader: {
    subTitle: "our Services",
    title: "Expertise for Your Success"
  },
  services: [
    {
      id: 1,
      title: "Technology Solution",
      description: "Whether you're looking to expand into new markets, optimize operations, or navigate complex challenges, our team of experienced consultants is here to guide you every step of the way.",
      image: servicesSlider1,
      alt: "Technology Solution",
      link: "/service-details"
    },
    {
      id: 2,
      title: "Strategic Consulting",
      description: "Whether you're looking to expand into new markets, optimize operations, or navigate complex challenges, our team of experienced consultants is here to guide you every step of the way.",
      image: servicesSlider2,
      alt: "Strategic Consulting",
      link: "/service-details"
    },
    {
      id: 3,
      title: "Financial Advisory",
      description: "Whether you're looking to expand into new markets, optimize operations, or navigate complex challenges, our team of experienced consultants is here to guide you every step of the way.",
      image: servicesSlider3,
      alt: "Financial Advisory",
      link: "/service-details"
    },
    {
      id: 4,
      title: "Business Development",
      description: "Whether you're looking to expand into new markets, optimize operations, or navigate complex challenges, our team of experienced consultants is here to guide you every step of the way.",
      image: servicesSlider1,
      alt: "Business Development",
      link: "/service-details"
    },
    {
      id: 5,
      title: "Digital Transformation",
      description: "Whether you're looking to expand into new markets, optimize operations, or navigate complex challenges, our team of experienced consultants is here to guide you every step of the way.",
      image: servicesSlider2,
      alt: "Digital Transformation",
      link: "/service-details"
    },
    {
      id: 6,
      title: "Market Research",
      description: "Whether you're looking to expand into new markets, optimize operations, or navigate complex challenges, our team of experienced consultants is here to guide you every step of the way.",
      image: servicesSlider3,
      alt: "Market Research",
      link: "/service-details"
    }
  ],
  sliderConfig: {
    spaceBetween: 30,
    centeredSlides: false,
    speed: 1000,
    autoplay: {
      delay: 3000,
    },
    loop: true,
    slidesPerView: 3,
    allowTouchMove: true,
    navigation: {
      enabled: true,
      prevIcon: LeftArrow,
      nextIcon: RightArrow
    },
    breakpoints: {
      320: {
        spaceBetween: 20,
        slidesPerView: 1,
      },
      768: {
        spaceBetween: 25,
        slidesPerView: 2,
      },
      992: {
        spaceBetween: 30,
        slidesPerView: 3,
      },
    },
  }
};