import ShapeImage from "@/assets/images/icon/hero-shap.png";
import { StaticImageData } from "next/image";

export interface FunFactItem {
  value: number;
  suffix: string;
  label: string;
  delay?: string;
}

export interface AboutContent {
  subtitle: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  shapeImage: StaticImageData;
  shapeAlt: string;
}

export interface AboutData {
  content: AboutContent;
  funFacts: FunFactItem[];
}

export const aboutData: AboutData = {
  content: {
    subtitle: "Agency",
    description:
      "Our holistic, collaborative approach is tailored to navigate the challenges and opportunities of our era. Experience transformative digital solutions that captivate and engage. Remember, asking for help is not a sign of weakness, but a sign of wisdom and focus on what really matters.",
    buttonText: "Learn More",
    buttonHref: "/about",
    shapeImage: ShapeImage,
    shapeAlt: "shape",
  },
  funFacts: [
    {
      value: 20,
      suffix: "+",
      label: "Years of Experience",
      delay: undefined,
    },
    {
      value: 5,
      suffix: "K+",
      label: "Satisfied Customers",
      delay: ".4",
    },
    {
      value: 10,
      suffix: "K+",
      label: "Awards Winner",
      delay: ".8",
    },
    {
      value: 17,
      suffix: "K+",
      label: "Completed Projects",
      delay: "1.2",
    },
  ],
};
