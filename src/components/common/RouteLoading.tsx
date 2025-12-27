"use client";

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const RouteLoading = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGPathElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const svg = svgRef.current;
    if (!svg || !containerRef.current || !textRef.current) return;
    
    const tl = gsap.timeline();
    
    const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
    const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

    tl.to(textRef.current, {
      delay: 2.5,
      y: -100,
      opacity: 0,
      duration: 0.2,
    })
    .to(svg, {
      duration: 0.15,
      attr: { d: curve },
      ease: "power2.easeIn",
    })
    .to(svg, {
      duration: 0.15,
      attr: { d: flat },
      ease: "power2.easeOut",
    })
    .to(containerRef.current, {
      duration: 0.2,
      y: -1500,
      ease: "power2.easeInOut",
    })
    .set(containerRef.current, {
      zIndex: -1,
      display: "none",
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="preloader">
      <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <path ref={svgRef} d="M0,1005S175,995,500,995s500,5,500,5V0H0Z"></path>
      </svg>
      <h5 ref={textRef} className="preloader-text">Unikon</h5>
    </div>
  )
}

export default RouteLoading;
