import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { TeamMember } from "@/types/consultant-agency/team";

interface TeamCardProps {
  member: TeamMember;
}

const TeamCard = ({ member }: TeamCardProps) => {
  return (
    <div 
      className="col-sm-6 col-md-4 col-lg-6 col-xxl-4 fade_up_anim"
      data-delay={member.delay || undefined}
    >
      <div className="team__card">
        <div className="team__card-thumb">
          <Image
            src={member.image}
            alt={`${member.name} - ${member.position}`}
          />
          <ul className="custom-ul social-link">
            {member.socialLinks.map((social) => (
              <li key={social.id}>
                <Link href={social.url}>
                  <i className={social.icon}></i>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="team__card-content">
          <h6 className="h6">
            <Link href={member.profileUrl}>{member.name}</Link>
          </h6>
          <span>{member.position}</span>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
