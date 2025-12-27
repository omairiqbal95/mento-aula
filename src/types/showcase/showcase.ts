import { StaticImageData } from 'next/image';

export interface SocialLink {
  id: string;
  href: string;
  icon: string;
  label: string;
}

export interface ShowcaseItem {
  id: string;
  title: string;
  href: string;
  image: StaticImageData;
  isActive?: boolean;
}

export interface ShowcaseContent {
  socialLinks: SocialLink[];
  showcaseItems: ShowcaseItem[];
}

export interface ShowcaseItemProps {
  item: ShowcaseItem;
  onMouseEnter: (id: string) => void;
  onMouseLeave: () => void;
}

export interface ShowcaseInteractiveProps {
  items: ShowcaseItem[];
}
