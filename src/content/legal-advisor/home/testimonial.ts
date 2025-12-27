import testimonialAuthor1 from '@/assets/images/testimonial/testimonial-digital-author-1.png';
import testimonialAuthor2 from '@/assets/images/testimonial/testimonial-digital-author-2.png';
import testimonialAuthor3 from '@/assets/images/testimonial/testimonial-digital-author-3.png';
import { TestimonialContent } from '@/types/legal-advisor/testimonial';

export const testimonialContent: TestimonialContent = {
  items: [
    {
      id: 1,
      author: {
        id: 1,
        name: 'Adam Morkle',
        designation: 'Creative Director of ABC Technology',
        avatar: testimonialAuthor1,
      },
      testimonial: 'Unikon has been an invaluable partner in protecting my intellectual property. Their in-depth knowledge and approach have saved me from potential legal pitfalls.',
    },
    {
      id: 2,
      author: {
        id: 2,
        name: 'Sarah Johnson',
        designation: 'CEO of Tech Innovations',
        avatar: testimonialAuthor2,
      },
      testimonial: 'The legal expertise provided by Unikon is exceptional. They guided us through complex regulatory challenges with professionalism and clarity.',
    },
    {
      id: 3,
      author: {
        id: 3,
        name: 'Michael Chen',
        designation: 'Founder of Digital Solutions',
        avatar: testimonialAuthor3,
      },
      testimonial: 'Outstanding legal services! Unikon\'s team helped us navigate international business law with confidence and precision.',
    },
    {
      id: 4,
      author: {
        id: 4,
        name: 'Emily Rodriguez',
        designation: 'Legal Counsel at StartupCorp',
        avatar: testimonialAuthor1,
      },
      testimonial: 'Professional, reliable, and highly knowledgeable. Unikon consistently delivers excellent legal advice tailored to our business needs.',
    },
  ],
};
