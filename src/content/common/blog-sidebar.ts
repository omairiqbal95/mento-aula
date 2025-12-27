import { BlogSidebar } from "@/types/common/blog-sidebar";

// Import widget images
import postWidget1 from "@/assets/images/widget/post-widget-1.png";
import postWidget2 from "@/assets/images/widget/post-widget-2.png";
import postWidget3 from "@/assets/images/widget/post-widget-3.png";

// Import gallery images
import blogGallery1 from "@/assets/images/gallery/blog-gallery-1.png";
import blogGallery2 from "@/assets/images/gallery/blog-gallery-2.png";
import blogGallery3 from "@/assets/images/gallery/blog-gallery-3.png";
import blogGallery4 from "@/assets/images/gallery/blog-gallery-4.png";
import blogGallery5 from "@/assets/images/gallery/blog-gallery-5.png";
import blogGallery6 from "@/assets/images/gallery/blog-gallery-6.png";
import blogGallery7 from "@/assets/images/gallery/blog-gallery-7.png";
import blogGallery8 from "@/assets/images/gallery/blog-gallery-8.png";
import blogGallery9 from "@/assets/images/gallery/blog-gallery-9.png";

const currentYear = new Date().getFullYear();

export const blogSidebar: BlogSidebar = {
  search: {
    title: "Search",
    placeholder: "Search here"
  },
  categories: {
    title: "Categories",
    items: [
      { id: 1, name: "Design", count: 12, href: "/blog" },
      { id: 2, name: "Development", count: 8, href: "/blog" },
      { id: 3, name: "Digital Marketing", count: 15, href: "/blog" },
      { id: 4, name: "SEO", count: 6, href: "/blog" },
      { id: 5, name: "Consulting", count: 10, href: "/blog" },
      { id: 6, name: "Others", count: 4, href: "/blog" }
    ]
  },
  recentPosts: {
    title: "Latest Post",
    items: [
      {
        id: 1,
        image: postWidget1,
        alt: "post",
        title: "How to Create a Memorable Logo",
        href: "/blog-details",
        date: "26 June, " + currentYear
      },
      {
        id: 2,
        image: postWidget2,
        alt: "post",
        title: "Tips from Our Design Experts",
        href: "/blog-details",
        date: "26 June, " + currentYear
      },
      {
        id: 3,
        image: postWidget3,
        alt: "post",
        title: "The Future of Digital Marketing",
        href: "/blog-details",
        date: "25 June, " + currentYear
      }
    ]
  },
  tags: {
    title: "Tags",
    items: [
      { id: 1, name: "ai science", href: "/blog" },
      { id: 2, name: "web design", href: "/blog" },
      { id: 3, name: "marketing", href: "/blog" },
      { id: 4, name: "web development", href: "/blog" },
      { id: 5, name: "open ai", href: "/blog" },
      { id: 6, name: "research", href: "/blog" },
      { id: 7, name: "consulting", href: "/blog" },
      { id: 8, name: "seo", href: "/blog" },
      { id: 9, name: "graphics design", href: "/blog" }
    ]
  },
  newsletter: {
    title: "Newsletter",
    placeholder: "Enter your email address",
    buttonText: "Subscribe"
  },
  gallery: {
    title: "Gallery",
    items: [
      { id: 1, image: blogGallery1, alt: "blog-gallery", href: "/gallery/1" },
      { id: 2, image: blogGallery2, alt: "blog-gallery", href: "/gallery/2" },
      { id: 3, image: blogGallery3, alt: "blog-gallery", href: "/gallery/3" },
      { id: 4, image: blogGallery4, alt: "blog-gallery", href: "/gallery/4" },
      { id: 5, image: blogGallery5, alt: "blog-gallery", href: "/gallery/5" },
      { id: 6, image: blogGallery6, alt: "blog-gallery", href: "/gallery/6" },
      { id: 7, image: blogGallery7, alt: "blog-gallery", href: "/gallery/7" },
      { id: 8, image: blogGallery8, alt: "blog-gallery", href: "/gallery/8" },
      { id: 9, image: blogGallery9, alt: "blog-gallery", href: "/gallery/9" }
    ]
  }
};
