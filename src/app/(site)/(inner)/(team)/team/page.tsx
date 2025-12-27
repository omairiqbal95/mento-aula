import React from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import TeamCard from "@/components/inner-pages/team/TeamCard";
import { teamContent } from "@/content/inner-pages/team";
import breadcrumbTeamImage from "@/assets/images/breadcrumb/breadcrumb-team.png";

const Team = () => {
  const { members } = teamContent;

  return (
    <>
      <Breadcrumb title="Team" backgroundImage={breadcrumbTeamImage} />
      <div className="team__area pt-150 pb-150">
        <div className="container">
          <div className="row g-4 gy-5">
            {members.map((member) => (
              <div
                key={member.id}
                className="col-md-6 col-lg-4 col-lg-3 fade_up_anim"
                data-delay={member.delay}
              >
                <TeamCard member={member} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Team;
