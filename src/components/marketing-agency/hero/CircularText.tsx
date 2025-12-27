"use client";

import React, { useEffect, useRef } from "react";
import { CircularTextProps } from "@/types/marketing-agency/hero";
import VideoModal from "./HeroModal";

const CircularText = ({
  content,
  videoId,
  className = "",
}: CircularTextProps) => {
  const textRef = useRef<HTMLDivElement>(null);

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
        <div 
          ref={textRef}
          className="circular-video-text" 
          data-content={content}
        >
          {content}&nbsp; {content}&nbsp; {content}
        </div>
        <VideoModal
          videoId={videoId}
          className="years popup-youtube bg-transparent"
        />
      </div>
    </div>
  );
};

export default CircularText;
