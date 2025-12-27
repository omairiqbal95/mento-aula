import showcase1 from "@/assets/images/showcase/showcase-1.png";
import showcase2 from "@/assets/images/showcase/showcase-2.png";
import showcase3 from "@/assets/images/showcase/showcase-3.png";
import showcase4 from "@/assets/images/showcase/showcase-4.png";
import showcase5 from "@/assets/images/showcase/showcase-5.png";
import { ShowcaseContent } from "@/types/showcase/showcase";

export const showcaseContent: ShowcaseContent = {
  socialLinks: [
    {
      id: "facebook",
      href: "https://facebook.com",
      icon: "fa-brands fa-facebook-f",
      label: "Facebook",
    },
    {
      id: "twitter",
      href: "https://twitter.com",
      icon: "fa-brands fa-x-twitter",
      label: "Twitter",
    },
    {
      id: "linkedin",
      href: "https://linkedin.com",
      icon: "fa-brands fa-linkedin-in",
      label: "LinkedIn",
    },
    {
      id: "instagram",
      href: "https://instagram.com",
      icon: "fa-brands fa-instagram",
      label: "Instagram",
    },
  ],
  showcaseItems: [
    {
      id: "sports-shoe",
      title: "Sports Shoe",
      href: "#",
      image: showcase1,
      isActive: true,
    },
    {
      id: "fashion-model",
      title: "Fashion Model",
      href: "#",
      image: showcase2,
    },
    {
      id: "psd-mockup",
      title: "PSD Mockup",
      href: "#",
      image: showcase3,
    },
    {
      id: "design-studio",
      title: "Design Studio",
      href: "#",
      image: showcase4,
    },
    {
      id: "elegant-watch",
      title: "Elegant Watch",
      href: "#",
      image: showcase5,
    },
  ],
};
