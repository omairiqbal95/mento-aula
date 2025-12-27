import ScrollImage from "@/assets/images/hero/hero-digital-scroll.png";
import { StaticImageData } from "next/image";

export interface HeroButton {
  text: string;
  href: string;
  delay?: string;
}

export interface HeroContent {
  establishedYear: string;
  description: string;
  delay?: string;
}

export interface HeroScrollLink {
  href: string;
  image: StaticImageData;
  alt: string;
}

export interface HeroData {
  title: {
    firstLine: string;
    secondLine: string;
  };
  button: HeroButton;
  scrollLink: HeroScrollLink;
  content: HeroContent;
  videoArea: {
    videoSrc?: string;
    autoplay: boolean;
    muted: boolean;
    loop: boolean;
  };
}

export const heroData: HeroData = {
  title: {
    firstLine: "Digital",
    secondLine: "productivity",
  },
  button: {
    text: "Explore Service",
    href: "/service",
    delay: ".2",
  },
  scrollLink: {
    href: "#about-digital",
    image: ScrollImage,
    alt: "scroll",
  },
  content: {
    establishedYear: "2002",
    description:
      "We are a creative studio that is dedicated to providing affordable photorealistic 3D models and Architectural Renderings for developers.",
    delay: ".8",
  },
  videoArea: {
    videoSrc: "/videos/home2video.mp4",
    autoplay: true,
    muted: true,
    loop: true,
  },
};
