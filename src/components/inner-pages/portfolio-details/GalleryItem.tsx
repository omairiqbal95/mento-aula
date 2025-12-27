import Image from "next/image";
import { GalleryImage } from "@/types/inner-pages/portfolio-details";

interface GalleryItemProps {
  item: GalleryImage;
}

const GalleryItem = ({ item }: GalleryItemProps) => {
  return (
    <div className="gallery-wrapper fade_up_anim" data-delay={item.delay}>
      <Image src={item.image} alt={item.alt} />
    </div>
  );
};

export default GalleryItem;
