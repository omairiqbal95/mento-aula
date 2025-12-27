import aboutHealthImage from "@/assets/images/about/about-health.png";
import { StaticImageData } from "next/image";

export interface AboutData {
  title: string;
  description: string;
  button: {
    text: string;
    href: string;
  };
  image: {
    src: StaticImageData;
    alt: string;
  };
}

export const aboutData: AboutData = {
  title: "Personalized healthcare with a human touch.",
  description:
    "We believe in putting you, the patient, at the center of everything we do. Our experienced team of healthcare professionals is committed to providing compassionate and comprehensive care tailored to your individual needs.",
  button: {
    text: "More about Unikon",
    href: "/about-us",
  },
  image: {
    src: aboutHealthImage,
    alt: "About Health - Personalized Healthcare",
  },
};
