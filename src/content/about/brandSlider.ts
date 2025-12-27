import adobe from "@/assets/images/brand-slider/adobe.png";
import notion from "@/assets/images/brand-slider/notion.png";
import hubspot from "@/assets/images/brand-slider/hubspot.png";
import trustpilot from "@/assets/images/brand-slider/trustpilot.png";
import github from "@/assets/images/brand-slider/github.png";
import { StaticImageData } from "next/image";

export interface Brand {
  id: number;
  name: string;
  logo: StaticImageData;
}

export const brandSliderContent = {
  brands: [
    {
      id: 1,
      name: "Adobe",
      logo: adobe,
    },
    {
      id: 2,
      name: "Notion",
      logo: notion,
    },
    {
      id: 3,
      name: "Hubspot",
      logo: hubspot,
    },
    {
      id: 4,
      name: "Trustpilot",
      logo: trustpilot,
    },
    {
      id: 5,
      name: "GitHub",
      logo: github,
    },
  ],
};
