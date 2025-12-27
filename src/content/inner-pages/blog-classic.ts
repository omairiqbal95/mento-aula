// Import blog images
import blog1 from "@/assets/images/blog/blog-1.png";
import blog2 from "@/assets/images/blog/blog-2.png";
import blog3 from "@/assets/images/blog/blog-3.png";
import blog4 from "@/assets/images/blog/blog-4.png";
import blog5 from "@/assets/images/blog/blog-5.png";
import blog6 from "@/assets/images/blog/blog-6.png";
import { BlogClassicContent } from "@/types/inner-pages/blog-classic";
import { blogSidebar } from "@/content/common/blog-sidebar";

const currentYear = new Date().getFullYear();

export const blogClassicContent: BlogClassicContent = {
  blogItems: [
    {
      id: 1,
      image: blog1,
      meta: {
        date: "24 June, " + currentYear,
        comments: 3
      },
      title: "Top 10 Design Trends for " + currentYear,
      href: "/blog-details",
      description: "Explore the latest trends in graphic design, web design, and branding. Include examples and how these trends can enhance a brand's presence."
    },
    {
      id: 2,
      image: blog2,
      meta: {
        date: "21 June, " + currentYear,
        comments: 3
      },
      title: "Web Design: How to Create a Site That Ranks and Converts",
      href: "/blog-details",
      description: "Provide insights on integrating SEO best practices into web design to improve search engine rankings and user experience."
    },
    {
      id: 3,
      image: blog3,
      meta: {
        date: "23 June, " + currentYear,
        comments: 3
      },
      title: "How We Revamped John Brand and Boosted Their Sales",
      href: "/blog-details",
      description: "Detail a successful project from start to finish, including challenges faced, solutions provided, and the impact on the client's business."
    },
    {
      id: 4,
      image: blog4,
      meta: {
        date: "20 June, " + currentYear,
        comments: 5
      },
      title: "The Psychology of Color in Branding and Marketing",
      href: "/blog-details",
      description: "Discuss how different colors evoke emotions and influence consumer behavior, with practical tips for choosing brand colors."
    },
    {
      id: 5,
      image: blog5,
      meta: {
        date: "18 June, " + currentYear,
        comments: 2
      },
      title: "Building a Strong Brand Identity: A Step-by-Step Guide",
      href: "/blog-details",
      description: "Walk through the process of creating a cohesive brand identity, from logo design to brand voice and messaging."
    },
    {
      id: 6,
      image: blog6,
      meta: {
        date: "15 June, " + currentYear,
        comments: 4
      },
      title: "The Future of Digital Marketing: Trends to Watch",
      href: "/blog-details",
      description: "Explore emerging digital marketing trends and technologies that will shape the industry in the coming years."
    }
  ],
  sidebar: blogSidebar,
  pagination: [
    { id: "1", label: "1", href: "/blog?page=1", type: "page", isActive: true },
    { id: "2", label: "2", href: "/blog?page=2", type: "page" },
    { id: "3", label: "3", href: "/blog?page=3", type: "page" },
    { id: "arrow", label: "", href: "/blog?page=2", type: "page" }
  ]
};
