import postWidget1 from "@/assets/images/widget/post-widget-1.png";
import postWidget2 from "@/assets/images/widget/post-widget-2.png";
import postWidget3 from "@/assets/images/widget/post-widget-3.png";
import blogGallery1 from "@/assets/images/gallery/blog-gallery-1.png";
import blogGallery2 from "@/assets/images/gallery/blog-gallery-2.png";
import blogGallery3 from "@/assets/images/gallery/blog-gallery-3.png";
import blogGallery4 from "@/assets/images/gallery/blog-gallery-4.png";
import blogGallery5 from "@/assets/images/gallery/blog-gallery-5.png";
import blogGallery6 from "@/assets/images/gallery/blog-gallery-6.png";
import blogGallery7 from "@/assets/images/gallery/blog-gallery-7.png";
import blogGallery8 from "@/assets/images/gallery/blog-gallery-8.png";
import blogGallery9 from "@/assets/images/gallery/blog-gallery-9.png";
import blogMainThumb from "@/assets/images/blog-details/blocg-main-thumb.png";
import innerBlock1 from "@/assets/images/blog-details/inner-block-1.png";
import innerBlock2 from "@/assets/images/blog-details/inner-block-2.png";
import avatar1 from "@/assets/images/blog-details/avatar-1.png";
import avatar2 from "@/assets/images/blog-details/avatar-2.png";
import avatar3 from "@/assets/images/blog-details/avatar-3.png";
import { StaticImageData } from "next/image";

export interface Category {
  id: number;
  name: string;
  href: string;
}

export interface RecentPost {
  id: number;
  title: string;
  href: string;
  image: StaticImageData;
  date: string;
}

export interface Tag {
  id: number;
  name: string;
  href: string;
}

export interface GalleryItem {
  id: number;
  image: StaticImageData;
  alt: string;
}

export interface Comment {
  id: number;
  author: string;
  avatar: StaticImageData;
  content: string;
  date: string;
  isNested?: boolean;
}

export interface BlogArticle {
  mainImage: StaticImageData;
  author: string;
  authorLink: string;
  category: string;
  categoryLink: string;
  date: string;
  comments: string;
  commentsLink: string;
  content: {
    intro: string[];
    storyBehind: {
      title: string;
      paragraphs: string[];
    };
    blockquote: string;
    middleContent: string;
    innerImages: {
      image: StaticImageData;
      caption: string;
    }[];
    openToFeedback: {
      title: string;
      paragraphs: string[];
    };
    finalThoughts: {
      title: string;
      paragraphs: string[];
    };
  };
  authorInfo: {
    avatar: StaticImageData;
    name: string;
    label: string;
    socialLinks: {
      facebook: string;
      twitter: string;
      linkedin: string;
      instagram: string;
    };
  };
  commentsList: Comment[];
}

export const categories = {
  title: "Categories",
  categories: [
    { id: 1, name: "Business", href: "#" },
    { id: 2, name: "Design", href: "#" },
    { id: 3, name: "Development", href: "#" },
    { id: 4, name: "Digital Marketing", href: "#" },
    { id: 5, name: "SEO", href: "#" },
    { id: 6, name: "Consulting", href: "#" },
    { id: 7, name: "Others", href: "#" },
  ],
};

export const recentPosts = {
  title: "Latest Post",
  posts: [
    {
      id: 1,
      title: "How to Create a Memorable Logo",
      href: "/blog/blog-details",
      image: postWidget1,
      date: "26 June, 2024",
    },
    {
      id: 2,
      title: "Tips from Our Design Experts",
      href: "/blog/blog-details",
      image: postWidget2,
      date: "26 June, 2024",
    },
    {
      id: 3,
      title: "The Future of Digital Marketing",
      href: "/blog/blog-details",
      image: postWidget3,
      date: "25 June, 2024",
    },
  ],
};

export const tags = {
  title: "Tags",
  tags: [
    { id: 1, name: "ai science", href: "#" },
    { id: 2, name: "web design", href: "#" },
    { id: 3, name: "marketing", href: "#" },
    { id: 4, name: "web development", href: "#" },
    { id: 5, name: "open ai", href: "#" },
    { id: 6, name: "research", href: "#" },
    { id: 7, name: "consulting", href: "#" },
    { id: 8, name: "seo", href: "#" },
    { id: 9, name: "graphics design", href: "#" },
  ],
};

export const newsletter = {
  title: "Newsletter",
  placeholder: "Enter your email address",
  buttonText: "Subscribe",
};

export const gallery = {
  title: "Gallery",
  galleryItems: [
    { id: 1, image: blogGallery1, alt: "blog-gallery" },
    { id: 2, image: blogGallery2, alt: "blog-gallery" },
    { id: 3, image: blogGallery3, alt: "blog-gallery" },
    { id: 4, image: blogGallery4, alt: "blog-gallery" },
    { id: 5, image: blogGallery5, alt: "blog-gallery" },
    { id: 6, image: blogGallery6, alt: "blog-gallery" },
    { id: 7, image: blogGallery7, alt: "blog-gallery" },
    { id: 8, image: blogGallery8, alt: "blog-gallery" },
    { id: 9, image: blogGallery9, alt: "blog-gallery" },
  ],
};

