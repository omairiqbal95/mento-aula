import { BlogStandardContent } from "@/types/inner-pages/blog-standard";
import { blogSidebar } from "@/content/common/blog-sidebar";

// Import blog images
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

const currentYear = new Date().getFullYear();

export const blogStandardContent: BlogStandardContent = {
  blogItems: [
    {
      id: "1",
      image: blog1,
      alt: "blog",
      date: "24 June, " + currentYear,
      comments: "03 Comments",
      title: "Top 10 Design Trends for designers in " + currentYear,
      href: "/blog-details",
      excerpt: "Explore the latest trends in graphic design, web design, and branding."
    },
    {
      id: "2",
      image: blog2,
      alt: "blog",
      date: "21 June, " + currentYear,
      comments: "03 Comments",
      title: "How to Create a Site That Ranks and Converts",
      href: "/blog-details",
      excerpt: "Provide insights on integrating SEO best practices into web design."
    },
    {
      id: "3",
      image: blog3,
      alt: "blog",
      date: "23 June, " + currentYear,
      comments: "03 Comments",
      title: "How We Revamped John Brand and Boosted Their Sales",
      href: "/blog-details",
      excerpt: "Detail a successful project from start to finish, including challenges faced."
    },
    {
      id: "4",
      image: blog4,
      alt: "blog",
      date: "22 June, " + currentYear,
      comments: "03 Comments",
      title: "The Role of Storytelling: Captivating Your Audience",
      href: "/blog-details",
      excerpt: "Explain how storytelling can be used in marketing campaigns to engage audiences."
    },
    {
      id: "5",
      image: blog5,
      alt: "blog",
      date: "25 June, " + currentYear,
      comments: "03 Comments",
      title: "Unleashing creativity : choose the right creative agency",
      href: "/blog-details",
      excerpt: "Discuss the elements of strong branding and share tips on creating a unique brand."
    },
    {
      id: "6",
      image: blog6,
      alt: "blog",
      date: "21 June, " + currentYear,
      comments: "03 Comments",
      title: "How to Create a Site That Ranks and Converts",
      href: "/blog-details",
      excerpt: "Explore the latest trends in graphic design, web design, and branding."
    },
    {
      id: "7",
      image: blog7,
      alt: "blog",
      date: "24 June, " + currentYear,
      comments: "03 Comments",
      title: "Top 10 Design Trends for designers in " + currentYear,
      href: "/blog-details",
      excerpt: "Explore the latest trends in graphic design, web design, and branding."
    },
    {
      id: "8",
      image: blog8,
      alt: "blog",
      date: "21 June, " + currentYear,
      comments: "03 Comments",
      title: "How to Create a Site That Ranks and Converts",
      href: "/blog-details",
      excerpt: "Explore the latest trends in graphic design, web design, and branding."
    },
    {
      id: "9",
      image: blog9,
      alt: "blog",
      date: "21 June, " + currentYear,
      comments: "03 Comments",
      title: "How to Create a Site That Ranks and Converts",
      href: "/blog-details",
      excerpt: "Explore the latest trends in graphic design, web design, and branding."
    },
    {
      id: "10",
      image: blog10,
      alt: "blog",
      date: "24 June, " + currentYear,
      comments: "03 Comments",
      title: "Top 10 Design Trends for designers in " + currentYear,
      href: "/blog-details",
      excerpt: "Explore the latest trends in graphic design, web design, and branding."
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
