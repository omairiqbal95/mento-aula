// constants/about.ts

export const aboutData = {
  sectionId: "about-ad__area",
  title: "About us",
  heading:
    "Unikon founded on a passion for creating exceptional spaces, we are a premier architectural design agency committed to transforming visions into reality.",
  content: {
    paragraph1:
      "We envision a world where architecture is not just about building structures but about crafting environments that foster community, creativity, and well-being.",
    paragraph2:
      "Our mission is to deliver cutting-edge architectural solutions that blend functionality, sustainability, and aesthetic appeal.",
  },
  cta: {
    text: "Learn More",
    href: "/about-us",
  },
  funFacts: [
    {
      label: "Projects Completed",
      value: 87,
    },
    {
      label: "Projects Completed",
      value: 79,
    },
    {
      label: "Projects Completed",
      value: 15,
    },
    {
      label: "Projects Completed",
      value: 35,
    },
    {
      label: "Total Team Members",
      value: 60,
    },
  ],
};

export type AboutData = typeof aboutData;
