"use client";
import React from "react";
import { aboutData } from "@/content/digital-agency/home/about";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const FunFact = ({ delay = 1 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const delayString = delay > 0 ? `.${delay.toFixed(1)}s` : 0;
  return (
    <div className="funfact-digital pt-100" data-delay={delayString} ref={ref}>
      <div className="container container-mini">
        <div className="row g-4">
          {aboutData.funFacts.map((fact, index) => (
            <div
              key={index}
              className="col-sm-6 col-lg-3 funfact-digital__item fade_up_anim"
              data-delay={fact.delay}
            >
              <div className="counter funfact-digital__counter">
                <h3 className="h3">
                  <span className="odometer" data-odometer-final={fact.value}>
                    <CountUp
                      start={0}
                      end={inView ? fact.value : 0}
                      duration={2.5}
                      separator=","
                    />
                  </span>
                  <em>{fact.suffix}</em>
                </h3>
                <p className="info">{fact.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FunFact;
