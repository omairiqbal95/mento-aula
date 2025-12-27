import team1 from "@/assets/images/team/team-1.png";
import team2 from "@/assets/images/team/team-2.png";
import team3 from "@/assets/images/team/team-3.png";
import team4 from "@/assets/images/team/team-4.png";
import team5 from "@/assets/images/team/team-5.png";
import team6 from "@/assets/images/team/team-6.png";
import team7 from "@/assets/images/team/team-7.png";
import team8 from "@/assets/images/team/team-8.png";
import { StaticImageData } from "next/image";

export interface SocialLink {
  id: number;
  platform: string;
  icon: string;
  url: string;
}

export interface TeamMember {
  id: number;
  name: string;
  position: string;
  image: StaticImageData;
  detailsUrl: string;
  socialLinks: SocialLink[];
  delay: string;
}

export const teamContent = {
  sectionTitle: "Meet the team",
  sectionDescription:
    "Join us for an in-depth session with our experts and gain valuable insights tailored to your needs",
  members: [
    {
      id: 1,
      name: "Rachel Adams",
      position: "Chief Executive Officer (CEO)",
      image: team1,
      detailsUrl: "/team-details",
      socialLinks: [
        {
          id: 1,
          platform: "Facebook",
          icon: "fa-brands fa-facebook-f",
          url: "#",
        },
        {
          id: 2,
          platform: "Instagram",
          icon: "fa-brands fa-instagram",
          url: "#",
        },
        {
          id: 3,
          platform: "LinkedIn",
          icon: "fa-brands fa-linkedin-in",
          url: "#",
        },
        { id: 4, platform: "Twitter", icon: "fa-brands fa-twitter", url: "#" },
      ],
      delay: ".2",
    },
    {
      id: 2,
      name: "Michael Thompson",
      position: "Chief Design Officer (CDO)",
      image: team2,
      detailsUrl: "/team-details",
      socialLinks: [
        {
          id: 1,
          platform: "Facebook",
          icon: "fa-brands fa-facebook-f",
          url: "#",
        },
        {
          id: 2,
          platform: "Instagram",
          icon: "fa-brands fa-instagram",
          url: "#",
        },
        {
          id: 3,
          platform: "LinkedIn",
          icon: "fa-brands fa-linkedin-in",
          url: "#",
        },
        { id: 4, platform: "Twitter", icon: "fa-brands fa-twitter", url: "#" },
      ],
      delay: ".23",
    },
    {
      id: 3,
      name: "Dr. Emily Turner",
      position: "Chief Operating Officer (COO)",
      image: team3,
      detailsUrl: "/team-details",
      socialLinks: [
        {
          id: 1,
          platform: "Facebook",
          icon: "fa-brands fa-facebook-f",
          url: "#",
        },
        {
          id: 2,
          platform: "Instagram",
          icon: "fa-brands fa-instagram",
          url: "#",
        },
        {
          id: 3,
          platform: "LinkedIn",
          icon: "fa-brands fa-linkedin-in",
          url: "#",
        },
        { id: 4, platform: "Twitter", icon: "fa-brands fa-twitter", url: "#" },
      ],
      delay: ".26",
    },
    {
      id: 4,
      name: "James Rodriguez",
      position: "Technology Solutions Director",
      image: team4,
      detailsUrl: "/team-details",
      socialLinks: [
        {
          id: 1,
          platform: "Facebook",
          icon: "fa-brands fa-facebook-f",
          url: "#",
        },
        {
          id: 2,
          platform: "Instagram",
          icon: "fa-brands fa-instagram",
          url: "#",
        },
        {
          id: 3,
          platform: "LinkedIn",
          icon: "fa-brands fa-linkedin-in",
          url: "#",
        },
        { id: 4, platform: "Twitter", icon: "fa-brands fa-twitter", url: "#" },
      ],
      delay: ".29",
    },
    {
      id: 5,
      name: "Samantha Lee",
      position: "Business Strategy Consultant",
      image: team5,
      detailsUrl: "/team-details",
      socialLinks: [
        {
          id: 1,
          platform: "Facebook",
          icon: "fa-brands fa-facebook-f",
          url: "#",
        },
        {
          id: 2,
          platform: "Instagram",
          icon: "fa-brands fa-instagram",
          url: "#",
        },
        {
          id: 3,
          platform: "LinkedIn",
          icon: "fa-brands fa-linkedin-in",
          url: "#",
        },
        { id: 4, platform: "Twitter", icon: "fa-brands fa-twitter", url: "#" },
      ],
      delay: ".32",
    },
    {
      id: 6,
      name: "John O'Neill",
      position: "Management Consulting Lead",
      image: team6,
      detailsUrl: "/team-details",
      socialLinks: [
        {
          id: 1,
          platform: "Facebook",
          icon: "fa-brands fa-facebook-f",
          url: "#",
        },
        {
          id: 2,
          platform: "Instagram",
          icon: "fa-brands fa-instagram",
          url: "#",
        },
        {
          id: 3,
          platform: "LinkedIn",
          icon: "fa-brands fa-linkedin-in",
          url: "#",
        },
        { id: 4, platform: "Twitter", icon: "fa-brands fa-twitter", url: "#" },
      ],
      delay: ".35",
    },
    {
      id: 7,
      name: "James Anderson",
      position: "Business Strategy Consultant",
      image: team7,
      detailsUrl: "/team-details",
      socialLinks: [
        {
          id: 1,
          platform: "Facebook",
          icon: "fa-brands fa-facebook-f",
          url: "#",
        },
        {
          id: 2,
          platform: "Instagram",
          icon: "fa-brands fa-instagram",
          url: "#",
        },
        {
          id: 3,
          platform: "LinkedIn",
          icon: "fa-brands fa-linkedin-in",
          url: "#",
        },
        { id: 4, platform: "Twitter", icon: "fa-brands fa-twitter", url: "#" },
      ],
      delay: ".38",
    },
    {
      id: 8,
      name: "Michael Bennett",
      position: "Talent Management Consultant",
      image: team8,
      detailsUrl: "/team-details",
      socialLinks: [
        {
          id: 1,
          platform: "Facebook",
          icon: "fa-brands fa-facebook-f",
          url: "#",
        },
        {
          id: 2,
          platform: "Instagram",
          icon: "fa-brands fa-instagram",
          url: "#",
        },
        {
          id: 3,
          platform: "LinkedIn",
          icon: "fa-brands fa-linkedin-in",
          url: "#",
        },
        { id: 4, platform: "Twitter", icon: "fa-brands fa-twitter", url: "#" },
      ],
      delay: ".41",
    },
  ],
};
