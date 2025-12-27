import financialTeam1 from '@/assets/images/team/financial-team-1.png';
import financialTeam2 from '@/assets/images/team/financial-team-2.png';
import financialTeam3 from '@/assets/images/team/financial-team-3.png';
import financialTeam4 from '@/assets/images/team/financial-team-4.png';
import arrowLeft from '@/assets/images/icon/arrow-left.png';
import arrowRight from '@/assets/images/icon/arrow-right.png';
import { TeamContent } from '@/types/financial-advisor/team';

export const teamContent: TeamContent = {
  sectionHeader: {
    title: "Our Financial Experts",
    animationDelay: ".2"
  },
  navigation: {
    prevIcon: arrowLeft,
    nextIcon: arrowRight
  },
  members: [
    {
      id: 1,
      name: "Dr. Sarah Green",
      position: "CEO, Healthcare Financial Solutions",
      image: financialTeam1,
      detailsUrl: "/team-details",
      socialLinks: [
        {
          platform: "Facebook",
          url: "#",
          iconClass: "fa-brands fa-facebook-f"
        },
        {
          platform: "Twitter",
          url: "#",
          iconClass: "fa-brands fa-x-twitter"
        },
        {
          platform: "LinkedIn",
          url: "#",
          iconClass: "fa-brands fa-linkedin-in"
        },
        {
          platform: "Instagram",
          url: "#",
          iconClass: "fa-brands fa-instagram"
        }
      ]
    },
    {
      id: 2,
      name: "Michael Johnson",
      position: "Senior Financial Advisor",
      image: financialTeam2,
      detailsUrl: "/team-details",
      socialLinks: [
        {
          platform: "Facebook",
          url: "#",
          iconClass: "fa-brands fa-facebook-f"
        },
        {
          platform: "Twitter",
          url: "#",
          iconClass: "fa-brands fa-x-twitter"
        },
        {
          platform: "LinkedIn",
          url: "#",
          iconClass: "fa-brands fa-linkedin-in"
        },
        {
          platform: "Instagram",
          url: "#",
          iconClass: "fa-brands fa-instagram"
        }
      ]
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      position: "Investment Specialist",
      image: financialTeam3,
      detailsUrl: "/team-details",
      socialLinks: [
        {
          platform: "Facebook",
          url: "#",
          iconClass: "fa-brands fa-facebook-f"
        },
        {
          platform: "Twitter",
          url: "#",
          iconClass: "fa-brands fa-x-twitter"
        },
        {
          platform: "LinkedIn",
          url: "#",
          iconClass: "fa-brands fa-linkedin-in"
        },
        {
          platform: "Instagram",
          url: "#",
          iconClass: "fa-brands fa-instagram"
        }
      ]
    },
    {
      id: 4,
      name: "David Chen",
      position: "Portfolio Manager",
      image: financialTeam4,
      detailsUrl: "/team-details",
      socialLinks: [
        {
          platform: "Facebook",
          url: "#",
          iconClass: "fa-brands fa-facebook-f"
        },
        {
          platform: "Twitter",
          url: "#",
          iconClass: "fa-brands fa-x-twitter"
        },
        {
          platform: "LinkedIn",
          url: "#",
          iconClass: "fa-brands fa-linkedin-in"
        },
        {
          platform: "Instagram",
          url: "#",
          iconClass: "fa-brands fa-instagram"
        }
      ]
    },
    {
      id: 5,
      name: "Dr. Sarah Green",
      position: "CEO, Healthcare Financial Solutions",
      image: financialTeam1,
      detailsUrl: "/team-details",
      socialLinks: [
        {
          platform: "Facebook",
          url: "#",
          iconClass: "fa-brands fa-facebook-f"
        },
        {
          platform: "Twitter",
          url: "#",
          iconClass: "fa-brands fa-x-twitter"
        },
        {
          platform: "LinkedIn",
          url: "#",
          iconClass: "fa-brands fa-linkedin-in"
        },
        {
          platform: "Instagram",
          url: "#",
          iconClass: "fa-brands fa-instagram"
        }
      ]
    },
    {
      id: 6,
      name: "Michael Johnson",
      position: "Senior Financial Advisor",
      image: financialTeam2,
      detailsUrl: "/team-details",
      socialLinks: [
        {
          platform: "Facebook",
          url: "#",
          iconClass: "fa-brands fa-facebook-f"
        },
        {
          platform: "Twitter",
          url: "#",
          iconClass: "fa-brands fa-x-twitter"
        },
        {
          platform: "LinkedIn",
          url: "#",
          iconClass: "fa-brands fa-linkedin-in"
        },
        {
          platform: "Instagram",
          url: "#",
          iconClass: "fa-brands fa-instagram"
        }
      ]
    },
    {
      id: 7,
      name: "Emily Rodriguez",
      position: "Investment Specialist",
      image: financialTeam3,
      detailsUrl: "/team-details",
      socialLinks: [
        {
          platform: "Facebook",
          url: "#",
          iconClass: "fa-brands fa-facebook-f"
        },
        {
          platform: "Twitter",
          url: "#",
          iconClass: "fa-brands fa-x-twitter"
        },
        {
          platform: "LinkedIn",
          url: "#",
          iconClass: "fa-brands fa-linkedin-in"
        },
        {
          platform: "Instagram",
          url: "#",
          iconClass: "fa-brands fa-instagram"
        }
      ]
    },
    {
      id: 8,
      name: "David Chen",
      position: "Portfolio Manager",
      image: financialTeam4,
      detailsUrl: "/team-details",
      socialLinks: [
        {
          platform: "Facebook",
          url: "#",
          iconClass: "fa-brands fa-facebook-f"
        },
        {
          platform: "Twitter",
          url: "#",
          iconClass: "fa-brands fa-x-twitter"
        },
        {
          platform: "LinkedIn",
          url: "#",
          iconClass: "fa-brands fa-linkedin-in"
        },
        {
          platform: "Instagram",
          url: "#",
          iconClass: "fa-brands fa-instagram"
        }
      ]
    }
  ],
  currentYear: new Date().getFullYear()
};
