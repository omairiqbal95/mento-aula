import { HeaderContent } from "@/types/financial-advisor/header";
import logoImage from "@/assets/images/logo.svg";
import megaMenuHome1 from "@/assets/images/mega-menu/mega-menu-home-1.png";
import megaMenuHome2 from "@/assets/images/mega-menu/mega-menu-home-2.png";
import megaMenuHome3 from "@/assets/images/mega-menu/mega-menu-home-3.png";
import megaMenuHome4 from "@/assets/images/mega-menu/mega-menu-home-4.png";
import megaMenuHome5 from "@/assets/images/mega-menu/mega-menu-home-6.png";
import megaMenuHome6 from "@/assets/images/mega-menu/mega-menu-home-7.png";
import megaMenuHome7 from "@/assets/images/mega-menu/mega-menu-home-8.png";
import megaMenuHome8 from "@/assets/images/mega-menu/mega-menu-home-9.png";
import megaMenuHome9 from "@/assets/images/mega-menu/mega-menu-home-10.png";
import megaMenuHome10 from "@/assets/images/mega-menu/mega-menu-showcase.png";

export const headerContent: HeaderContent = {
  logo: {
    image: logoImage,
    alt: "Unikon Logo",
    href: "/financial-advisor",
  },
  navigation: [
    {
      id: "home",
      title: "Home",
      isMegaMenu: true,
      megaMenuItems: [
        {
          id: "digital-agency",
          title: "Digital Agency",
          image: megaMenuHome1,
          href: "/",
        },
        {
          id: "marketing-agency",
          title: "Marketing Agency",
          image: megaMenuHome2,
          href: "/marketing-agency",
        },
        {
          id: "startup-agency",
          title: "Startup Agency",
          image: megaMenuHome3,
          href: "/startup-agency",
        },
        {
          id: "consultant-agency",
          title: "Consultant Agency",
          image: megaMenuHome4,
          href: "/consultant-agency",
        },
        {
          id: "legal-advisor",
          title: "Legal Advisor",
          image: megaMenuHome5,
          href: "/legal-advisor",
        },
        {
          id: "architectural-agency",
          title: "Architectural Agency",
          image: megaMenuHome6,
          href: "/architectural-agency",
        },
        {
          id: "healthcare",
          title: "Healthcare",
          image: megaMenuHome7,
          href: "/healthcare",
        },
        {
          id: "financial-advisor",
          title: "Financial Advisor",
          image: megaMenuHome8,
          href: "/financial-advisor",
          active: true,
        },
        {
          id: "fitness",
          title: "Fitness",
          image: megaMenuHome9,
          href: "/fitness",
        },
        {
          id: "showcase",
          title: "Showcase",
          image: megaMenuHome10,
          href: "/showcase",
        },
      ],
    },
    {
      id: "pages",
      title: "Pages",
      sections: [
        {
          id: "service-section",
          title: "Service",
          items: [
            {
              id: "service-default",
              title: "Service Default",
              href: "/service",
            },
            {
              id: "service-grid",
              title: "Service Grid",
              href: "/service-grid",
            },
            {
              id: "service-details",
              title: "Service Details",
              href: "/service-details",
            },
          ],
        },
        {
          id: "portfolio-section",
          title: "Portfolio",
          items: [
            {
              id: "portfolio-default",
              title: "Portfolio Default",
              href: "/portfolio",
            },
            {
              id: "portfolio-masonry",
              title: "Portfolio Masonry",
              href: "/portfolio-masonry",
            },
            {
              id: "portfolio-details",
              title: "Portfolio Details",
              href: "/portfolio-details",
            },
          ],
        },
        {
          id: "team-section",
          title: "Team",
          items: [
            { id: "team", title: "Team", href: "/team" },
            {
              id: "team-details",
              title: "Team Details",
              href: "/team-details",
            },
            { id: "testimonials", title: "Testimonials", href: "/team" },
          ],
        },
      ],
      subItems: [
        { id: "faq", title: "FAQ", href: "/faq" },
        { id: "error-404", title: "Error 404", href: "/404" },
      ],
    },
    {
      id: "blog",
      title: "Blog",
      subMenuItems: [
        {
          id: "blog-default",
          title: "Blog Default",
          href: "/blog",
        },
        {
          id: "blog-standard",
          title: "Blog Standard",
          href: "/blog-standard",
        },
        {
          id: "blog-grid",
          title: "Blog Grid",
          href: "/blog-grid",
        },
        {
          id: "blog-details",
          title: "Blog Details",
          href: "/blog-details",
        },
      ],
    },
    {
      id: "about",
      title: "About",
      href: "/about",
    },
    {
      id: "contact",
      title: "Contact",
      href: "/contact",
    },
  ],
  searchPlaceholder: "Search here...",
  currentYear: new Date().getFullYear(),
};
