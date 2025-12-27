import { StaticImageData } from "next/image";

export interface BlogMeta {
  date: string;
  comments: number;
}

export interface BlogItem {
  id: number;
  image: StaticImageData;
  meta: BlogMeta;
  title: string;
  description: string;
  link: string;
  delay: string;
}

export interface BlogItemProps {
  item: BlogItem;
}

export interface PaginationItem {
  id: string;
  label: string;
  href: string;
  type: "prev" | "next" | "page" | "dots";
  isActive?: boolean;
  isDisabled?: boolean;
  className?: string;
}

export interface PaginationProps {
  items: PaginationItem[];
  className?: string;
}

export interface BlogGridContent {
  items: BlogItem[];
  pagination: PaginationItem[];
}

export interface BlogGridProps {
  content?: BlogGridContent;
}