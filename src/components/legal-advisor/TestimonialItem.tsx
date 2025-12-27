import React from 'react';
import Image from 'next/image';
import { TestimonialItem as TestimonialItemType } from '@/types/legal-advisor/testimonial';

interface TestimonialItemProps {
  item: TestimonialItemType;
}

const TestimonialItem = ({ item }: TestimonialItemProps) => {
  return (
    <div className="swiper-slide testimonial-la__slider-item">
      <div className="author">
        <figure className="author__avatar">
          <Image
            src={item.author.avatar}
            alt={item.author.name}
          />
        </figure>
        <div className="author__info">
          <h6 className="h6 author__title">{item.author.name}</h6>
          <p className="author__designation">
            {item.author.designation}
          </p>
        </div>
      </div>
      <div className="author__testimonial pt-65">
        &ldquo;{item.testimonial}&rdquo;
      </div>
    </div>
  );
};

export default TestimonialItem;
