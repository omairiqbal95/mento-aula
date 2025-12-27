import logoLight from '@/assets/images/logo.svg';
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
import { HeaderContent } from '@/types/showcase/header';

export const headerContent: HeaderContent = {
  logo: {
    src: logoLight,
    alt: 'Unikon Logo',
    href: '/showcase'
  },
  navigation: [
    {
      id: 'home',
      title: 'Home',
      isMegaMenu: true,
      megaMenuItems: [
        {
          id: 'digital-agency',
          title: 'Digital Agency',
          href: '/digital-agency',
          image: megaMenuHome1
        },
        {
          id: 'marketing-agency',
          title: 'Marketing Agency',
          href: '/marketing-agency',
          image: megaMenuHome2
        },
        {
          id: 'startup-agency',
          title: 'Startup Agency',
          href: '/startup-agency',
          image: megaMenuHome3
        },
        {
          id: 'consultant-agency',
          title: 'Consultant Agency',
          href: '/consultant-agency',
          image: megaMenuHome4
        },
        {
          id: 'legal-advisor',
          title: 'Legal Advisor',
          href: '/legal-advisor',
          image: megaMenuHome6
        },
        {
          id: 'architectural-agency',
          title: 'Architectural Agency',
          href: '/architectural-agency',
          image: megaMenuHome7
        },
        {
          id: 'healthcare',
          title: 'Healthcare',
          href: '/healthcare',
          image: megaMenuHome8
        },
        {
          id: 'financial-advisor',
          title: 'Financial Advisor',
          href: '/financial-advisor',
          image: megaMenuHome9
        },
        {
          id: 'fitness',
          title: 'Fitness',
          href: '/fitness',
          image: megaMenuHome10
        },
        {
          id: 'showcase',
          title: 'Showcase',
          href: '/showcase',
          image: megaMenuShowcase,
          isActive: true
        }
      ]
    },
    {
      id: 'pages',
      title: 'Pages',
      sections: [
        {
          id: 'service-section',
          title: 'Service',
          items: [
            { id: 'service-default', title: 'Service Default', href: '/service' },
            { id: 'service-grid', title: 'Service Grid', href: '/service-grid' },
            { id: 'service-details', title: 'Service Details', href: '/service-details' }
          ]
        },
        {
          id: 'portfolio-section',
          title: 'Portfolio',
          items: [
            { id: 'portfolio-default', title: 'Portfolio Default', href: '/portfolio' },
            { id: 'portfolio-masonry', title: 'Portfolio Masonry', href: '/portfolio-masonry' },
            { id: 'portfolio-details', title: 'Portfolio Details', href: '/portfolio-details' }
          ]
        },
        {
          id: 'team-section',
          title: 'Team',
          items: [
            { id: 'team', title: 'Team', href: '/team' },
            { id: 'team-details', title: 'Team Details', href: '/team-details' }
          ]
        }
      ],
      items: [
        { id: 'faq', title: 'FAQ', href: '/faq' },
        { id: 'error-404', title: 'Error 404', href: '/404' }
      ]
    },
    {
      id: 'blog',
      title: 'Blog',
      subMenuItems: [
        { id: 'blog-default', title: 'Blog Default', href: '/blog' },
        { id: 'blog-standard', title: 'Blog Standard', href: '/blog-standard' },
        { id: 'blog-grid', title: 'Blog Grid', href: '/blog-grid' },
        { id: 'blog-details', title: 'Blog Details', href: '/blog-details' }
      ]
    },
    {
      id: 'about-us',
      title: 'About Us',
      href: '/about'
    },
    {
      id: 'contact',
      title: 'Contact',
      href: '/contact'
    }
  ],
  buttons: {
    mobile: {
      text: "Let's Talk",
      href: '/contact',
      className: 'common-btn outline-white'
    },
    desktop: {
      text: "Let's Talk",
      href: '/contact',
      className: 'common-btn outline-white'
    }
  },
  hamburgerButton: {
    spans: 3,
    className: 'side-panel__activator'
  }
};
