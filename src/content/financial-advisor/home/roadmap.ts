import roadmapIcon1 from '@/assets/images/roadmap/roadmap-fin-1.png';
import roadmapIcon2 from '@/assets/images/roadmap/roadmap-fin-2.png';
import roadmapIcon3 from '@/assets/images/roadmap/roadmap-fin-3.png';
import roadmapIcon4 from '@/assets/images/roadmap/roadmap-fin-4.png';
import { RoadmapContent } from '@/types/financial-advisor/roadmap';

export const roadmapContent: RoadmapContent = {
  sectionHeader: {
    title: 'The Roadmap to Your Financial Goals',
    description: 'Our dedicated process ensures your financial success through personalized planning, strategic implementation, and ongoing support.'
  },
  items: [
    {
      id: 'consultation',
      icon: roadmapIcon1,
      title: 'Initial Consultation',
      description: 'We begin with a complimentary initial consultation to understand your financial goals, current situation.',
      delay: '.2'
    },
    {
      id: 'planning',
      icon: roadmapIcon2,
      title: 'Customized Financial Plan',
      description: 'We develop a personalized financial plan that outlines strategies and solutions to help you achieve your goals.',
      delay: '.4'
    },
    {
      id: 'implementation',
      icon: roadmapIcon3,
      title: 'Implementation',
      description: 'This may involve setting up investments accounts, or adjusting your estate planning documents.',
      delay: '.6'
    },
    {
      id: 'monitoring',
      icon: roadmapIcon4,
      title: 'Monitoring and Support',
      description: 'We continuously monitor your plans and provide regular updates and reviews to ensure you stay on track.',
      delay: '.8'
    }
  ]
};
