import { StaticImageData } from "next/image";

export interface VideoData {
  id: number;
  videoUrl: string;
  type: string;
  poster?: StaticImageData; // Optional poster image
}

export const videoData: VideoData = {
  id: 1,
  videoUrl: "../../../public/assets/video/home2video.mp4",
  type: "video/mp4",
};
