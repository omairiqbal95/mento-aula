import React from 'react';
import { AboutFunFact } from '@/types/legal-advisor/about';
import Counter from './Counter';

interface FunFactItemProps {
  funFact: AboutFunFact;
}

const FunFactItem = ({ funFact }: FunFactItemProps) => {
  return (
    <div className="funfacts__item fade_up_anim" data-delay={funFact.delay}>
      <div className="inner-content">
        <h4 className="h4">
          <Counter number={funFact.number} />
          <span>+</span>
        </h4>
        <p>{funFact.label}</p>
      </div>
    </div>
  );
};

export default FunFactItem;
