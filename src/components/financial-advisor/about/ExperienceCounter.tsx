"use client";

import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

interface ExperienceCounterProps {
  years: number;
  label: string;
}

const ExperienceCounter = ({ years, label }: ExperienceCounterProps) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <div className="about-fin__experience" ref={ref}>
      <h3 className="h3 experience">
        <CountUp
          start={0}
          end={inView ? years : 0}
          duration={2.5}
          className="odometer odometer-auto-theme"
        />
        <em>+</em>
      </h3>
      <p className="info">{label}</p>
    </div>
  );
};

export default ExperienceCounter;
