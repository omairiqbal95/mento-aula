import { StaticImageData } from "next/image";
import awards1 from "@/assets/images/awards/awards-1.png";
import awardsImg1 from "@/assets/images/awards/awards-img-1.png";
import awardsImg2 from "@/assets/images/awards/awards-img-2.png";
import awardsImg3 from "@/assets/images/awards/awards-img-3.png";
import awardsImg4 from "@/assets/images/awards/awards-img-4.png";
import awardsImg5 from "@/assets/images/awards/awards-img-5.png";
import awardsImg6 from "@/assets/images/awards/awards-img-6.png";
import awardsImg7 from "@/assets/images/awards/awards-img-7.png";
import awardsImg8 from "@/assets/images/awards/awards-img-8.png";
import awardsImg9 from "@/assets/images/awards/awards-img-9.png";
import awardsImg10 from "@/assets/images/awards/awards-img-10.png";
import awardsImg11 from "@/assets/images/awards/awards-img-11.png";
import awardsImg12 from "@/assets/images/awards/awards-img-12.png";

export interface Award {
  id: number;
  title: string;
  description: string;
  awardIcon: StaticImageData;
  images: StaticImageData[];
  year: string;
}

export const awardsData: Award[] = [
  {
    id: 1,
    title: "International Architecture Award",
    description:
      "Recognized for our innovative approach to sustainable residential design",
    awardIcon: awards1,
    images: [awardsImg1, awardsImg2],
    year: "2023",
  },
  {
    id: 2,
    title: "Best Commercial Building Design",
    description:
      "Awarded for the avant-garde design of the Skyline Office Tower, blending modern aesthetics with functionality.",
    awardIcon: awards1,
    images: [awardsImg3, awardsImg4],
    year: "2023",
  },
  {
    id: 3,
    title: "Urban Design Excellence Award",
    description: "Celebrated for our transformative urban renewal project,",
    awardIcon: awards1,
    images: [awardsImg5, awardsImg6],
    year: "2022",
  },
  {
    id: 4,
    title: "The Harmony Park",
    description:
      "enhancing community engagement and green spaces. It provided residents with ample opportunities for social interaction, recreational activities.",
    awardIcon: awards1,
    images: [awardsImg7, awardsImg8],
    year: "2021",
  },
  {
    id: 5,
    title: "Sustainable Design Award",
    description:
      "Honored for the eco-friendly features and energy efficiency of the Eco-Haven Residential Complex.",
    awardIcon: awards1,
    images: [awardsImg9, awardsImg10],
    year: "2020",
  },
  {
    id: 6,
    title: "Innovative Use of Materials Award",
    description:
      "Recognized for the sustainable material usage in the Waveform Cultural Center.",
    awardIcon: awards1,
    images: [awardsImg11, awardsImg12],
    year: "2019",
  },
];
