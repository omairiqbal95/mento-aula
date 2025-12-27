import heroTitleImage from '@/assets/images/hero/hero-fin-title-img.png';
import { HeroContent } from '@/types/financial-advisor/hero';

export const heroContent: HeroContent = {
  button: {
    text: 'Get Free Consultation',
    href: '/contact',
    delay: '.2'
  },
  description: 'Personalized Financial Planning & Investment Management',
  descriptionDelay: '.4',
  title: {
    text: 'GROWTH',
    titleImage: heroTitleImage
  }
};
