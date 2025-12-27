import team1 from "@/assets/images/team/team-1.png";
import team2 from "@/assets/images/team/team-2.png";
import team3 from "@/assets/images/team/team-3.png";
import team4 from "@/assets/images/team/team-4.png";
import team5 from "@/assets/images/team/team-5.png";
import team6 from "@/assets/images/team/team-6.png";
import type { TeamContent } from "@/types/consultant-agency/team";

export const teamContent: TeamContent = {
  sectionHeader: {
    subTitle: "Team",
    title: "Our Experts",
    description: "Our team of expert consultants is the cornerstone of our success."
  },
  members: [
    {
      id: 1,
      name: "Rachel Adams",
      position: "Chief Executive Officer (CEO)",
      image: team1,
      profileUrl: "/team-details",
      socialLinks: [
        {
          id: 1,
          platform: "facebook",
          url: "#",
          icon: "fa-brands fa-facebook-f"
        },
        {
          id: 2,
          platform: "instagram",
          url: "#",
          icon: "fa-brands fa-instagram"
        },
        {
          id: 3,
          platform: "linkedin",
          url: "#",
          icon: "fa-brands fa-linkedin-in"
        },
        {
          id: 4,
          platform: "twitter",
          url: "#",
          icon: "fa-brands fa-twitter"
        }
      ]
    },
    {
      id: 2,
      name: "Michael Thompson",
      position: "Chief Design Officer (CDO)",
      image: team2,
      profileUrl: "/team-details",
      socialLinks: [
        {
          id: 1,
          platform: "facebook",
          url: "#",
          icon: "fa-brands fa-facebook-f"
        },
        {
          id: 2,
          platform: "instagram",
          url: "#",
          icon: "fa-brands fa-instagram"
        },
        {
          id: 3,
          platform: "linkedin",
          url: "#",
          icon: "fa-brands fa-linkedin-in"
        },
        {
          id: 4,
          platform: "twitter",
          url: "#",
          icon: "fa-brands fa-twitter"
        }
      ],
      delay: ".2"
    },
    {
      id: 3,
      name: "Sarah Johnson",
      position: "Senior Strategy Consultant",
      image: team3,
      profileUrl: "/team-details",
      socialLinks: [
        {
          id: 1,
          platform: "facebook",
          url: "#",
          icon: "fa-brands fa-facebook-f"
        },
        {
          id: 2,
          platform: "instagram",
          url: "#",
          icon: "fa-brands fa-instagram"
        },
        {
          id: 3,
          platform: "linkedin",
          url: "#",
          icon: "fa-brands fa-linkedin-in"
        },
        {
          id: 4,
          platform: "twitter",
          url: "#",
          icon: "fa-brands fa-twitter"
        }
      ],
      delay: ".4"
    },
    {
      id: 4,
      name: "David Wilson",
      position: "Financial Advisory Lead",
      image: team4,
      profileUrl: "/team-details",
      socialLinks: [
        {
          id: 1,
          platform: "facebook",
          url: "#",
          icon: "fa-brands fa-facebook-f"
        },
        {
          id: 2,
          platform: "instagram",
          url: "#",
          icon: "fa-brands fa-instagram"
        },
        {
          id: 3,
          platform: "linkedin",
          url: "#",
          icon: "fa-brands fa-linkedin-in"
        },
        {
          id: 4,
          platform: "twitter",
          url: "#",
          icon: "fa-brands fa-twitter"
        }
      ],
      delay: ".6"
    },
    {
      id: 5,
      name: "Emily Davis",
      position: "Operations Excellence Manager",
      image: team5,
      profileUrl: "/team-details",
      socialLinks: [
        {
          id: 1,
          platform: "facebook",
          url: "#",
          icon: "fa-brands fa-facebook-f"
        },
        {
          id: 2,
          platform: "instagram",
          url: "#",
          icon: "fa-brands fa-instagram"
        },
        {
          id: 3,
          platform: "linkedin",
          url: "#",
          icon: "fa-brands fa-linkedin-in"
        },
        {
          id: 4,
          platform: "twitter",
          url: "#",
          icon: "fa-brands fa-twitter"
        }
      ],
      delay: ".8"
    },
    {
      id: 6,
      name: "John O'Neill",
      position: "Management Consulting Lead",
      image: team6,
      profileUrl: "/team-details",
      socialLinks: [
        {
          id: 1,
          platform: "facebook",
          url: "#",
          icon: "fa-brands fa-facebook-f"
        },
        {
          id: 2,
          platform: "instagram",
          url: "#",
          icon: "fa-brands fa-instagram"
        },
        {
          id: 3,
          platform: "linkedin",
          url: "#",
          icon: "fa-brands fa-linkedin-in"
        },
        {
          id: 4,
          platform: "twitter",
          url: "#",
          icon: "fa-brands fa-twitter"
        }
      ],
      delay: "1"
    }
  ]
};