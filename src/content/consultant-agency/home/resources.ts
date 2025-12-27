import resource1 from "@/assets/images/resources/resources-1.png";
import resource2 from "@/assets/images/resources/resources-2.png";
import resource3 from "@/assets/images/resources/resources-3.png";
import type { ResourcesContent } from "@/types/consultant-agency/resources";

export const resourcesContent: ResourcesContent = {
  sectionHeader: {
    subTitle: "resources",
    title: "Our latest blog and news"
  },
  resources: [
    {
      id: 1,
      title: "Premium mobile apps for online meetings",
      description: "A leading manufacturing company challenges with outdatedi...",
      image: resource1,
      type: "NEWS",
      date: "22 June, 2024",
      tags: [
        {
          id: 1,
          name: "#business",
          url: "#"
        },
        {
          id: 2,
          name: "#marketing",
          url: "#"
        }
      ],
      readMoreUrl: "/blog-details"
    },
    {
      id: 2,
      title: "Sustainable Business Practices for Long-term",
      description: "A leading manufacturing company challenges with outdatedi...",
      image: resource2,
      type: "Blog",
      date: "21 June, 2024",
      tags: [
        {
          id: 1,
          name: "#business",
          url: "#"
        },
        {
          id: 2,
          name: "#marketing",
          url: "#"
        }
      ],
      readMoreUrl: "/blog-details"
    },
    {
      id: 3,
      title: "Digital Transformation Strategies for Modern Enterprises",
      description: "Comprehensive guide to implementing digital transformation in your organization...",
      image: resource3,
      type: "Article",
      date: "20 June, 2024",
      tags: [
        {
          id: 1,
          name: "#digital",
          url: "#"
        },
        {
          id: 2,
          name: "#transformation",
          url: "#"
        }
      ],
      readMoreUrl: "/blog-details"
    },
    {
      id: 4,
      title: "Premium mobile apps for online meetings",
      description: "A leading manufacturing company challenges with outdatedi...",
      image: resource1,
      type: "NEWS",
      date: "22 June, 2024",
      tags: [
        {
          id: 1,
          name: "#business",
          url: "#"
        },
        {
          id: 2,
          name: "#marketing",
          url: "#"
        }
      ],
      readMoreUrl: "/blog-details"
    },
    {
      id: 5,
      title: "Sustainable Business Practices for Long-term",
      description: "A leading manufacturing company challenges with outdatedi...",
      image: resource2,
      type: "Blog",
      date: "21 June, 2024",
      tags: [
        {
          id: 1,
          name: "#business",
          url: "#"
        },
        {
          id: 2,
          name: "#marketing",
          url: "#"
        }
      ],
      readMoreUrl: "/blog-details"
    },
    {
      id: 6,
      title: "Digital Transformation Strategies for Modern Enterprises",
      description: "Comprehensive guide to implementing digital transformation in your organization...",
      image: resource3,
      type: "Article",
      date: "20 June, 2024",
      tags: [
        {
          id: 1,
          name: "#digital",
          url: "#"
        },
        {
          id: 2,
          name: "#transformation",
          url: "#"
        }
      ],
      readMoreUrl: "/blog-details"
    }
  ]
};