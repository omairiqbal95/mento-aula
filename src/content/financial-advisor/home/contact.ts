import { ContactContent } from '@/types/financial-advisor/contact';

export const contactContent: ContactContent = {
  sectionHeader: {
    title: 'contact us',
    animationDelay: '.1',
  },
  infoCards: [
    {
      id: 'contact-email',
      title: 'support@unikonagency.com',
      description: 'Mon - Fri from 10 AM to 7PM EST',
      iconKey: 'email',
      animationDelay: '.15',
    },
    {
      id: 'contact-phone',
      title: '800-349-9331',
      description: 'Mon - Fri from 10 AM to 7PM EST',
      iconKey: 'phone',
      animationDelay: '.25',
    },
    {
      id: 'contact-location',
      title: '69132 Legros Way, Maxworth 92',
      description: 'Unikon Agency Headquarter',
      iconKey: 'location',
      animationDelay: '.35',
    },
  ],
  arrowAnimationDelay: '.4',
  form: {
    action: '#',
    method: 'post',
    fields: [
      {
        id: 'name',
        name: 'userName',
        label: 'Full Name',
        placeholder: 'Type your full name here',
        type: 'text',
        animationDelay: '.45',
      },
      {
        id: 'email',
        name: 'email',
        label: 'Email Address',
        placeholder: 'Type email address here',
        type: 'email',
        animationDelay: '.55',
      },
      {
        id: 'company',
        name: 'companyName',
        label: 'Company Name',
        placeholder: 'Type company name here',
        type: 'text',
        animationDelay: '.65',
      },
      {
        id: 'message',
        name: 'message',
        label: 'Message',
        placeholder: 'Type message here',
        type: 'textarea',
        animationDelay: '.75',
      },
    ],
    submitButton: {
      text: 'Get Free Consultation',
      animationDelay: '.85',
      icon: 'arrow-right-five',
    },
  },
  currentYear: new Date().getFullYear(),
};
