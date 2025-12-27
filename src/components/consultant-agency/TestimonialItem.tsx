import React from "react";
import Image from "next/image";
import type { TestimonialItem as TestimonialItemType } from "@/types/consultant-agency/testimonial";

interface TestimonialItemProps {
  item: TestimonialItemType;
}

const TestimonialItem = ({ item }: TestimonialItemProps) => {
  return (
    <div 
      className="testimonial-ca__item fade_up_anim"
      data-delay={item.delay || undefined}
    >
      <div className="testimonial-ca__item-author">
        <figure className="testimonial-ca__item-author-avatar">
          <Image
            src={item.author.avatar}
            alt={`${item.author.name} avatar`}
          />
        </figure>
        <div className="testimonial-ca__item-author-info">
          <h6 className="h6 title">{item.author.name}</h6>
          <p>{item.author.position}</p>
        </div>
      </div>
      <p className="testimonial-ca__item-content">
        &ldquo;{item.content}&rdquo;
      </p>
      <div className="testimonial-ca__item-footer">
        <Image
          src={item.brandLogo}
          alt="brand logo"
        />
      </div>
    </div>
  );
};

export default TestimonialItem;