export const blogArticle: BlogArticle = {
  mainImage: blogMainThumb,
  author: "John Smith",
  authorLink: "#",
  category: "John Smith",
  categoryLink: "#",
  date: "January 25, 2024",
  comments: "No Comments",
  commentsLink: "#",
  content: {
    intro: [
      "In 2022, at vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
      "Consequat mauris nunc congue nisi vitae suscipit tellus. Quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus. Mauris ultrices eros in cursus turpis massa tincidunt. Integer quis auctor elit sed vulputate mi sit amet. Quis varius quam quisque id diam vel quam. Ultrices sagittis orci a scelerisque purus semper eget duis pros. Accumsan tortor posuere ac ut consequat semper viverra nam libero. Malesuada fames ac turpis egestas integer. Eget arcu dictum varius duis. Faucibus nisl tincidunt eget nullam non nisi est. Duis ut diam quam nulla porttitor massa. Iaculis eu non diam phasellus vestibulum. Imperdiet dui accumsan sit amet nulla facilisi morbi.",
    ],
    storyBehind: {
      title: "The story behind",
      paragraphs: [
        "Quodsi integer eget aliquet nibh praesent tristique magna sit. Porttitor lacus luctus accumsan tortor posuere ac ut consequat semper. Convallis aenean et tortor at risus viverra adipiscing at. Eu lobortis elementum nibh tellus molestie nunc non blandit massa. Diam phasellus vestibulum lorem sed risus ultricies tristique nulla. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin gravida. Netus et malesuada fames ac turpis egestas maecenas.",
        "Ultrices sagittis orci a scelerisque purus semper eget duis. Accumsan tortor posuere ac ut consequat semper viverra nam libero. Malesuada fames ac turpis egestas integer. Eget arcu dictum varius duis. Faucibus nisl tincidunt eget nullam non nisi est. Duis ut diam quam nulla porttitor massa. Iaculis eu non diam phasellus vestibulum.",
      ],
    },
    blockquote:
      "Ex delenit petentium eum, at nam eius eirmod verear, pri feugait antiopam ei.",
    middleContent:
      "Appetere mauris nunc congue nisi vitae suscipit tellus. Quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus. Mauris ultrices eros in cursus turpis massa tincidunt. Integer quis auctor elit sed vulputate mi sit amet. Quis varius quam quisque id diam vel quam. Ultrices sagittis orci a scelerisque purus semper eget duis. Accumsan tortor posuere ac ut consequat semper viverra nam libero. Malesuada fames ac turpis egestas integer. Eget arcu dictum varius duis. Faucibus nisl tincidunt eget nullam non nisi est. Duis ut diam quam nulla porttitor massa.",
    innerImages: [
      {
        image: innerBlock1,
        caption: "Appetere mauris nunc congue nisi vitae",
      },
      {
        image: innerBlock2,
        caption: "Appetere mauris nunc congue nisi vitae",
      },
    ],
    openToFeedback: {
      title: "Be open to feedback",
      paragraphs: [
        "Egestas integer eget aliquet nibh praesent tristique magna sit. Porttitor lacus luctus accumsan tortor posuere ac ut consequat semper. Convallis aenean et tortor at risus viverra adipiscing at. Eu lobortis elementum nibh tellus molestie nunc non blandit massa. Diam phasellus vestibulum lorem sed risus ultricies tristique nulla. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin gravida. Netus et malesuada fames ac turpis egestas maecenas pharetra convallis. Sed lectus vestibulum mattis ullamcorpe velit sed ullamcorpe morbi.",
        "Appetere mauris nunc congue nisi vitae suscipit tellus. Quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus. Mauris ultrices eros in cursus turpis massa tincidunt. Integer quis auctor elit sed vulputate mi sit amet. Quis varius quam quisque id dia quam.",
      ],
    },
    finalThoughts: {
      title: "Final thoughts",
      paragraphs: [
        "Quodsi integer eget aliquet nibh praesent tristique magna sit. Porttitor lacus luctus accumsan tortor posuere ac ut consequat semper. Convallis aenean et tortor at risus viverra adipiscing at. Eu lobortis elementum nibh tellus molestie nunc non blandit massa. Diam phasellus vestibulum lorem sed risus ultricies tristique nulla. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin gravida. Netus et malesuada fames ac turpis egestas maecenas.",
        "Ultrices sagittis orci a scelerisque purus semper eget duis. Accumsan tortor posuere ac ut consequat semper viverra nam libero. Malesuada fames ac turpis egestas integer. Eget arcu dictum varius duis. Faucibus nisl tincidunt eget nullam non nisi est. Duis ut diam quam nulla porttitor massa. Iaculis eu non diam phasellus vestibulum.",
      ],
    },
  },
  authorInfo: {
    avatar: avatar1,
    name: "Sarah Thompson",
    label: "Written by",
    socialLinks: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
      instagram: "#",
    },
  },
  commentsList: [
    {
      id: 1,
      author: "John Mcclemn",
      avatar: avatar2,
      content:
        "Ultrices sagittis orci a scelerisque purus semper eget duis. Accumsan tortor posuere ac ut consequat semper viverra nam libero. Malesuada fames ac turpis egestas integer. Eget arcu dictum varius duis. Faucibus nisl tincidunt eget nullam non nisi est. Duis ut diam quam nulla porttitor massa. Iaculis eu non diam phasellus vestibulum.",
      date: "25 June, 2024",
      isNested: false,
    },
    {
      id: 2,
      author: "Adam Gilchrist",
      avatar: avatar3,
      content:
        "Ultrices sagittis orci a scelerisque purus semper eget duis. Accumsan tortor posuere ac ut consequat semper viverra nam libero. Malesuada fames ac turpis egestas integer. Eget arcu dictum varius duis.",
      date: "25 June, 2024",
      isNested: true,
    },
  ],
};
