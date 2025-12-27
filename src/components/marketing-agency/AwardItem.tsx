import React from 'react';
import Image from 'next/image';
import { TypeAward } from '@/types/marketing-agency/awards';

const AwardItem: React.FC<TypeAward> = ({
  year,
  title,
  imageSrc,
  category,
  delay,
}) => {
  const delayString = delay > 0 ? `.${delay.toFixed(1)}s` : undefined;

  return (
    <div className="awards-mar__item fade_up_anim" data-delay={delayString}>
      <span className="item__content item__year">{year}</span>
      <p className="item__content item__title">{title}</p>
      <div className="item__content item__thumb">
        <Image
          src={imageSrc}
          alt={`${title} award`}
        />
      </div>
      <span className="item__content item__category">{category}</span>
    </div>
  );
};

export default AwardItem;