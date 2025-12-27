import React from "react";
import Image from "next/image";
import { ServiceImage } from "@/types/legal-advisor/services";

interface ServiceImagesProps {
  images: ServiceImage[];
  activeImageId: number;
}

const ServiceImages = ({ images, activeImageId }: ServiceImagesProps) => {
  return (
    <div className="services-la__accordion-thumb">
      {images.map((imageItem) => {
        const isActive = imageItem.id === activeImageId;
        
        return (
          <Image
            key={imageItem.id}
            src={imageItem.image}
            alt={imageItem.alt}
            className={`img-move ${isActive ? "active" : ""}`}
          />
        );
      })}
    </div>
  );
};

export default ServiceImages;
