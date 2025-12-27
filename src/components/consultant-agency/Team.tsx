import React from "react";
import { teamContent } from "@/content/consultant-agency/home/team";
import TeamCard from "./TeamCard";

const Team = () => {
  return (
    <div className="team-ca__area pt-150 pb-150">
      <div className="container container-4xl border-grid-px">
        <div className="row gy-5 justify-content-between">
          <div className="col-lg-5 col-xxl-3 section__header">
            <span className="section__header-sub-title-frontLine fade_up_anim"></span>
            <span
              className="section__header-sub-title-v2 fade_up_anim"
              data-delay=".2"
            >
              {teamContent.sectionHeader.subTitle}
            </span>
            <h3
              className="h3 section__header-title-v2--extend fade_up_anim"
              data-delay=".4"
            >
              {teamContent.sectionHeader.title}
            </h3>
            <p className="p-mini fade_up_anim" data-delay=".8">
              {teamContent.sectionHeader.description}
            </p>
          </div>
          <div className="col-lg-7 col-xxl-8">
            <div className="row gy-5 g-xxl-5">
              {teamContent.members.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
