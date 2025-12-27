import logo from "@/assets/images/logo.svg";
import megaMenuHome1 from "@/assets/images/mega-menu/mega-menu-home-1.png";
import megaMenuHome2 from "@/assets/images/mega-menu/mega-menu-home-2.png";
import megaMenuHome3 from "@/assets/images/mega-menu/mega-menu-home-3.png";
import megaMenuHome4 from "@/assets/images/mega-menu/mega-menu-home-4.png";
import megaMenuHome6 from "@/assets/images/mega-menu/mega-menu-home-6.png";
import megaMenuHome7 from "@/assets/images/mega-menu/mega-menu-home-7.png";
import megaMenuHome8 from "@/assets/images/mega-menu/mega-menu-home-8.png";
import megaMenuHome9 from "@/assets/images/mega-menu/mega-menu-home-9.png";
import megaMenuHome10 from "@/assets/images/mega-menu/mega-menu-home-10.png";
import megaMenuShowcase from "@/assets/images/mega-menu/mega-menu-showcase.png";
import { HeaderContent } from "@/types/fitness/header";

export const headerContent: HeaderContent = {
  logo,
  homePages: [
    {
      name: "Digital Agency",
      href: "/digital-agency",
      image: megaMenuHome1
    },
    {
      name: "Marketing Agency",
      href: "/marketing-agency",
      image: megaMenuHome2
    },
    {
      name: "Startup Agency",
      href: "/startup-agency",
      image: megaMenuHome3
    },
    {
      name: "Consultant Agency",
      href: "/consultant-agency",
      image: megaMenuHome4
    },
    {
      name: "Lgal Advisor",
      href: "/legal-advisor",
      image: megaMenuHome6
    },
    {
      name: "Architectural Agency",
      href: "/architectural-agency",
      image: megaMenuHome7
    },
    {
      name: "Healthcare",
      href: "/healthcare",
      image: megaMenuHome8
    },
    {
      name: "Financial Advisor",
      href: "/financial-advisor",
      image: megaMenuHome9
    },
    {
      name: "Fitness",
      href: "/fitness",
      image: megaMenuHome10,
      isActive: true
    },
    {
      name: "Showcase",
      href: "/showcase",
      image: megaMenuShowcase
    }
  ],
  navigation: {
    services: [
      { name: "Service Default", href: "/service" },
      { name: "Service Grid", href: "/service-grid" },
      { name: "Service Details", href: "/service-details" }
    ],
    portfolio: [
      { name: "Portfolio Default", href: "/portfolio" },
      { name: "Portfolio Masonry", href: "/portfolio-masonry" },
      { name: "Portfolio Details", href: "/portfolio-details" }
    ],
    team: [
      { name: "Team", href: "/team" },
      { name: "Team Details", href: "/team-details" }
    ],
    blog: [
      { name: "Blog Default", href: "/blog" },
      { name: "Blog Standard", href: "/blog-standard" },
      { name: "Blog Grid", href: "/blog-grid" },
      { name: "Blog Details", href: "/blog-details" }
    ],
    directLinks: [
      { name: "About Us", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "FAQ", href: "/faq" },
      { name: "Error 404", href: "/404" }
    ]
  },
  buttons: {
    cta: "START YOUR JOURNEY"
  }
};
