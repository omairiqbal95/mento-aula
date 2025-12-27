import teamDigital1 from "@/assets/images/team/team-digital-1.png";
import teamDigital2 from "@/assets/images/team/team-digital-2.png";
import teamDigital3 from "@/assets/images/team/team-digital-3.png";
import teamDigital4 from "@/assets/images/team/team-digital-4.png";
import arrowLeft from "@/assets/images/icon/arrow-left.png";
import arrowRight from "@/assets/images/icon/arrow-right.png";
import type { TeamData } from "@/types/digital-agency/team";

export const teamData: TeamData = {
  sectionTitle: "Meet with Experts",
  sectionDescription:
    "Join us for an in-depth session with our experts and gain valuable insights tailored to your needs",
  navigationIcons: {
    prev: arrowLeft,
    next: arrowRight,
  },
  teamMembers: [
    {
      id: "1",
      name: "James Anderson",
      position: "Founder & CEO",
      image: teamDigital1,
      link: "/team-details",
    },
    {
      id: "2",
      name: "Michael Thompson",
      position: "Chief Design Officer",
      image: teamDigital2,
      link: "/team-details",
    },
    {
      id: "3",
      name: "Sara Williams",
      position: "Digital Marketer",
      image: teamDigital3,
      link: "/team-details",
    },
    {
      id: "4",
      name: "David Collins",
      position: "Senior Web Developer",
      image: teamDigital4,
      link: "/team-details",
    },
    {
      id: "5",
      name: "Emily Johnson",
      position: "UX/UI Designer",
      image: teamDigital1,
      link: "/team-details",
    },
    {
      id: "6",
      name: "Robert Davis",
      position: "Project Manager",
      image: teamDigital2,
      link: "/team-details",
    },
  ],
};
