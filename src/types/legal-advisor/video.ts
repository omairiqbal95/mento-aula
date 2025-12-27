import { StaticImageData } from 'next/image';

export interface VideoContent {
  backgroundImage: StaticImageData;
  videoId: string;
  altText: string;
}
