"use client";
import React from "react";
import CounterItem from "./CounterItem";
import { useInView } from "react-intersection-observer";
import { CounterItem as CounterItemType } from "@/types/fitness/about";

interface AboutCountersProps {
  counters: CounterItemType[];
}

const AboutCounters: React.FC<AboutCountersProps> = ({ counters }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <div className="about-fit__counters" ref={ref}>
      {counters.map((counter) => (
        <CounterItem key={counter.id} counter={counter} inView={inView} />
      ))}
    </div>
  );
};

export default AboutCounters;
