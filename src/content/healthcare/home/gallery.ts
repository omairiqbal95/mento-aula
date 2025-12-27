import galleryHealth1 from "@/assets/images/gallery/gallery-health-1.png";
import galleryHealth2 from "@/assets/images/gallery/gallery-health-2.png";
import galleryHealth3 from "@/assets/images/gallery/gallery-health-3.png";
import galleryHealth4 from "@/assets/images/gallery/gallery-health-4.png";
import galleryHealth5 from "@/assets/images/gallery/gallery-health-5.png";
import { StaticImageData } from "next/image";

export interface GalleryItem {
  id: number;
  image: StaticImageData;
  alt: string;
}

export const galleryContent = {
  images: [
    {
      id: 1,
      image: galleryHealth1,
      alt: "gallery-img-1",
    },
    {
      id: 2,
      image: galleryHealth2,
      alt: "gallery-img-2",
    },
    {
      id: 3,
      image: galleryHealth3,
      alt: "gallery-img-3",
    },
    {
      id: 4,
      image: galleryHealth4,
      alt: "gallery-img-4",
    },
    {
      id: 5,
      image: galleryHealth5,
      alt: "gallery-img-5",
    },
  ],
};
