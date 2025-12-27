"use client";
import React from 'react';
import { useInView } from 'react-intersection-observer'; 
import CountUp from 'react-countup';
import { TypeFunFact } from '@/types/marketing-agency/choose-us'; 

const TypeFunFactItem: React.FC<TypeFunFact> = ({ finalValue, suffix, label, delay }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,           
    threshold: 0.5,              
  });

  const delayString = delay > 0 ? `.${delay.toFixed(1)}s` : undefined;

  return (
   
      <div className="funfact-mar__item"data-delay={delayString}
      ref={ref} >
        <h3 className="h3">
          
          <span className="odometer" data-odometer-final={finalValue}>
            <CountUp
              start={0}
              end={inView ? finalValue : 0} 
              duration={2.5} 
              separator="," 
            />
          </span>
          
          <em>{suffix}</em>
        </h3>
        <p className="info">{label}</p>
      </div>
   
  );
};

export default TypeFunFactItem;