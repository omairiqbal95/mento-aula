import React from 'react';
import Image from 'next/image';
import { TeamProps } from '@/types/financial-advisor/team';
import { teamContent } from '@/content/financial-advisor/home/team';
import TeamSwiper from './TeamSwiper';

const Team: React.FC<TeamProps> = ({ className = "" }) => {
  return (
    <div className={`team-fin pb-150 ${className}`}>
      <div className="container container-2xl">
        <div className="row justify-content-between align-items-center gx-4">
          <div className="col-md-8">
            <h3
              className="h3 section__header-title-v9 fade_up_anim"
              data-delay={teamContent.sectionHeader.animationDelay}
            >
              {teamContent.sectionHeader.title}
            </h3>
          </div>
          <div className="col-md-4">
            <div
              className="team-fin__navigation fade_up_anim"
              data-delay=".4"
            >
              <div className="team-fin-prev common-btn__variation9 common-btn__variation9--extend">
                <Image
                  src={teamContent.navigation.prevIcon}
                  alt="Previous"
                />
              </div>
              <div className="team-fin-next common-btn__variation9 common-btn__variation9--extend">
                <Image
                  src={teamContent.navigation.nextIcon}
                  alt="Next"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row pt-100">
          <div className="col-12">
            <TeamSwiper members={teamContent.members} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;