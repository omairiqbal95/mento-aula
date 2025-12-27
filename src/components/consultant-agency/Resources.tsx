import React from "react";
import { resourcesContent } from "@/content/consultant-agency/home/resources";
import ResourcesSlider from "./ResourcesSlider";

const Resources = () => {
  return (
    <div className="resources-ca__area pt-150 pb-150">
      <div className="container container-4xl border-grid-px">
        <div className="row justify-content-center text-center">
          <div className="col-xl-6">
            <div className="setion_header">
              <span className="section__header-sub-title-v2 fade_up_anim">
                {resourcesContent.sectionHeader.subTitle}
              </span>
              <h3
                className="h3 section__header-title-v2--extend fade_up_anim"
                data-delay=".4"
              >
                {resourcesContent.sectionHeader.title}
              </h3>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <ResourcesSlider content={resourcesContent} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
