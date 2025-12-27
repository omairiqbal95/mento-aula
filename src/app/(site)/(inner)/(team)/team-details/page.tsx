import React from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import breadcrumbTeamImage from "@/assets/images/breadcrumb/breadcrumb-team.png";
import TeamDetails from "@/components/inner-pages/TeamDetails";

const Team = () => {

  return (
    <>
      <Breadcrumb title="Team Details" backgroundImage={breadcrumbTeamImage} />
      <TeamDetails/>
    </>
  );
};

export default Team;
