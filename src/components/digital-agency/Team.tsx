import React from "react";
import { teamData } from "@/content/digital-agency/home/team";
import TeamSlider from "./TeamSlider";

const Team = () => {
  return (
    <div className="team-digital pb-150">
      <div className="container container-fitness">
        <div className="row">
          <div className="col-12">
            <div className="section__header-v12">
              <h2 className="h2 section__header-title-v12 fade_up_anim">
                {teamData.sectionTitle}
              </h2>
              <p className="fade_up_anim" data-delay=".4">
                {teamData.sectionDescription}
              </p>
            </div>
          </div>
        </div>
        <div className="row pt-100">
          <div className="col-12">
            <TeamSlider
              teamMembers={teamData.teamMembers}
              navigationIcons={teamData.navigationIcons}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
