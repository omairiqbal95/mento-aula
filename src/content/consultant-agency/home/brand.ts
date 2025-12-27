import adobeImage from "@/assets/images/brand-slider/adobe.png";
import notionImage from "@/assets/images/brand-slider/notion.png";
import hubspotImage from "@/assets/images/brand-slider/hubspot.png";
import trustpilotImage from "@/assets/images/brand-slider/trustpilot.png";
import githubImage from "@/assets/images/brand-slider/github.png";
import { BrandContent } from "@/types/consultant-agency/brand";

export const brandContent: BrandContent = {
  brands: [
    {
      id: 1,
      name: "Adobe",
      image: adobeImage,
      alt: "adobe"
    },
    {
      id: 2,
      name: "Notion",
      image: notionImage,
      alt: "notion"
    },
    {
      id: 3,
      name: "HubSpot",
      image: hubspotImage,
      alt: "hubspot"
    },
    {
      id: 4,
      name: "Trustpilot",
      image: trustpilotImage,
      alt: "trustpilot"
    },
    {
      id: 5,
      name: "GitHub",
      image: githubImage,
      alt: "github"
    },
    {
      id: 6,
      name: "Adobe",
      image: adobeImage,
      alt: "adobe"
    },
    {
      id: 7,
      name: "Notion",
      image: notionImage,
      alt: "notion"
    },
    {
      id: 8,
      name: "HubSpot",
      image: hubspotImage,
      alt: "hubspot"
    },
    {
      id: 9,
      name: "Trustpilot",
      image: trustpilotImage,
      alt: "trustpilot"
    },
    {
      id: 10,
      name: "GitHub",
      image: githubImage,
      alt: "github"
    },
    {
      id: 11,
      name: "GitHub",
      image: githubImage,
      alt: "github"
    },
    {
      id: 12,
      name: "Adobe",
      image: adobeImage,
      alt: "adobe"
    },
    {
      id: 13,
      name: "Notion",
      image: notionImage,
      alt: "notion"
    },
    {
      id: 14,
      name: "HubSpot",
      image: hubspotImage,
      alt: "hubspot"
    },
    {
      id: 15,
      name: "Trustpilot",
      image: trustpilotImage,
      alt: "trustpilot"
    },
    {
      id: 16,
      name: "GitHub",
      image: githubImage,
      alt: "github"
    }
  ],
  sliderConfig: {
    spaceBetween: 100,
    centeredSlides: true,
    speed: 5000,
    autoplay: {
      delay: 1,
    },
    loop: true,
    slidesPerView: "auto",
    allowTouchMove: false,
    breakpoints: {
      320: {
        spaceBetween: 50,
      },
      992: {
        spaceBetween: 70,
      },
    },
  }
};