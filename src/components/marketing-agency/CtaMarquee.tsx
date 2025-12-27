"use client";
import React from "react";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { TypeMarqueeLink } from "@/types/marketing-agency/cta";
import { CONSTANT_CTA_MARQUEE_DATA } from "@/content/marketing-agency/home/cta";

const MarqueeContent: React.FC<TypeMarqueeLink> = ({ text, href }) => (
  <h2 className="h2">
    {Array.from({ length: 5 }).map((_, i) => (
      <React.Fragment key={i}>
        <span className="inline-flex items-center gap-1">
          <Link href={href}>{text}</Link>
        </span>
        <i className="bi bi-arrow-up-right"></i>
      </React.Fragment>
    ))}
  </h2>
);

const CtaMarquee = () => {
  const { linkData, speed } = CONSTANT_CTA_MARQUEE_DATA;
  return (
    <div className="cta-mar__area">
      <Marquee
        speed={speed}
        gradient={false}
        pauseOnHover={false}
        className="text-slide gap-5"
      >
        <MarqueeContent {...linkData} />
      </Marquee>
    </div>
  );
};

export default CtaMarquee;
