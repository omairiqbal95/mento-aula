"use client";
import { useEffect, useRef, useState } from "react";

interface FunFact {
  label: string;
  value: number;
}

interface FunFactsCounterProps {
  funFacts: FunFact[];
}

const FunFactsCounter: React.FC<FunFactsCounterProps> = ({ funFacts }) => {
  const [counters, setCounters] = useState(funFacts.map(() => 0));
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            animateCounters();
          }
        });
      },
      { threshold: 0.3 }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
      // Cleanup all timers
      timersRef.current.forEach((timer) => clearInterval(timer));
      timersRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animateCounters = () => {
    funFacts.forEach((fact, index) => {
      const duration = 2000;
      const steps = 60;
      const increment = fact.value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= fact.value) {
          current = fact.value;
          clearInterval(timer);
        }
        setCounters((prev) => {
          const newCounters = [...prev];
          newCounters[index] = Math.floor(current);
          return newCounters;
        });
      }, duration / steps);
      
      // Store timer reference for cleanup
      timersRef.current.push(timer);
    });
  };

  return (
    <div className="row g-4 mt-80" ref={sectionRef}>
      <div className="col-12">
        <div className="about-ad__funfacts">
          {funFacts.map((fact, index) => (
            <div
              key={index}
              className="funfact fade_up_anim"
              data-delay={`.${(index + 1) * 2}`}
            >
              <div className="funfact__wrapper">
                <p>{fact.label}</p>
                <h2 className="h2 odometer">{counters[index]}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FunFactsCounter;
