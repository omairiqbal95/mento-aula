export const heroData = {
  title: {
    line1: "We Transforming Spaces,",
    line2: "Inspiring Lives",
  },
  description:
    "We blend creativity, functionality, and sustainability to craft architectural marvels that stand the test of time.",
  cta: {
    text: "Get a Free Consultation",
    href: "/contact",
  },
  scrollDown: {
    text: "scroll down",
    targetId: "about-ad__area",
  },
  tags: [
    { name: "Office", href: "/service" },
    { name: "Interior", href: "/service" },
    { name: "Exterior", href: "/service" },
    { name: "Living", href: "/service" },
    { name: "Playground", href: "/service" },
    { name: "Kitchen", href: "/service" },
    { name: "Dining", href: "/service" },
    { name: "Healthcare", href: "/service" },
  ],
};

export type HeroData = typeof heroData;
