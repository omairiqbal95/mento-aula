"use client";

import React, { useEffect, useRef } from "react";
import { CircularTextProps } from "@/types/legal-advisor/hero";

const CircularText = ({
  content,
  years,
  className = "",
}: CircularTextProps) => {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (textRef.current && content) {
      createCircularText(textRef.current, content, 3);
    }
  }, [content]);

  const createCircularText = (
    element: HTMLElement,
    content: string,
    repeatCount: number
  ) => {
    element.innerHTML = "";

    const fullText = `${content} ${" ".repeat(2)} `.repeat(repeatCount);

    for (let i = 0; i < fullText.length; i++) {
      const span = document.createElement("span");
      span.classList.add("rotate");
      span.innerHTML = fullText[i] === " " ? "&nbsp;" : fullText[i];
      span.style.transform = `rotate(${(360 / fullText.length) * i}deg)`;
      element.appendChild(span);
    }
  };

  return (
    <div className={`circular-text ${className}`}>
      <div className="circular-text-wrapper">
        <span
          ref={textRef}
          className="circular-text-content"
          data-content={content}
        ></span>
        <span className="years">{years}</span>
      </div>
    </div>
  );
};

export default CircularText;
