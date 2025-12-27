import { StaticImageData } from "next/image";
import { BlogSidebar } from "@/types/common/blog-sidebar";

export interface BlogMeta {
  date: string;
  comments: number;
}

export interface BlogItem {
  id: number;
  image: StaticImageData;
  meta: BlogMeta;
  title: string;
  href: string;
  description: string;
}

export interface PaginationItem {
  id: string;
  label: string;
  href: string;
  isActive?: boolean;
  isDisabled?: boolean;
  type: "prev" | "next" | "page" | "dots";
  className?: string;
}

export interface PaginationClasses {
  [selector: string]: string;
  // Examples:
  // 'container'?: string;     // div.paginations
  // 'nav'?: string;          // nav
  // 'list'?: string;         // ul.pagination
  // 'item'?: string;         // li.page-item
  // 'link'?: string;         // a.page-link
  // 'active'?: string;       // active state
  // 'arrow'?: string;        // arrow item
}

export interface BlogClassicContent {
  blogItems: BlogItem[];
  sidebar: BlogSidebar;
  pagination: PaginationItem[];
}

export interface BlogItemProps {
  item: BlogItem;
}

export interface PaginationProps {
  items: PaginationItem[];
  className?: string;
  itemClassName?: string | ((item: PaginationItem, index: number) => string);
  activeClassName?: string;
  arrowClassName?: string;
  classes?: PaginationClasses;
}
