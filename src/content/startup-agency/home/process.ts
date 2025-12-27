import processSa1 from "@/assets/images/icon/process-sa-1.png";
import processSa2 from "@/assets/images/icon/process-sa-2.png";
import processSa3 from "@/assets/images/icon/process-sa-3.png";
import { StaticImageData } from "next/image";

export interface ProcessItem {
  id: number;
  number: string;
  icon: StaticImageData;
  title: string;
  description: string;
  delay?: string;
}

export const processContent = {
  sectionTitle: "Process behind our success",
  sectionDescription:
    "This dynamic approach, coupled with a commitment to excellence and a customer-centric focus, drives our achievements and fuels our growth.",
  processes: [
    {
      id: 1,
      number: "001",
      icon: processSa1,
      title: "Discover",
      description:
        "In the Discover phase, we delve deep into understanding your business, goals, and aspirations.",
      delay: "0",
    },
    {
      id: 2,
      number: "002",
      icon: processSa2,
      title: "Strategize",
      description:
        "Here, we translate those insights into actionable strategies tailored to your unique needs.",
      delay: ".2",
    },
    {
      id: 3,
      number: "003",
      icon: processSa3,
      title: "Implement",
      description:
        "Armed with a solid strategy, we roll up our sleeves and dive into the Implement phase.",
      delay: ".4",
    },
  ],
};
