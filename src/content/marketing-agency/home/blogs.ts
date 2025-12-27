import { TypeBlogSectionProps } from "@/types/marketing-agency/blogs";

import BLOG_1_IMG from "@/assets/images/blog/blog-mar-1.png";
import BLOG_2_IMG from "@/assets/images/blog/blog-mar-2.png";
import BLOG_3_IMG from "@/assets/images/blog/blog-mar-3.png";

export const CONSTANT_BLOG_DATA: TypeBlogSectionProps = {
  header: {
    subTitle: "LATEST BLOG",
    title: "Discover blog and insights",
    viewAllLink: "/blog",
  },
  posts: [
    {
      id: 1,
      date: "04 06 2024",
      category: "Social Media",
      title: "How to create a winning social media strategy",
      link: "/blog/how-to-create-a-winning-social-media-strategy",
      imageSrc: BLOG_1_IMG,
      delay: 0.2,
    },
    {
      id: 2,
      date: "31 05 2024",
      category: "SEO",
      title: "10 must-know SEO tips for beginners",
      link: "/blog/10-must-know-seo-tips-for-beginners",
      imageSrc: BLOG_2_IMG,
      delay: 0.4,
    },
    {
      id: 3,
      date: "01 06 2024",
      category: "Analytics",
      title: "A beginner's guide to Google Analytics and reporting",
      link: "/blog/a-beginners-guide-to-google-analytics-and-reporting",
      imageSrc: BLOG_3_IMG,
      delay: 0.6,
    },
  ],
};
