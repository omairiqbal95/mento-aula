"use client";

import React from "react";
import CountUp from "react-countup";
import { CounterItem as CounterItemType } from "@/types/fitness/about";

interface CounterItemProps {
  counter: CounterItemType;
  inView: boolean;
}

const CounterItem = ({ counter, inView }: CounterItemProps) => {
  return (
    <div
      className="about-fit__counters-item fade_up_anim"
      data-delay={counter.delay}
    >
      <div className="counter">
        <h3 className="h3">
          <span className="odometer" data-odometer-final={counter.value}>
            <CountUp
              start={0}
              end={inView ? counter.value : 0}
              duration={2.5}
              separator=","
            />
          </span>
          <em>{counter.suffix}</em>
        </h3>
        <p className="info">{counter.label}</p>
      </div>
    </div>
  );
};

export default CounterItem;
