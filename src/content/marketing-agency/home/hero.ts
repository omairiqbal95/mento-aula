import heroMarketing from '@/assets/images/hero/hero-marketing.png';
import brand1 from '@/assets/images/brand-slider/adobe.png';
import brand2 from '@/assets/images/brand-slider/notion.png';
import brand3 from '@/assets/images/brand-slider/hubspot.png';
import brand4 from '@/assets/images/brand-slider/github.png';
import brand5 from '@/assets/images/brand-slider/adobe.png';
import brand6 from '@/assets/images/brand-slider/notion.png';
import brand7 from '@/assets/images/brand-slider/hubspot.png';
import brand8 from '@/assets/images/brand-slider/github.png';
import { HeroContent } from '@/types/marketing-agency/hero';

export const heroContent: HeroContent = {
  title: {
    words: ["Digital", "marketing", "agency"]
  },
  description: "Supercharge your brand with expert marketing solutions. Grow your business.",
  button: {
    text: "GET STARTED",
    href: "/contact",
    className: "common-btn square-btn fade_up_anim"
  },
  brandSection: {
    title: "Our trusted partners:",
    brands: [
      {
        id: "brand-1",
        name: "Adobe",
        image: brand1,
        alt: "Adobe"
      },
      {
        id: "brand-2", 
        name: "Notion",
        image: brand2,
        alt: "Notion"
      },
      {
        id: "brand-3",
        name: "HubSpot", 
        image: brand3,
        alt: "HubSpot"
      },
      {
        id: "brand-4",
        name: "GitHub",
        image: brand4,
        alt: "GitHub"
      },
      {
        id: "brand-5",
        name: "Adobe",
        image: brand5,
        alt: "Adobe"
      },
      {
        id: "brand-6",
        name: "Notion",
        image: brand6,
        alt: "Notion"
      },
      {
        id: "brand-7",
        name: "HubSpot",
        image: brand7,
        alt: "HubSpot"
      },
      {
        id: "brand-8",
        name: "GitHub",
        image: brand8,
        alt: "GitHub"
      }
    ]
  },
  heroImage: {
    src: heroMarketing,
    alt: "Marketing Agency Hero"
  },
  videoSection: {
    circularText: "watch video",
    videoId: "3qyhgV0Zew0",
    className: "popup-youtube"
  }
};
