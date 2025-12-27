import arrowLeft from '@/assets/images/icon/arrow-left.png';
import arrowRight from '@/assets/images/icon/arrow-right.png';
import { TestimonialContent } from '@/types/financial-advisor/testimonial';

export const testimonialContent: TestimonialContent = {
  sectionHeader: {
    title: "What Our Clients Say",
    description: "Our clients' success stories speak volumes about our commitment to providing exceptional financial advice.",
    titleAnimationDelay: ".2",
    descriptionAnimationDelay: ".4"
  },
  navigation: {
    prevIcon: arrowLeft,
    nextIcon: arrowRight
  },
  testimonials: [
    {
      id: 1,
      name: "Jessica Luise",
      date: "09/07/24",
      content: "Working with the team at Unikon has been a game-changer for my financial future. Johnathan and Sarah provided personalized advice that helped me optimize my retirement plan.",
      rating: {
        value: 4.5,
        maxValue: 5
      }
    },
    {
      id: 2,
      name: "Michael Thompson",
      date: "15/06/24",
      content: "The financial planning services exceeded my expectations. Their comprehensive approach to investment management has significantly improved my portfolio performance.",
      rating: {
        value: 5,
        maxValue: 5
      }
    },
    {
      id: 3,
      name: "Sarah Rodriguez",
      date: "22/05/24",
      content: "Professional, knowledgeable, and truly caring about their clients' success. The team helped me navigate complex financial decisions with confidence.",
      rating: {
        value: 4.5,
        maxValue: 5
      }
    },
    {
      id: 4,
      name: "David Chen",
      date: "03/05/24",
      content: "Outstanding service and expertise. Their strategic financial advice has helped me achieve my long-term investment goals ahead of schedule.",
      rating: {
        value: 5,
        maxValue: 5
      }
    },
    {
      id: 5,
      name: "Emily Johnson",
      date: "18/04/24",
      content: "Highly recommend their services. The personalized approach and attention to detail in financial planning is exceptional.",
      rating: {
        value: 4.5,
        maxValue: 5
      }
    },
    {
      id: 6,
      name: "Robert Wilson",
      date: "10/04/24",
      content: "The best financial advisors I've worked with. Their innovative strategies and market insights have been invaluable for my business growth.",
      rating: {
        value: 5,
        maxValue: 5
      }
    }
  ],
  currentYear: new Date().getFullYear()
};
