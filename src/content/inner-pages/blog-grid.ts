// Import all blog images
import blog1 from "@/assets/images/blog/blog-1.1.png";
import blog2 from "@/assets/images/blog/blog-2.2.png";
import blog3 from "@/assets/images/blog/blog-3.3.png";
import blog4 from "@/assets/images/blog/blog-4.4.png";
import blog5 from "@/assets/images/blog/blog-5.5.png";
import blog6 from "@/assets/images/blog/blog-6.6.png";
import blog7 from "@/assets/images/blog/blog-7.7.png";
import blog8 from "@/assets/images/blog/blog-8.8.png";
import blog9 from "@/assets/images/blog/blog-9.9.png";
import blog10 from "@/assets/images/blog/blog-10.10.png";
import blog11 from "@/assets/images/blog/blog-11.11.png";
import blog12 from "@/assets/images/blog/blog-12.12.png";

import { BlogGridContent } from "@/types/inner-pages/blog-grid";

// Get current year dynamically
const currentYear = new Date().getFullYear();

export const blogGridContent: BlogGridContent = {
  items: [
    {
      id: 1,
      image: blog1,
      meta: {
        date: `24 June, ${currentYear}`,
        comments: 3,
      },
      title: "Top 10 Design Trends for designers in 2024",
      description: "Explore the latest trends in graphic design, web design, and branding.",
      link: "/blog-details",
      delay: ".2",
    },
    {
      id: 2,
      image: blog2,
      meta: {
        date: `21 June, ${currentYear}`,
        comments: 3,
      },
      title: "How to Create a Site That Ranks and Converts",
      description: "Provide insights on integrating SEO best practices into web design.",
      link: "/blog-details",
      delay: ".4",
    },
    {
      id: 3,
      image: blog3,
      meta: {
        date: `23 June, ${currentYear}`,
        comments: 3,
      },
      title: "How We Revamped John Brand and Boosted Their Sales",
      description: "Detail a successful project from start to finish, including challenges faced.",
      link: "/blog-details",
      delay: ".6",
    },
    {
      id: 4,
      image: blog4,
      meta: {
        date: `22 June, ${currentYear}`,
        comments: 3,
      },
      title: "The Role of Storytelling: Captivating Your Audience",
      description: "Explain how storytelling can be used in marketing campaigns to engage audiences.",
      link: "/blog-details",
      delay: ".8",
    },
    {
      id: 5,
      image: blog5,
      meta: {
        date: `25 June, ${currentYear}`,
        comments: 3,
      },
      title: "Unleashing creativity : choose the right creative agency",
      description: "Discuss the elements of strong branding and share tips on creating a unique brand.",
      link: "/blog-details",
      delay: ".2",
    },
    {
      id: 6,
      image: blog6,
      meta: {
        date: `21 June, ${currentYear}`,
        comments: 3,
      },
      title: "How to Create a Site That Ranks and Converts",
      description: "Explore the latest trends in graphic design, web design, and branding.",
      link: "/blog-details",
      delay: ".4",
    },
    {
      id: 7,
      image: blog7,
      meta: {
        date: `24 June, ${currentYear}`,
        comments: 3,
      },
      title: "Top 10 Design Trends for designers in 2024",
      description: "Explore the latest trends in graphic design, web design, and branding.",
      link: "/blog-details",
      delay: ".6",
    },
    {
      id: 8,
      image: blog8,
      meta: {
        date: `21 June, ${currentYear}`,
        comments: 3,
      },
      title: "How to Create a Site That Ranks and Converts",
      description: "Explore the latest trends in graphic design, web design, and branding.",
      link: "/blog-details",
      delay: ".8",
    },
    {
      id: 9,
      image: blog9,
      meta: {
        date: `21 June, ${currentYear}`,
        comments: 3,
      },
      title: "How to Create a Site That Ranks and Converts",
      description: "Explore the latest trends in graphic design, web design, and branding.",
      link: "/blog-details",
      delay: ".2",
    },
    {
      id: 10,
      image: blog10,
      meta: {
        date: `24 June, ${currentYear}`,
        comments: 3,
      },
      title: "Top 10 Design Trends for designers in 2024",
      description: "Explore the latest trends in graphic design, web design, and branding.",
      link: "/blog-details",
      delay: ".4",
    },
    {
      id: 11,
      image: blog11,
      meta: {
        date: `21 June, ${currentYear}`,
        comments: 3,
      },
      title: "How to Create a Site That Ranks and Converts",
      description: "Provide insights on integrating SEO best practices into web design.",
      link: "/blog-details",
      delay: ".6",
    },
    {
      id: 12,
      image: blog12,
      meta: {
        date: `21 June, ${currentYear}`,
        comments: 3,
      },
      title: "How to Create a Site That Ranks and Converts",
      description: "Provide insights on integrating SEO best practices into web design.",
      link: "/blog-details",
      delay: ".8",
    },
  ],
  pagination: [
    {
      id: "1",
      label: "1",
      href: "/blog-grid?page=1",
      type: "page",
      isActive: true,
    },
    {
      id: "2", 
      label: "2",
      href: "/blog-grid?page=2",
      type: "page",
    },
    {
      id: "3",
      label: "3", 
      href: "/blog-grid?page=3",
      type: "page",
    },
    {
      id: "arrow",
      label: "Next",
      href: "/blog-grid?page=2",
      type: "page",
    },
  ],
};