import React from "react";
import { chooseUsContent } from "@/content/financial-advisor/home/choose-us";
import TabsSection from "./choose-us/TabsSection";
import VideoModal from "./choose-us/VideoModal";

const ChooseUs = () => {
  return (
    <div className="choose-us-fin pt-150 pb-150">
      <div className="container container-2xl">
        <div className="row gx-4 gy-5 gy-lg-0 justify-content-between">
          <div className="col-lg-6">
            <div className="section__header-v9">
              <h3
                className="h3 section__header-title-v9 fade_up_anim"
                data-delay={chooseUsContent.header.titleDelay}
              >
                {chooseUsContent.header.title}
              </h3>
              <p className="fade_up_anim" data-delay={chooseUsContent.header.descriptionDelay}>
                {chooseUsContent.header.description}
              </p>
              <TabsSection tabs={chooseUsContent.tabs} />
            </div>
          </div>
          <div className="col-lg-6">
            <VideoModal video={chooseUsContent.video} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseUs;