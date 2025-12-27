import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TeamSliderItemProps } from '@/types/financial-advisor/team';

const TeamSliderItem: React.FC<TeamSliderItemProps> = ({ member }) => {
  return (
    <div className="team-fin__slider-item">
      <ul className="custom-ul team-fin__slider-social">
        {member.socialLinks.map((social, index) => (
          <li key={index}>
            <Link href={social.url}>
              <i className={social.iconClass}></i>
            </Link>
          </li>
        ))}
      </ul>
      <figure className="team-fin__slider-thumb">
        <Image
          src={member.image}
          alt={member.name}
          className="img-move"
        />
      </figure>
      <div className="team-fin__slider-content">
        <p>{member.position}</p>
        <h6 className="h6 team-fin__slider-title">
          <Link href={member.detailsUrl}>{member.name}</Link>
        </h6>
      </div>
    </div>
  );
};

export default TeamSliderItem;
