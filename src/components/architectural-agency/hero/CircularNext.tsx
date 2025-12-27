"use client";

import Link from "next/link";
import React, { useEffect, useRef } from "react";

interface CircularNextProps {
  targetId: string;
  text: string;
  className?: string;
}

const CircularNext: React.FC<CircularNextProps> = ({ targetId, text, className = "" }) => {
  const circleTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const circleText = circleTextRef.current;
    if (circleText) {
      const content = text;
      const fullText = `${content} ${" ".repeat(2)} `.repeat(3);

      circleText.innerHTML = "";

      for (let i = 0; i < fullText.length; i++) {
        const span = document.createElement("span");
        span.classList.add("rotate");
        span.innerHTML = fullText[i] === " " ? "&nbsp;" : fullText[i];
        span.style.transform = `rotate(${(360 / fullText.length) * i}deg)`;
        circleText.appendChild(span);
      }
    }
  }, [text]);

  return (
    <Link href={`#${targetId}`} className={`next-section section-link ${className}`}>
      <div
        className="circleNextText"
        ref={circleTextRef}
        data-content={text}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="72"
        height="72"
        viewBox="0 0 72 72"
        fill="none"
      >
        <path
          d="M49.0618 49.062L37.0618 61.062C36.9238 61.2 36.7555 61.3107 36.5725 61.3857C36.3895 61.4607 36.1948 61.5029 35.9998 61.5029C35.8048 61.5029 35.61 61.4637 35.427 61.3857C35.241 61.3107 35.0758 61.2 34.9378 61.062L22.9378 49.062C22.3528 48.477 22.3528 47.5259 22.9378 46.9409C23.5228 46.3559 24.4739 46.3559 25.0589 46.9409L34.4969 56.3789V12C34.4969 11.172 35.1689 10.5 35.9969 10.5C36.8249 10.5 37.4969 11.172 37.4969 12V56.3789L46.9348 46.9409C47.5198 46.3559 48.4709 46.3559 49.0559 46.9409C49.6409 47.5259 49.6468 48.474 49.0618 49.062Z"
          fill="currentColor"
        />
      </svg>
    </Link>
  );
};

export default CircularNext;
