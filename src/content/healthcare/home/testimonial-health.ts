import healthAvatar1 from "@/assets/images/testimonial/health-avatar-1.png";
import healthAvatar2 from "@/assets/images/testimonial/health-avatar-2.png";
import arrowLeft from "@/assets/images/testimonial/arrow-left.png";
import arrowRight from "@/assets/images/testimonial/arrow-right.png";
import { StaticImageData } from "next/image";

export interface TestimonialHealthItem {
  id: number;
  title: string;
  content: string;
  authorName: string;
  authorPosition: string;
  authorAvatar: StaticImageData;
  colorClass: "color-one" | "color-two";
}

export const testimonialHealthContent = {
  sectionTitle: "our patients speeches",
  sectionDescription:
    "Their stories of recovery and satisfaction highlight the exceptional care and dedication we provide every day.",
  navigation: {
    prevIcon: arrowLeft,
    nextIcon: arrowRight,
  },
  testimonials: [
    {
      id: 1,
      title: '"A Game Changer in Patient Care"',
      content:
        "Our experience with Unikon has been exceptional. Their innovative solutions have transformed our hospital's operations, significantly reducing patient wait times and improving overall care. The team's professionalism and expertise are unmatched.",
      authorName: "Dr. Emily Thompson",
      authorPosition: "Cardiologist",
      authorAvatar: healthAvatar1,
      colorClass: "color-one" as const,
    },
    {
      id: 2,
      title: '"Exceptional Service and Results"',
      content:
        "Working with Unikon was a turning point for our clinic. The implementation of their advanced scheduling and electronic health record systems streamlined our processes and improved patient satisfaction.",
      authorName: "Mark Stevens",
      authorPosition: "Practice Manager, Greenfield Clinic",
      authorAvatar: healthAvatar2,
      colorClass: "color-two" as const,
    },
    {
      id: 3,
      title: '"A Game Changer in Patient Care"',
      content:
        "Our experience with Unikon has been exceptional. Their innovative solutions have transformed our hospital's operations, significantly reducing patient wait times and improving overall care. The team's professionalism and expertise are unmatched.",
      authorName: "Dr. Emily Thompson",
      authorPosition: "Cardiologist",
      authorAvatar: healthAvatar1,
      colorClass: "color-one" as const,
    },
    {
      id: 4,
      title: '"Exceptional Service and Results"',
      content:
        "Working with Unikon was a turning point for our clinic. The implementation of their advanced scheduling and electronic health record systems streamlined our processes and improved patient satisfaction.",
      authorName: "Mark Stevens",
      authorPosition: "Practice Manager, Greenfield Clinic",
      authorAvatar: healthAvatar2,
      colorClass: "color-two" as const,
    },
  ],
};
