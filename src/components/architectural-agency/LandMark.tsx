import React from "react";
import { landmarkData } from "@/content/architectural-agency/landmark";
import LandmarkSlider from "./LandmarkSlider";

const Landmark = () => {
  return (
    <div className="landmark__area pt-150">
      <div className="container container-4xl">
        <div className="row justify-content-center text-center">
          <div className="col-md-9 col-xxl-6 section__header-v3">
            <h3
              className="h3 section__header-title-v3 fade_up_anim"
              data-delay=".2"
            >
              {landmarkData.sectionTitle}
            </h3>
            <p className="fade_up_anim" data-delay=".4">
              {landmarkData.sectionDescription}
            </p>
          </div>
        </div>
        <div className="row mt-100">
          <div className="col-12">
            <LandmarkSlider slides={landmarkData.slides} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landmark;
