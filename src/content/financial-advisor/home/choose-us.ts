import chooseUsImage from '@/assets/images/choose-us/choose-us-fin.png';
import { ChooseUsContent } from '@/types/financial-advisor/choose-us';

export const chooseUsContent: ChooseUsContent = {
  header: {
    title: 'Empowering Your Financial Journey with Expert Guidance',
    titleDelay: '.2',
    description: 'We are dedicated to empowering your financial journey with expert guidance every step of the way. Our team of seasoned financial advisors brings a wealth of knowledge and experience.',
    descriptionDelay: '.4'
  },
  tabs: [
    {
      id: 'strategies',
      title: 'Personalized Strategies',
      content: 'We are dedicated to empowering your financial journey with expert guidance every step of the way. Our team of seasoned financial advisors develops customized strategies tailored to your unique financial goals and circumstances.',
      isActive: true
    },
    {
      id: 'approach',
      title: 'Client-Centered Approach',
      content: 'We are dedicated to empowering your financial journey with expert guidance every step of the way. Our team of seasoned financial advisors puts your needs first, ensuring every recommendation aligns with your best interests.',
      isActive: false
    },
    {
      id: 'achievement',
      title: 'Goal Achievement',
      content: 'We are dedicated to empowering your financial journey with expert guidance every step of the way. Our team of seasoned financial advisors works tirelessly to help you achieve your financial milestones and long-term objectives.',
      isActive: false
    }
  ],
  video: {
    image: chooseUsImage,
    videoId: '3qyhgV0Zew0',
    altText: 'Financial guidance video'
  }
};
