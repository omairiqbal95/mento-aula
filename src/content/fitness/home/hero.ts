import heroThumb from "@/assets/images/hero/hero-fit-thumb.png";
import heroVideo from "@/assets/images/hero/hero-fit-video.png";
import thunderIcon from "@/assets/images/icon/thunder.png";
import adobeBrand from "@/assets/images/brand-slider/adobe.png";
import brandFit1 from "@/assets/images/brand-slider/brand-fit-1.png";
import brandFit2 from "@/assets/images/brand-slider/brand-fit-2.png";
import brandFit3 from "@/assets/images/brand-slider/brand-fit-3.png";
import brandFit4 from "@/assets/images/brand-slider/brand-fit-4.png";
import { HeroContent } from "@/types/fitness/hero";

export const heroContent: HeroContent = {
  subTitle: {
    icon: thunderIcon,
    text: "Transform Your Life"
  },
  title: "Elevate Your Fitness with Personalized Programs",
  description: "Whether you're a beginner or an athlete, our tailored programs are designed to help you succeed. Discover a healthier, happier you with our expert guidance and state-of-the-art facilities.",
  ctaButton: {
    text: "START YOUR JOURNEY",
    href: "/contact",
    delay: ".6"
  },
  heroImage: heroThumb,
  videoPlayer: {
    videoUrl: "https://www.youtube.com/watch?v=3qyhgV0Zew0?autoplay=1&mute=1",
    thumbnailImage: heroVideo,
    playButtonText: "Watch Video"
  },
  brands: [
    {
      id: 1,
      image: adobeBrand,
      alt: "adobe"
    },
    {
      id: 2,
      image: brandFit1,
      alt: "brand"
    },
    {
      id: 3,
      image: brandFit2,
      alt: "brand"
    },
    {
      id: 4,
      image: brandFit3,
      alt: "brand"
    },
    {
      id: 5,
      image: brandFit4,
      alt: "brand"
    },
    {
      id: 6,
      image: brandFit1,
      alt: "brand"
    },
    {
      id: 7,
      image: brandFit2,
      alt: "brand"
    },
    {
      id: 8,
      image: brandFit3,
      alt: "brand"
    },
    {
      id: 9,
      image: brandFit4,
      alt: "brand"
    }
  ]
};
