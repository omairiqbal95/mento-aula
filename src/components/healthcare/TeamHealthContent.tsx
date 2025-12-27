"use client";
import React from "react";
import Link from "next/link";
import { teamHealthContent } from "@/content/healthcare/home/team-health";

interface TeamHealthContentProps {
  activeIndex: number;
}

const TeamHealthContent = ({ activeIndex }: TeamHealthContentProps) => {
  const { teamMembers } = teamHealthContent;

  return (
    <div className="team-health__slider-content">
      {teamMembers.map((member, index) => (
        <div
          key={member.id}
          className={`content ${index === activeIndex ? "active" : ""}`}
        >
          <h4 className="h4">{member.name}</h4>
          <p>{member.description}</p>
          <ul className="custom-ul">
            {member.features.map((feature, featureIndex) => (
              <li key={featureIndex}>{feature}</li>
            ))}
          </ul>
          <Link href={member.link} className="">
            Learn More
          </Link>
        </div>
      ))}
    </div>
  );
};

export default TeamHealthContent;
