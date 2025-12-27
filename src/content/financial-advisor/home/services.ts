import serviceImage1 from '@/assets/images/services/services-fin-1.png';
import serviceImage2 from '@/assets/images/services/services-fin-2.png';
import serviceImage3 from '@/assets/images/services/services-fin-3.png';
import serviceImage4 from '@/assets/images/services/services-fin-4.png';
import { ServicesContent } from '@/types/financial-advisor/services';

export const servicesContent: ServicesContent = {
  header: {
    title: 'Our Services',
    titleDelay: '.2',
    exploreButton: {
      text: 'Explore All',
      href: '/service',
      delay: '.4'
    }
  },
  services: [
    {
      id: 'financial-planning',
      title: 'Financial Planning',
      tags: [
        { name: 'Goal-Driven', href: '#' },
        { name: 'Comprehensive Guidance', href: '#' },
        { name: 'Holistic Planning', href: '#' }
      ],
      description: 'For businesses, Unikon offers specialized financial advisory services that include cash flow management, business growth strategies, and financial risk assessment.',
      buttonText: 'Discover More',
      buttonHref: '/service-details',
      image: serviceImage1
    },
    {
      id: 'investment-management',
      title: 'Investment Management',
      tags: [
        { name: 'Portfolio Optimization', href: '#' },
        { name: 'Risk Assessment', href: '#' },
        { name: 'Market Analysis', href: '#' }
      ],
      description: 'Our investment management services focus on building diversified portfolios tailored to your risk tolerance and financial objectives for long-term growth.',
      buttonText: 'Discover More',
      buttonHref: '/service-details',
      image: serviceImage2
    },
    {
      id: 'retirement-planning',
      title: 'Retirement Planning',
      tags: [
        { name: 'Future Security', href: '#' },
        { name: 'Tax Efficiency', href: '#' },
        { name: 'Income Strategies', href: '#' }
      ],
      description: 'Comprehensive retirement planning services to ensure you maintain your desired lifestyle throughout your golden years with strategic savings and investment approaches.',
      buttonText: 'Discover More',
      buttonHref: '/service-details',
      image: serviceImage3
    },
    {
      id: 'wealth-management',
      title: 'Wealth Management',
      tags: [
        { name: 'Asset Protection', href: '#' },
        { name: 'Estate Planning', href: '#' },
        { name: 'Legacy Building', href: '#' }
      ],
      description: 'Complete wealth management solutions including estate planning, tax optimization, and legacy preservation strategies for high-net-worth individuals and families.',
      buttonText: 'Discover More',
      buttonHref: '/service-details',
      image: serviceImage4
    }
  ]
};
