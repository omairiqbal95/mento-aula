import avatar1 from "@/assets/images/testimonial/avatar-1.png";
import avatar2 from "@/assets/images/testimonial/avatar-2.png";
import avatar3 from "@/assets/images/testimonial/avatar-3.png";
import avatar4 from "@/assets/images/testimonial/avatar-4.png";
import avatar5 from "@/assets/images/testimonial/avatar-5.png";
import avatar6 from "@/assets/images/testimonial/avatar-6.png";
import avatar7 from "@/assets/images/testimonial/avatar-7.png";
import avatar8 from "@/assets/images/testimonial/avatar-8.png";
import avatar9 from "@/assets/images/testimonial/avatar-9.png";
import avatar10 from "@/assets/images/testimonial/avatar-10.png";
import brand1 from "@/assets/images/testimonial/brandr-1.1.png";
import brand2 from "@/assets/images/testimonial/brandr-2.2.png";
import brand3 from "@/assets/images/testimonial/brandr-3.3.png";
import brand4 from "@/assets/images/testimonial/brandr-4.4.png";
import brand5 from "@/assets/images/testimonial/brandr-5.5.png";
import brand6 from "@/assets/images/testimonial/brandr-6.6.png";
import brand7 from "@/assets/images/testimonial/brandr-7.7.png";
import brand8 from "@/assets/images/testimonial/brandr-8.8.png";
import brand10 from "@/assets/images/testimonial/brandr-10.10.png";
import type { TestimonialContent } from "@/types/consultant-agency/testimonial";

export const testimonialContent: TestimonialContent = {
  sectionHeader: {
    subTitle: "Testimonial",
    title: "Our client's feedback"
  },
  columns: [
    {
      id: 1,
      items: [
        {
          id: 1,
          author: {
            name: "John Lanel",
            position: "CEO",
            avatar: avatar1
          },
          content: "Working with Unikon has been a game-changer for our company. Their expert insights and strategic planning have propelled us to new heights.",
          brandLogo: brand1
        },
        {
          id: 2,
          author: {
            name: "Linda Binti",
            position: "CEO",
            avatar: avatar6
          },
          content: "Their product development insights and market positioning strategies have resulted in a 20% increase in our market share.",
          brandLogo: brand1,
          delay: ".2"
        }
      ]
    },
    {
      id: 2,
      items: [
        {
          id: 3,
          author: {
            name: "Sarah Mim",
            position: "Marketing Director",
            avatar: avatar2
          },
          content: "The team's dedication and expertise have transformed our business operations. We've seen remarkable growth since partnering with them.",
          brandLogo: brand2,
          delay: ".4"
        },
        {
          id: 4,
          author: {
            name: "Michael Chen",
            position: "CTO",
            avatar: avatar3
          },
          content: "Outstanding technical consulting services. They helped us modernize our infrastructure and improve efficiency by 40%.",
          brandLogo: brand3,
          delay: ".6"
        }
      ]
    },
    {
      id: 3,
      items: [
        {
          id: 5,
          author: {
            name: "Emma Wilson",
            position: "Founder",
            avatar: avatar4
          },
          content: "Professional, reliable, and results-driven. Their strategic guidance has been invaluable to our startup's success.",
          brandLogo: brand4,
          delay: ".8"
        },
        {
          id: 6,
          author: {
            name: "David Rodriguez",
            position: "Operations Manager",
            avatar: avatar5
          },
          content: "Exceptional service quality and attention to detail. They truly understand our business needs and deliver beyond expectations.",
          brandLogo: brand5,
          delay: "1"
        }
      ]
    },
    {
      id: 4,
      items: [
        {
          id: 7,
          author: {
            name: "Lisa Thompson",
            position: "VP Sales",
            avatar: avatar7
          },
          content: "Their innovative approach and deep industry knowledge have helped us capture new market opportunities effectively.",
          brandLogo: brand6,
          delay: "1.2"
        },
        {
          id: 8,
          author: {
            name: "Robert Kim",
            position: "CFO",
            avatar: avatar8
          },
          content: "Cost-effective solutions with measurable ROI. Their financial consulting has optimized our budget allocation significantly.",
          brandLogo: brand7,
          delay: "1.4"
        }
      ]
    },
    {
      id: 5,
      items: [
        {
          id: 9,
          author: {
            name: "Jennifer Lee",
            position: "Product Manager",
            avatar: avatar9
          },
          content: "Collaborative partnership that drives innovation. Their insights have accelerated our product development timeline.",
          brandLogo: brand8,
          delay: "1.6"
        },
        {
          id: 10,
          author: {
            name: "Alex Johnson",
            position: "CEO",
            avatar: avatar10
          },
          content: "Transformative consulting experience. They've helped us scale our operations and enter new international markets successfully.",
          brandLogo: brand10,
          delay: "1.8"
        }
      ]
    }
  ]
};