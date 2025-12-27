import React from "react";
import Image from "next/image";
import Link from "next/link";
import { TeamMember } from "@/types/inner-pages/team";

interface TeamCardProps {
  member: TeamMember;
}

const TeamCard: React.FC<TeamCardProps> = ({ member }) => {
  return (
    <div className="team__card">
      <div className="team__card-thumb">
        <Image src={member.image} alt={member.alt} />
        <ul className="custom-ul social-link">
          {member.socialLinks.map((social) => (
            <li key={social.id}>
              <a href={social.href}>
                <i className={social.icon}></i>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="team__card-content">
        <h6 className="h6">
          <Link href={member.href}>{member.name}</Link>
        </h6>
        <span>{member.position}</span>
      </div>
    </div>
  );
};

export default TeamCard;
