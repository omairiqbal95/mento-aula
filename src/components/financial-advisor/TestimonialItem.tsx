import React from 'react';
import { TestimonialItemProps } from '@/types/financial-advisor/testimonial';
import QuoteIcon from '@/icons/QuoteIcon';

const TestimonialItem: React.FC<TestimonialItemProps> = ({ testimonial }) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(testimonial.rating.value);
    const hasHalfStar = testimonial.rating.value % 1 !== 0;
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <li key={`full-${i}`}>
          <i className="fa-solid fa-star"></i>
        </li>
      );
    }
    
    // Half star
    if (hasHalfStar) {
      stars.push(
        <li key="half">
          <i className="fa-regular fa-star-half-stroke"></i>
        </li>
      );
    }
    
    // Empty stars
    const emptyStars = testimonial.rating.maxValue - Math.ceil(testimonial.rating.value);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <li key={`empty-${i}`}>
          <i className="fa-regular fa-star"></i>
        </li>
      );
    }
    
    return stars;
  };

  return (
    <div className="testimonial-fin__item">
      <div className="flex-grow-1">
        <div className="testimonial-fin__item-header">
          <h6 className="h6 testimonial-fin__item-title">
            {testimonial.name}
          </h6>
          <span className="testimonial-fin__item-date">
            {testimonial.date}
          </span>
        </div>
        <div className="testimonial-fin__item-body">
          <p>{'\u201C'}{testimonial.content}{'\u201D'}</p>
        </div>
      </div>
      <div className="testimonial-fin__item-footer">
        <ul className="custom-ul testimonial-fin__item-ratings">
          {renderStars()}
        </ul>
        <QuoteIcon />
      </div>
    </div>
  );
};

export default TestimonialItem;
