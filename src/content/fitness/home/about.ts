import aboutThumb from "@/assets/images/about/about-fit-thumb.png";
import { AboutContent } from "@/types/fitness/about";

export const aboutContent: AboutContent = {
  sectionHeader: {
    subTitle: "About UNIKON"
  },
  image: aboutThumb,
  title: "Discover what sets us apart and why we are the perfect partner for your fitness and health journey",
  description: "Whether you're a beginner or an athlete, our tailored programs are designed to help you succeed. Discover a healthier, happier you with our expert guidance and state-of-the-art facilities.",
  counters: [
    {
      id: 1,
      value: 600,
      suffix: "+",
      label: "Trainers",
      delay: ".5"
    },
    {
      id: 2,
      value: 350,
      suffix: "+",
      label: "Members",
      delay: ".7"
    },
    {
      id: 3,
      value: 90,
      suffix: "+",
      label: "Equipments",
      delay: ".9"
    },
    {
      id: 4,
      value: 20,
      suffix: "+",
      label: "Years Service",
      delay: "1.1"
    }
  ]
};
