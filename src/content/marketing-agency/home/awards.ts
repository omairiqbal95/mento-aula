import { TypeAwardsSectionProps } from "@/types/marketing-agency/awards";

import AWARD_1_IMG from '@/assets/images/awards/awards-mar-1.png';
import AWARD_2_IMG from '@/assets/images/awards/awards-mar-2.png';
import AWARD_3_IMG from '@/assets/images/awards/awards-mar-3.png';
import AWARD_4_IMG from '@/assets/images/awards/awards-mar-4.png';
import AWARD_5_IMG from '@/assets/images/awards/awards-mar-5.png';
import AWARD_6_IMG from '@/assets/images/awards/awards-mar-6.png';


export const CONSTANT_AWARDS_DATA: TypeAwardsSectionProps = {
  header: {
    subTitle: "AWARDS & RECOGNITION",
    title: "Our Achievements",
  },
  awards: [
    {
      id: 1,
      year: 2023,
      title: "Best content marketing",
      imageSrc: AWARD_1_IMG,
      category: "Clutch",
      delay: 0,
    },
    {
      id: 2,
      year: 2023,
      title: "Content marketing excellence",
      imageSrc: AWARD_2_IMG,
      category: "The Forrester",
      delay: 0.2,
    },
    {
      id: 3,
      year: 2022,
      title: "Best healthcare analytics",
      imageSrc: AWARD_3_IMG,
      category: "Digiday",
      delay: 0.4,
    },
    {
      id: 4,
      year: 2021,
      title: "Best social media campaign",
      imageSrc: AWARD_4_IMG,
      category: "Clutch",
      delay: 0.6,
    },
    {
      id: 5,
      year: 2020,
      title: "Top user experience research",
      imageSrc: AWARD_5_IMG,
      category: "Awwwards",
      delay: 0.8,
    },
    {
      id: 6,
      year: 2020,
      title: "Year of influence marketing",
      imageSrc: AWARD_6_IMG,
      category: "Smmworld",
      delay: 1.0,
    },
  ],
};