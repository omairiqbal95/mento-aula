import aboutThumb from "@/assets/images/about/about-thumb.png";
import { AboutContent } from "@/types/legal-advisor/about";

export const aboutContent: AboutContent = {
  sectionHeader: {
    subTitle: "ABOUT US",
    title: "Our goal is to provide professional service to our customers"
  },
  image: aboutThumb,
  description: "We are a dedicated team of legal experts with so many years of experience across various fields of law. Our mission is to provide with comprehensive, and personalized legal services.",
  valuesTitle: "Our Values:",
  values: [
    {
      title: "Integrity:",
      description: "We uphold the highest standards of integrity in actions."
    },
    {
      title: "Commitment:",
      description: "We are committed to delivering exceptional service"
    },
    {
      title: "Client-Centric:",
      description: "Our clients are at the heart of everything we do."
    }
  ],
  buttonText: "Know More",
  buttonLink: "/about-us",
  funFacts: [
    {
      number: "1500",
      label: "Happy Clients",
      delay: ".4"
    },
    {
      number: "2500",
      label: "Cases Completed",
      delay: ".6"
    },
    {
      number: "100",
      label: "Professional Lawyers",
      delay: ".8"
    },
    {
      number: "25",
      label: "Years of Experience",
      delay: "1"
    }
  ]
};
