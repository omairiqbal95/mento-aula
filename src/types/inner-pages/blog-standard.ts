import { StaticImageData } from "next/image";
import { BlogSidebar } from "@/types/common/blog-sidebar";

export interface BlogStandardItem {
  id: string;
  image: StaticImageData;
  alt: string;
  date: string;
  comments: string;
  title: string;
  href: string;
  excerpt: string;
}

export interface BlogStandardContent {
  blogItems: BlogStandardItem[];
  sidebar: BlogSidebar;
  pagination: Array<{
    id: string;
    type: 'prev' | 'page' | 'dots' | 'next';
    label: string;
    href: string;
    isActive?: boolean;
    isDisabled?: boolean;
  }>;
}

export interface BlogStandardItemProps {
  item: BlogStandardItem;
}
