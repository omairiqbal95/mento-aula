import figyre1 from "@/assets/images/case-details/figyre-1.png";
import galleryFigyre1 from "@/assets/images/case-details/galleyr-figyre-1.png";
import galleryFigyre2 from "@/assets/images/case-details/galleyr-figyre-2.png";
import galleryFigyre3 from "@/assets/images/case-details/galleyr-figyre-3.png";
import workAs2 from "@/assets/images/work/work-as-2.png";
import workAs5 from "@/assets/images/work/work-as-5.png";
import { PortfolioDetailsContent } from "@/types/inner-pages/portfolio-details";

export const portfolioDetailsContent: PortfolioDetailsContent = {
  background: {
    title: "Background",
    description: "TechSolutions Inc. is a leading provider of IT solutions for businesses across various industries. With a rapidly growing customer base and an evolving range of services, the company recognized the need to revamp its outdated website to better reflect its capabilities.",
  },
  objectives: {
    title: "Objectives",
    items: [
      "Improve the overall user experience (UX) and user interface (UI).",
      "Ensure mobile responsiveness and cross-browser compatibility.",
      "Integrate a content management system (CMS) for easy content updates.",
      "Enhance SEO to improve search engine rankings.",
      "Increase lead generation through optimized calls-to-action (CTAs).",
    ],
  },
  mainImage: {
    image: figyre1,
    alt: "case-details-figure",
  },
  process: {
    title: "Process",
    steps: [
      {
        id: "discovery",
        title: "Discovery & Research",
        items: [
          "Conducted stakeholder interviews and user surveys to understand pain points and goals.",
          "Analyzed website analytics to identify areas needing improvement.",
          "Competitor analysis to benchmark best practices.",
        ],
      },
      {
        id: "planning",
        title: "Planning",
        items: [
          "Developed a project roadmap with milestones.",
          "Created user personas and journey maps.",
          "Established key performance indicators (KPIs) to measure success.",
        ],
      },
      {
        id: "design",
        title: "Design",
        items: [
          "Wireframes and mockups were created for desktop and mobile views.",
          "User testing on wireframes to gather feedback.",
          "Finalized UI designs incorporating brand guidelines.",
        ],
      },
      {
        id: "development",
        title: "Development",
        items: [
          "Front-end development using HTML5, CSS3, and JavaScript.",
          "Back-end integration with CMS.",
          "Implemented responsive design techniques.",
          "Set up SEO best practices including meta tags, alt text, and sitemaps.",
        ],
      },
      {
        id: "testing",
        title: "Testing & Launch",
        items: [
          "Conducted rigorous testing across devices.",
          "Beta testing with a select group of users.",
          "Final tweaks and optimizations based on feedback.",
          "Official website launch and post-launch support.",
        ],
      },
    ],
  },
  gallery: [
    {
      id: "gallery-1",
      image: galleryFigyre1,
      alt: "gallery-figure",
      delay: ".27",
    },
    {
      id: "gallery-2",
      image: galleryFigyre2,
      alt: "gallery-figure",
      delay: ".28",
    },
    {
      id: "gallery-3",
      image: galleryFigyre3,
      alt: "gallery-figure",
      delay: ".29",
    },
  ],
  results: {
    title: "Results",
    items: [
      {
        id: "engagement",
        title: "Increased User Engagement:",
        description: "Bounce rate decreased by 30%, session duration increased by 45%.",
      },
      {
        id: "mobile",
        title: "Enhanced Mobile Experience:",
        description: "Mobile traffic increased by 50% with improved usability.",
      },
      {
        id: "seo",
        title: "Better SEO Performance:",
        description: "Organic search traffic improved by 60%.",
      },
      {
        id: "leads",
        title: "Higher Lead Generation:",
        description: "Conversion rates increased by 35% due to optimized CTAs.",
      },
    ],
  },
  projectInfo: {
    client: "TechSolutions Inc.",
    industry: "Information Technology",
    project: "Website Redesign",
    duration: "6 months",
  },
  relatedProjects: {
    title: "More Project",
    items: [
      {
        id: "project-1",
        image: workAs2,
        title: "A Case Study on X School's Approach to Multilingual Education",
        categories: "Strategy & Planning/Media/Social Media/ Digital Production",
        href: "/portfolio-details",
      },
      {
        id: "project-2",
        image: workAs5,
        title: "A Look at Y Hospital's Telemedicine Implementation",
        categories: "Strategy & Planning/Media/Social Media/ Digital Production",
        href: "/portfolio-details",
      },
    ],
  },
};
