import chooseUsFit from "@/assets/images/choose-us/choose-us-fit.png";
import { ChooseUsContent } from "@/types/fitness/choose-us";

export const chooseUsContent: ChooseUsContent = {
  image: chooseUsFit,
  title: "Why should people choose Unikon",
  description: "Whether you're a beginner or an athlete, our tailored programs are designed to help you succeed. Discover a healthier, happier you with our expert guidance and state-of-the-art facilities.",
  features: [
    {
      id: 1,
      title: "Personal Training",
      description: "Our personal trainers are committed to helping you achieve your fitness goals by creating a personalized fitness plan tailored to your individual needs and preferences.",
      delay: ".4"
    },
    {
      id: 2,
      title: "Flexible Time",
      description: "Our personal trainers are committed to helping you achieve your fitness goals by creating a personalized fitness plan tailored to your individual needs and preferences.",
      delay: ".6"
    },
    {
      id: 3,
      title: "Expert Trainer",
      description: "Our personal trainers are dedicated to helping you achieve your fitness goals. They will work closely with you to create a personalized fitness plan.",
      delay: ".8"
    }
  ],
  ctaButton: {
    text: "START YOUR JOURNEY",
    href: "/contact"
  }
};
