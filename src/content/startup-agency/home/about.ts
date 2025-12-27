export interface AboutContent {
  subTitle: string;
  header: string;
  vision: {
    title: string;
    description: string;
  };
  mission: {
    title: string;
    description: string;
  };
  button: {
    text: string;
    href: string;
  };
}

export const aboutContent: AboutContent = {
  subTitle: "About Us",
  header:
    "Unikon is a dynamic and forward-thinking startup agency dedicated to providing cutting-edge solutions that drive success for businesses all sizes.",
  vision: {
    title: "Our Vision",
    description:
      "At Unikon, we envision a world where businesses are empowered by innovative strategies and transformative technologies.",
  },
  mission: {
    title: "Our Mission",
    description:
      "Our mission is simple to deliver exceptional results through a blend of creativity, technology, and strategic thinking.",
  },
  button: {
    text: "Know More",
    href: "/about",
  },
};
