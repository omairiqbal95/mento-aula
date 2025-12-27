import { FaqContent } from '@/types/financial-advisor/faq';

export const faqContent: FaqContent = {
  sectionHeader: {
    title: "Frequently Asked Questions about Unikon",
    titleAnimationDelay: ".2",
    buttonText: "Get Free Consultation",
    buttonUrl: "/contact",
    buttonAnimationDelay: ".4"
  },
  faqItems: [
    {
      id: 1,
      question: "What services do you offer?",
      answer: "We offer a wide range of financial advisory services including retirement planning, investment management, tax optimization, estate planning, and comprehensive financial planning. Our goal is to provide personalized strategies tailored to your unique financial needs and goals.",
      isDefaultOpen: true,
      animationDelay: ""
    },
    {
      id: 2,
      question: "How do you charge for your services?",
      answer: "Our fee structure is transparent and competitive. We offer various pricing models including asset-based fees, hourly consultations, and project-based pricing. During your initial consultation, we'll discuss the most suitable fee structure for your specific needs and financial situation.",
      isDefaultOpen: false,
      animationDelay: ".2"
    },
    {
      id: 3,
      question: "What makes your approach different?",
      answer: "We take a holistic approach to financial planning, considering all aspects of your financial life. Our team combines years of experience with cutting-edge technology to provide personalized strategies. We focus on building long-term relationships and adapting our advice as your life circumstances change.",
      isDefaultOpen: false,
      animationDelay: ".4"
    },
    {
      id: 4,
      question: "How often will we meet to review my portfolio?",
      answer: "We believe in regular communication and typically schedule quarterly reviews with our clients. However, the frequency can be adjusted based on your preferences and market conditions. We're also available for additional meetings whenever significant life events or market changes warrant a strategy review.",
      isDefaultOpen: false,
      animationDelay: ".6"
    },
    {
      id: 5,
      question: "Do you work with clients of all income levels?",
      answer: "Yes, we work with clients across various income levels and life stages. Whether you're just starting your career, planning for retirement, or managing significant wealth, we tailor our services to meet your specific needs and budget. Our goal is to make professional financial advice accessible to everyone.",
      isDefaultOpen: false,
      animationDelay: ".8"
    }
  ],
  currentYear: new Date().getFullYear()
};
