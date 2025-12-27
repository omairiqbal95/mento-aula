"use client";

import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { HeroStat } from "@/types/consultant-agency/hero";

interface HeroStatsProps {
  stats: HeroStat[];
}

const HeroStats = ({ stats }: HeroStatsProps) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <div className="hero-ca__kits" ref={ref}>
      {stats.map((stat, index) => (
        <div 
          key={index}
          className="kit counter-item fade_up_anim" 
          data-delay={stat.delay}
        >
          <div className="percentage">
            <CountUp
              start={0}
              end={inView ? stat.value : 0}
              duration={2.5}
              className="odometer"
            />
            &nbsp;%
          </div>
          <p>{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default HeroStats;
