import product1 from "@/assets/images/products/product-1.png";
import product2 from "@/assets/images/products/product-2.png";
import product3 from "@/assets/images/products/product-3.png";
import product4 from "@/assets/images/products/product-4.png";
import { ProductsContent } from "@/types/fitness/products";

export const productsContent: ProductsContent = {
  sectionHeader: {
    title: "Enjoy our feature products"
  },
  products: [
    {
      id: 1,
      image: product1,
      alt: "product",
      delay: ".4"
    },
    {
      id: 2,
      image: product2,
      alt: "product",
      delay: ".6"
    },
    {
      id: 3,
      image: product3,
      alt: "product",
      delay: ".8"
    },
    {
      id: 4,
      image: product4,
      alt: "product",
      delay: "1"
    }
  ]
};
