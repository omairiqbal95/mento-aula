import React from "react";
import { ProjectInfo as ProjectInfoType } from "@/types/inner-pages/portfolio-details";

interface ProjectInfoProps {
  projectInfo: ProjectInfoType;
}

const ProjectInfo: React.FC<ProjectInfoProps> = ({ projectInfo }) => {
  return (
    <div className="case-details__shortInfo">
      <ul className="custom-ul case-details__shortInfo-info">
        <li>
          <h6 className="h6 title">Client</h6>
          <span className="info">{projectInfo.client}</span>
        </li>
        <li>
          <h6 className="h6 title">Industry</h6>
          <span className="info">{projectInfo.industry}</span>
        </li>
        <li>
          <h6 className="h6 title">Project</h6>
          <span className="info">{projectInfo.project}</span>
        </li>
        <li>
          <h6 className="h6 title">Duration</h6>
          <span className="info">{projectInfo.duration}</span>
        </li>
      </ul>
    </div>
  );
};

export default ProjectInfo;
