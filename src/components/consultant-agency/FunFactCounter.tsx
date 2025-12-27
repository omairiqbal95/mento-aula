"use client";

import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

interface FunFactCounterProps {
  value: number;
  suffix: string;
}

const FunFactCounter = ({ value, suffix }: FunFactCounterProps) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <h3 className="h3 funfact__count" ref={ref}>
      <span className="odometer">
        <CountUp
          start={0}
          end={inView ? value : 0}
          duration={2.5}
        />
      </span>
      &nbsp;{suffix}
    </h3>
  );
};

export default FunFactCounter;
