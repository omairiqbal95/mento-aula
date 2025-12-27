"use client";
import { useEffect, useRef, useState } from "react";

interface CounterProps {
  end: number;
  duration?: number;
}

const Counter: React.FC<CounterProps> = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const currentRef = countRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);

            const startTime = Date.now();
            const startValue = 0;
            const endValue = end;

            const animate = () => {
              const now = Date.now();
              const progress = Math.min((now - startTime) / duration, 1);

              const easeOutQuart = 1 - Math.pow(1 - progress, 4);
              const current = Math.floor(
                startValue + (endValue - startValue) * easeOutQuart
              );

              setCount(current);

              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };

            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [end, duration, hasAnimated]);

  return (
    <span ref={countRef} className="odometer">
      {count}
    </span>
  );
};

interface FunFact {
  id: number;
  number: number;
  suffix: string;
  label: string;
  delay: string;
}

interface AboutCounterProps {
  funFacts: FunFact[];
}

const AboutCounter: React.FC<AboutCounterProps> = ({ funFacts }) => {
  return (
    <div className="row g-4 justify-content-between pt-72">
      {funFacts.map((fact) => (
        <div
          key={fact.id}
          className="col-md-4 fade_up_anim"
          data-delay={fact.delay}
        >
          <div className="fun-fact__item">
            <h2 className="h2 counter-item">
              <Counter end={fact.number} />
              <span className="count-extra-info">{fact.suffix}</span>
            </h2>
            <span className="info">{fact.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AboutCounter;
