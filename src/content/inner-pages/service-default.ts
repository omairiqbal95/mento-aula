import { ServiceDefaultContent } from '@/types/inner-pages/service-default';
import services1Image from '@/assets/images/services/services-1.png';
import services2Image from '@/assets/images/services/services-2.png';
import services3Image from '@/assets/images/services/services-3.png';
import services4Image from '@/assets/images/services/services-4.png';
import services5Image from '@/assets/images/services/services-5.png';
import services6Image from '@/assets/images/services/services-6.png';
import services7Image from '@/assets/images/services/services-7.png';

export const serviceDefaultContent: ServiceDefaultContent = {
  services: [
    {
      id: 'brand-design',
      number: '01',
      title: 'Brand Design',
      description: 'JKL Healthcare, a chain of healthcare clinics. Leverage data analytics to improve...',
      image: services1Image,
      detailsLink: '/service-details',
      animation: {
        thumb: 'fade_up_anim',
        number: 'fade_up_anim',
        title: 'fade_up_anim',
        description: 'fade_up_anim',
        button: 'fade_up_anim'
      }
    },
    {
      id: 'ui-ux-design',
      number: '02',
      title: 'UI/UX Design',
      description: 'JKL Healthcare, a chain of healthcare clinics. Leverage data analytics to improve marketing strategies and ROI.',
      image: services2Image,
      detailsLink: '/service-details',
      animation: {
        thumb: 'fade_up_anim',
        number: 'fade_up_anim',
        title: 'fade_up_anim',
        description: 'fade_up_anim',
        button: 'fade_up_anim'
      }
    },
    {
      id: 'development',
      number: '03',
      title: 'Development',
      description: 'JKL Healthcare, a chain of healthcare clinics. Leverage data analytics to improve marketing strategies and ROI.',
      image: services3Image,
      detailsLink: '/service-details',
      animation: {
        thumb: 'fade_up_anim',
        number: 'fade_up_anim',
        title: 'fade_up_anim',
        description: 'fade_up_anim',
        button: 'fade_up_anim'
      }
    },
    {
      id: 'marketing',
      number: '04',
      title: 'Marketing',
      description: 'JKL Healthcare, a chain of healthcare clinics. Leverage data analytics to improve marketing strategies and ROI.',
      image: services4Image,
      detailsLink: '/service-details',
      animation: {
        thumb: 'fade_up_anim',
        number: 'fade_up_anim',
        title: 'fade_up_anim',
        description: 'fade_up_anim',
        button: 'fade_up_anim'
      }
    },
    {
      id: 'illustration-design',
      number: '05',
      title: 'Illustration Design',
      description: 'JKL Healthcare, a chain of healthcare clinics. Leverage data analytics to improve marketing strategies and ROI.',
      image: services5Image,
      detailsLink: '/service-details',
      animation: {
        thumb: 'fade_up_anim',
        number: 'fade_up_anim',
        title: 'fade_up_anim',
        description: 'fade_up_anim',
        button: 'fade_up_anim'
      }
    },
    {
      id: 'motion-graphic',
      number: '06',
      title: 'Motion Graphic',
      description: 'JKL Healthcare, a chain of healthcare clinics. Leverage data analytics to improve marketing strategies and ROI.',
      image: services6Image,
      detailsLink: '/service-details',
      animation: {
        thumb: 'fade_up_anim',
        number: 'fade_up_anim',
        title: 'fade_up_anim',
        description: 'fade_up_anim',
        button: 'fade_up_anim'
      }
    },
    {
      id: 'motion-graphic-2',
      number: '07',
      title: 'Motion Graphic',
      description: 'JKL Healthcare, a chain of healthcare clinics. Leverage data analytics to improve marketing strategies and ROI.',
      image: services7Image,
      detailsLink: '/service-details',
      animation: {
        thumb: 'fade_up_anim',
        number: 'fade_up_anim',
        title: 'fade_up_anim',
        description: 'fade_up_anim',
        button: 'fade_up_anim'
      }
    }
  ],
  buttonText: 'View Details',
  currentYear: new Date().getFullYear()
};
