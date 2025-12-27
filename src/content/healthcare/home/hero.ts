import { IconType } from "react-icons";
import {
  BsPersonHearts,
  BsHospital,
  BsLaptopFill,
  BsShieldCheck,
} from "react-icons/bs";
import heroHealthImage from "@/assets/images/hero/hero-health.png";
import heroHealthVideo from "@/assets/images/hero/hero-health-video.png";
import avatar1 from "@/assets/images/hero/avatar-1.png";
import avatar2 from "@/assets/images/hero/avatar-2.png";
import avatar3 from "@/assets/images/hero/avatar-3.png";
import { StaticImageData } from "next/image";

export interface HeroFeature {
  icon: IconType;
  label: string;
  delay: string;
}

export interface HeroTag {
  label: string;
  href: string;
}

export interface DoctorAvatar {
  src: StaticImageData;
  alt: string;
}

export interface HeroData {
  subtitle: string;
  title: string[];
  description: string;
  ctaButton: {
    text: string;
    href: string;
  };
  video: {
    thumbnail: StaticImageData;
    description: string;
    youtubeUrl: string;
  };
  tags: HeroTag[];
  mainImage: StaticImageData;
  doctorStats: {
    avatars: DoctorAvatar[];
    count: number;
    text: string;
  };
  features: HeroFeature[];
}

export const heroData: HeroData = {
  subtitle: "Your Health, Our Priority",
  title: ["The Ultimate", "Health Solution"],
  description:
    "Our team of experienced healthcare professionals is here to support you on your journey to better health.",
  ctaButton: {
    text: "Get Free 30 min Consultation",
    href: "/contact",
  },
  video: {
    thumbnail: heroHealthVideo,
    description: "Know about more from video",
    youtubeUrl: "https://www.youtube.com/watch?v=3qyhgV0Zew0?autoplay=1&mute=1",
  },
  tags: [
    { label: "Clinic", href: "#" },
    { label: "Medicine CL", href: "#" },
    { label: "Lifestyle", href: "#" },
    { label: "Healthcare", href: "#" },
    { label: "Diagnostic", href: "#" },
  ],
  mainImage: heroHealthImage,
  doctorStats: {
    avatars: [
      { src: avatar1, alt: "Doctor Avatar 1" },
      { src: avatar2, alt: "Doctor Avatar 2" },
      { src: avatar3, alt: "Doctor Avatar 3" },
    ],
    count: 300,
    text: "Talk to over",
  },
  features: [
    {
      icon: BsPersonHearts,
      label: "Free Support",
      delay: "0.2s",
    },
    {
      icon: BsHospital,
      label: "Chamber Service",
      delay: "0.4s",
    },
    {
      icon: BsLaptopFill,
      label: "Online Specialist",
      delay: "0.6s",
    },
    {
      icon: BsShieldCheck,
      label: "Private and Secure",
      delay: "0.8s",
    },
  ],
};
