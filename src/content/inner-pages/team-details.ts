import { TeamDetailsContent } from "@/types/inner-pages/team-details";
import teamMemberImage from "@/assets/images/team-details/team-member.png";

export const teamDetailsContent: TeamDetailsContent = {
  member: {
    id: "1",
    welcomeText: "Hello I am,",
    name: "Michael Thompson",
    description: "My name is Michael Thompson, a passionate UI/UX Designer with 7 years of experience. I'm dedicated to delivering successful projects and equipped with the skills and knowledge to achieve your goals.",
    image: teamMemberImage,
    alt: "Michael Thompson - UI/UX Designer",
    portfolioTitle: "My Portfolio:",
    portfolioLinks: [
      {
        id: "1",
        name: "Behance",
        href: "#"
      },
      {
        id: "2",
        name: "Dribbble",
        href: "#"
      },
      {
        id: "3",
        name: "Instagram",
        href: "#"
      }
    ],
    contactTitle: "Contact With Me:",
    contactLinks: [
      {
        id: "1",
        href: "#",
        icon: "fa-brands fa-facebook-f",
        platform: "Facebook"
      },
      {
        id: "2",
        href: "#",
        icon: "fa-brands fa-instagram",
        platform: "Instagram"
      },
      {
        id: "3",
        href: "#",
        icon: "fa-brands fa-x-twitter",
        platform: "Twitter"
      }
    ]
  }
};
