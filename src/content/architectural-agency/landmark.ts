// constants/landmark.ts
import LandmarkSlider1 from "@/assets/images/landmark/landmark-slider-1.png";
import LandmarkSlider2 from "@/assets/images/landmark/landmark-slider-2.png";
import LandmarkSlider3 from "@/assets/images/landmark/landmark-slider-3.png";
import LandmarkSlider4 from "@/assets/images/landmark/landmark-slider-4.png";

export const landmarkData = {
  sectionTitle: "Our Landmark Creations",
  sectionDescription:
    "From residential masterpieces to cutting-edge commercial spaces, each project reflects our commitment to quality, functionality, and aesthetic appeal.",
  slides: [
    {
      image: LandmarkSlider1,
      alt: "Living and Playground landmark project",
      tags: ["Living", "Playground"],
    },
    {
      image: LandmarkSlider2,
      alt: "Kitchen and Interior landmark project",
      tags: ["Kitchen", "Interior"],
    },
    {
      image: LandmarkSlider3,
      alt: "Healthcare and Exterior landmark project",
      tags: ["Healthcare", "Exterior"],
    },
    {
      image: LandmarkSlider4,
      alt: "Office and Corporate landmark project",
      tags: ["Office", "Corporate"],
    },
    {
      image: LandmarkSlider1,
      alt: "Living and Playground landmark project",
      tags: ["Living", "Playground"],
    },
    {
      image: LandmarkSlider2,
      alt: "Kitchen and Interior landmark project",
      tags: ["Kitchen", "Interior"],
    },
    {
      image: LandmarkSlider3,
      alt: "Healthcare and Exterior landmark project",
      tags: ["Healthcare", "Exterior"],
    },
    {
      image: LandmarkSlider4,
      alt: "Office and Corporate landmark project",
      tags: ["Office", "Corporate"],
    },
  ],
};

export type LandmarkData = typeof landmarkData;
