import { PricingContent } from "@/types/fitness/pricing";

export const pricingContent: PricingContent = {
  sectionHeader: {
    title: "Choose Your Perfect Plan",
    description: "Every individual's fitness journey is different, and that's why we offer personalized training programs designed to fit your specific needs."
  },
  plans: [
    {
      id: 1,
      package: "Package",
      name: "Bronge",
      price: "30$",
      features: [
        { text: "2 Personal Training Sessions per Week" },
        { text: "Customized Workout Plan" },
        { text: "Access to Online Community" },
        { text: "Basic Nutritional Guidance" },
        { text: "Email Support" }
      ],
      buttonText: "Subscribe The plan",
      buttonLink: "/contact",
      delay: ".2"
    },
    {
      id: 2,
      package: "Package",
      name: "Silver",
      price: "99$",
      features: [
        { text: "4 Personal Training Sessions per Week" },
        { text: "Advanced Workout Plan" },
        { text: "Detailed Nutritional Plan" },
        { text: "Access to Online Community" },
        { text: "Email & Phone Support" }
      ],
      buttonText: "Subscribe The plan",
      buttonLink: "/contact",
      delay: ".4"
    },
    {
      id: 3,
      package: "Package",
      name: "Gold",
      price: "149$",
      features: [
        { text: "6 Personal Training Sessions per Week" },
        { text: "Premium Customized Workout Plan" },
        { text: "Unlimited Access to Online Community" },
        { text: "Email, Phone, & In-App Support" },
        { text: "Progress Tracking & Analysis" }
      ],
      buttonText: "Subscribe The plan",
      buttonLink: "/contact",
      delay: ".6"
    }
  ]
};
