// constants/brand-slider.ts
import Brand1 from "@/assets/images/clients/brand-1.png";
import Brand2 from "@/assets/images/clients/brand-2.png";
import Brand3 from "@/assets/images/clients/brand-3.png";
import Brand4 from "@/assets/images/clients/brand-4.png";
import Brand5 from "@/assets/images/clients/brand-5.png";
import Brand6 from "@/assets/images/clients/brand-6.png";
import Brand7 from "@/assets/images/clients/brand-7.png";

export const brandSliderData = {
  brands: [
    {
      image: Brand1,
      alt: "brand-1",
    },
    {
      image: Brand2,
      alt: "brand-2",
    },
    {
      image: Brand3,
      alt: "brand-3",
    },
    {
      image: Brand4,
      alt: "brand-4",
    },
    {
      image: Brand5,
      alt: "brand-5",
    },
    {
      image: Brand6,
      alt: "brand-6",
    },
    {
      image: Brand7,
      alt: "brand-7",
    },
  ],
};

export type BrandSliderData = typeof brandSliderData;
