"use client";

import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

interface CounterProps {
  number: string;
}

const Counter = ({ number }: CounterProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <span className="counter" ref={ref}>
      {inView ? (
        <CountUp end={parseInt(number)} duration={2.5} />
      ) : (
        '0'
      )}
    </span>
  );
};

export default Counter;
