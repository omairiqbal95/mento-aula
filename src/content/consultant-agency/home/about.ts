import servicesVideoThumb from "@/assets/images/services/services-video-thumb.png";
import type { AboutContent } from "@/types/consultant-agency/about";

export const aboutContent: AboutContent = {
  sectionHeader: {
    subTitle: "About",
    title: "We transform visions into reality"
  },
  headerContent: {
    description: "We believe in transforming visions into reality. As a premier consulting agency, our mission is to empower businesses to achieve their full potential through innovative strategies and personalized solutions.",
    delay: ".8"
  },
  aboutList: [
    {
      id: 1,
      title: "Needs Assessment",
      description: "This step allows us to gather comprehensive insights into what is needed to address your unique situation effectively."
    },
    {
      id: 2,
      title: "Strategy Development",
      description: "Our team analyzes data, and crafts a strategic roadmap that aligns with your long-term goals.",
      delay: ".2"
    },
    {
      id: 3,
      title: "Consultation Solution",
      description: "We deliver actionable consultation solutions that integrate our strategic recommendations with practical plans.",
      delay: ".4"
    }
  ],
  videoSection: {
    image: servicesVideoThumb,
    videoUrl: "https://www.youtube.com/watch?v=3qyhgV0Zew0?autoplay=1&mute=1",
    videoId: "3qyhgV0Zew0",
    altText: "services-video"
  }
};