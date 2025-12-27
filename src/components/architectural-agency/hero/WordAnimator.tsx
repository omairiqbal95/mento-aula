"use client";

import React, { useEffect, useRef } from "react";

interface WordAnimatorProps {
  lines: string[];
  delayStep?: number; // milliseconds between each line animation
}

const WordAnimator: React.FC<WordAnimatorProps> = ({ lines, delayStep = 200 }) => {
  const spansRef = useRef<HTMLSpanElement[]>([]);
  spansRef.current = [];

  const setSpanRef = (el: HTMLSpanElement | null, index: number) => {
    if (el) {
      spansRef.current[index] = el;
    }
  };

  useEffect(() => {
    spansRef.current.forEach((el, index) => {
      const timeout = setTimeout(() => {
        el.classList.add("animate");
      }, index * delayStep);
      return () => clearTimeout(timeout);
    });
  }, [delayStep, lines]);

  return (
    <>
      {lines.map((line, idx) => (
        <span
          key={idx}
          className="word-animation"
          ref={(el) => setSpanRef(el, idx)}
        >
          {line}
        </span>
      ))}
    </>
  );
};

export default WordAnimator;
