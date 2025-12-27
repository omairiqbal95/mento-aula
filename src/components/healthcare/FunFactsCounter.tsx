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
    const currentElement = countRef.current;

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

              // Easing function for smooth animation
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

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [end, duration, hasAnimated]);

  return (
    <span ref={countRef} className="odometer">
      {count}
    </span>
  );
};

interface FunFactItem {
  id: number;
  number: number;
  suffix: string;
  label: string;
  delay: string;
}

interface FunFactsCounterProps {
  items: FunFactItem[];
}

const FunFactsCounter: React.FC<FunFactsCounterProps> = ({ items }) => {
  return (
    <div className="funfacts-health__items">
      {items.map((item) => (
        <div
          key={item.id}
          className="funfacts-health__item fade_up_anim"
          data-delay={item.delay}
        >
          <div className="inner-content">
            <h2 className="h2">
              <Counter end={item.number} />
              <em>{item.suffix}</em>
            </h2>
            <p>{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FunFactsCounter;
