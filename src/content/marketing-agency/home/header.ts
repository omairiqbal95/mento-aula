import logo from '@/assets/images/logo.svg';
import megaMenuHome1 from '@/assets/images/mega-menu/mega-menu-home-1.png';
import megaMenuHome2 from '@/assets/images/mega-menu/mega-menu-home-2.png';
import megaMenuHome3 from '@/assets/images/mega-menu/mega-menu-home-3.png';
import megaMenuHome4 from '@/assets/images/mega-menu/mega-menu-home-4.png';
import megaMenuHome6 from '@/assets/images/mega-menu/mega-menu-home-6.png';
import megaMenuHome7 from '@/assets/images/mega-menu/mega-menu-home-7.png';
import megaMenuHome8 from '@/assets/images/mega-menu/mega-menu-home-8.png';
import megaMenuHome9 from '@/assets/images/mega-menu/mega-menu-home-9.png';
import megaMenuHome10 from '@/assets/images/mega-menu/mega-menu-home-10.png';
import megaMenuShowcase from '@/assets/images/mega-menu/mega-menu-showcase.png';
import { HeaderContent } from '@/types/marketing-agency/header';

export const headerContent: HeaderContent = {
  logo: {
    src: logo,
    alt: "Unikon Logo",
    href: "/marketing-agency"
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
          alt: "mega-menu-home-1",
          href: "/",
          isActive: false
        },
        {
          id: "marketing-agency",
          title: "Marketing Agency",
          image: megaMenuHome2,
          alt: "mega-menu-home-2",
          href: "/marketing-agency",
          isActive: true
        },
        {
          id: "startup-agency",
          title: "Startup Agency",
          image: megaMenuHome3,
          alt: "mega-menu-home-3",
          href: "/startup-agency"
        },
        {
          id: "consultant-agency",
          title: "Consultant Agency",
          image: megaMenuHome4,
          alt: "mega-menu-home-4",
          href: "/consultant-agency"
        },
        {
          id: "legal-advisor",
          title: "Legal Advisor",
          image: megaMenuHome6,
          alt: "mega-menu-home-6",
          href: "/legal-advisor"
        },
        {
          id: "architectural-agency",
          title: "Architectural Agency",
          image: megaMenuHome7,
          alt: "mega-menu-home-7",
          href: "/architectural-agency"
        },
        {
          id: "healthcare",
          title: "Healthcare",
          image: megaMenuHome8,
          alt: "mega-menu-home-8",
          href: "/healthcare"
        },
        {
          id: "financial-advisor",
          title: "Financial Advisor",
          image: megaMenuHome9,
          alt: "mega-menu-home-9",
          href: "/financial-advisor"
        },
        {
          id: "fitness",
          title: "Fitness",
          image: megaMenuHome10,
          alt: "mega-menu-home-10",
          href: "/fitness"
        },
        {
          id: "showcase",
          title: "Showcase",
          image: megaMenuShowcase,
          alt: "mega-menu-showcase",
          href: "/showcase"
        }
      ]
    },
    {
      id: "pages",
      title: "Pages",
      sections: [
        {
          id: "service-section",
          title: "Service",
          items: [
            { id: "service-default", title: "Service Default", href: "/service" },
            { id: "service-grid", title: "Service Grid", href: "/service-grid" },
            { id: "service-details", title: "Service Details", href: "/service-details" }
          ]
        },
        {
          id: "portfolio-section",
          title: "Portfolio",
          items: [
            { id: "portfolio-default", title: "Portfolio Default", href: "/portfolio" },
            { id: "portfolio-masonry", title: "Portfolio Masonry", href: "/portfolio-masonry" },
            { id: "portfolio-details", title: "Portfolio Details", href: "/portfolio-details" }
          ]
        },
        {
          id: "team-section",
          title: "Team",
          items: [
            { id: "team", title: "Team", href: "/team" },
            { id: "team-details", title: "Team Details", href: "/team-details" }
          ]
        }
      ],
      subItems: [
        { id: "faq", title: "FAQ", href: "/faq" },
        { id: "error-404", title: "Error 404", href: "/404" }
      ]
    },
    {
      id: "blog",
      title: "Blog",
      subItems: [
        {
          id: "blog-default",
          title: "Blog Default",
          href: "/blog"
        },
        {
          id: "blog-standard",
          title: "Blog Standard",
          href: "/blog-standard"
        },
        {
          id: "blog-grid",
          title: "Blog Grid",
          href: "/blog-grid"
        },
        {
          id: "blog-details",
          title: "Blog Details",
          href: "/blog-details"
        }
      ]
    },
    {
      id: "about-us",
      title: "About Us",
      href: "/about"
    },
    {
      id: "contact",
      title: "Contact",
      href: "/contact"
    }
  ],
  contactButton: {
    text: "Contact Us",
    href: "/contact",
    className: "common-btn square-btn"
  },
  currentYear: new Date().getFullYear()
};
