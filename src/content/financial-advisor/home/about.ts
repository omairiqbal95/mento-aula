import { AboutContent } from '@/types/financial-advisor/about';

export const aboutContent: AboutContent = {
  subHeading: 'ABOUT US',
  experience: {
    years: new Date().getFullYear() - 2008, // Dynamic calculation from 2008 to current year
    label: 'YEARS OF EXPERIENCE'
  },
  title: 'We believe that financial success starts with sound advice and clear vision.',
  description: 'Our mission is to empower individuals and businesses to achieve their financial goals through personalized, strategic guidance.',
  buttonText: 'About Us',
  buttonHref: '/about-us'
};
