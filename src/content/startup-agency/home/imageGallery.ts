import gallerySa1 from "@/assets/images/gallery/gallery-sa-1.png";
import gallerySa2 from "@/assets/images/gallery/gallery-sa-2.png";
import gallerySa3 from "@/assets/images/gallery/gallery-sa-3.png";
import gallerySa4 from "@/assets/images/gallery/gallery-sa-4.png";
import gallerySa5 from "@/assets/images/gallery/gallery-sa-5.png";
import { StaticImageData } from "next/image";

export interface GalleryImage {
  id: number;
  image: StaticImageData;
  alt: string;
}

export const imageGalleryContent = {
  images: [
    {
      id: 1,
      image: gallerySa1,
      alt: "gallery-img-1",
    },
    {
      id: 2,
      image: gallerySa2,
      alt: "gallery-img-2",
    },
    {
      id: 3,
      image: gallerySa3,
      alt: "gallery-img-3",
    },
    {
      id: 4,
      image: gallerySa4,
      alt: "gallery-img-4",
    },
    {
      id: 5,
      image: gallerySa5,
      alt: "gallery-img-5",
    },
  ],
};
