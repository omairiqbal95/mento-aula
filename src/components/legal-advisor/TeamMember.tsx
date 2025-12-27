"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TeamMember as TeamMemberType } from '@/types/legal-advisor/team';

interface TeamMemberProps {
  member: TeamMemberType;
}

const TeamMember = ({ member }: TeamMemberProps) => {
  const handleMouseEnter = (e: React.MouseEvent) => {
    if (window.innerWidth > 1319) {
      const beforeElement = e.currentTarget as HTMLElement;
      const teamItem = beforeElement.closest('.team-la__item') as HTMLElement;
      const afterElement = teamItem?.querySelector('.team-la__item-after') as HTMLElement;
      
      if (teamItem) {
        teamItem.classList.add('rotate-item-anticlockwise');
      }
      if (afterElement) {
        afterElement.classList.add('rotate-item-clockwise');
      }
    }
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (window.innerWidth > 1319) {
      const beforeElement = e.currentTarget as HTMLElement;
      const teamItem = beforeElement.closest('.team-la__item') as HTMLElement;
      const afterElement = teamItem?.querySelector('.team-la__item-after') as HTMLElement;
      
      if (teamItem) {
        teamItem.classList.remove('rotate-item-anticlockwise');
      }
      if (afterElement) {
        afterElement.classList.remove('rotate-item-clockwise');
      }
    }
  };

  return (
    <>
      <div 
        className="team-la__item-before"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      ></div>
      <span 
        className="team-la__item-after"
        style={{
          backgroundImage: `url(${member.backgroundImage.src})`
        }}
      ></span>
      <div className="author">
        <figure className="author__avatar">
          <Image
            src={member.authorImage}
            alt={member.name}
            width={80}
            height={80}
          />
        </figure>
        <div className="author__info">
          <h5 className="h5 author__title">
            <Link href="#">{member.name}</Link>
          </h5>
          <p className="author__designation">{member.position}</p>
        </div>
      </div>
      <div className="team-la__item-content">
        <p>{member.description}</p>
        <ul className="custom-ul team-la__item-social">
          {member.socialLinks.map((social) => (
            <li key={social.id}>
              <Link href={social.url} aria-label={social.platform}>
                <i className={social.icon}></i>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

TeamMember.displayName = 'TeamMember';

export default TeamMember;