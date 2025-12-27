import { StaticImageData } from "next/image";

export interface BlogSidebarCategory {
  id: number;
  name: string;
  count?: number;
  href: string;
}

export interface BlogSidebarRecentPost {
  id: number;
  image: StaticImageData;
  alt?: string;
  title: string;
  href: string;
  date: string;
}

export interface BlogSidebarTag {
  id: number;
  name: string;
  href: string;
}

export interface BlogSidebarGalleryItem {
  id: number;
  image: StaticImageData;
  alt: string;
  href?: string;
}

export interface BlogSidebar {
  search: {
    title: string;
    placeholder: string;
  };
  categories: {
    title: string;
    items: BlogSidebarCategory[];
  };
  recentPosts: {
    title: string;
    items: BlogSidebarRecentPost[];
  };
  tags: {
    title: string;
    items: BlogSidebarTag[];
  };
  newsletter: {
    title: string;
    placeholder: string;
    buttonText: string;
  };
  gallery: {
    title: string;
    items: BlogSidebarGalleryItem[];
  };
}
