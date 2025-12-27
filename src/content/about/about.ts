import authorAvatar from "@/assets/images/about/author-avatar.png";
import aboutGallery1 from "@/assets/images/about/about-gallery-1.png";
import aboutGallery2 from "@/assets/images/about/about-gallery-2.png";
import aboutGallery3 from "@/assets/images/about/about-gallery-3.png";
import aboutGallery4 from "@/assets/images/about/about-gallery-4.png";
import aboutGallery5 from "@/assets/images/about/about-gallery-5.png";
import { StaticImageData } from "next/image";

export interface FunFactItem {
  id: number;
  number: number;
  suffix: string;
  label: string;
  delay: string;
}

export interface GalleryImage {
  id: number;
  image: StaticImageData;
  alt: string;
}

export const aboutContent = {
  hero: {
    title: "Together we are strong",
    subheading:
      "Our crew is always getting bigger, but we all work toward one goal: to make sales success not only possible but inevitable for teams everywhere.",
    description:
      "In 2022, at vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
  },
  author: {
    avatar: authorAvatar,
    name: "Brandon Shaw",
    designation: "Founder & CEO",
  },
  quote:
    '"Our holistic, collaborative approach is tailored to navigate the challenges opportunities of our era. Experience transformative digital solutions that captivate and engage."',
  funFacts: [
    {
      id: 1,
      number: 10,
      suffix: "+",
      label: "Years of Experience",
      delay: ".2",
    },
    {
      id: 2,
      number: 10,
      suffix: "k+",
      label: "Satisfied Clients",
      delay: ".4",
    },
    {
      id: 3,
      number: 50,
      suffix: "M+",
      label: "In Tracked Revenue",
      delay: ".6",
    },
  ],
  gallery: [
    {
      id: 1,
      image: aboutGallery1,
      alt: "About gallery image 1",
    },
    {
      id: 2,
      image: aboutGallery2,
      alt: "About gallery image 2",
    },
    {
      id: 3,
      image: aboutGallery3,
      alt: "About gallery image 3",
    },
    {
      id: 4,
      image: aboutGallery4,
      alt: "About gallery image 4",
    },
    {
      id: 5,
      image: aboutGallery5,
      alt: "About gallery image 5",
    },
    {
      id: 6,
      image: aboutGallery3,
      alt: "About gallery image 3",
    },
  ],
};
