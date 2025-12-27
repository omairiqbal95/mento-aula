import React from "react";
import { galleryContent } from "@/content/healthcare/home/gallery";
import GalleryInteractive from "./GalleryInteractive";

const Gallery = () => {
  return (
    <div className="gallery-health__area overflow-hidden">
      <GalleryInteractive images={galleryContent.images} />
    </div>
  );
};

export default Gallery;
