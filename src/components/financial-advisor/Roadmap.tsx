import React from "react";
import { roadmapContent } from "@/content/financial-advisor/home/roadmap";
import RoadmapItem from "./roadmap/RoadmapItem";

const Roadmap = () => {
  return (
    <div className="roadmap-fin pt-150">
      <div className="container container-2xl">
        <div className="row justify-content-center text-center">
          <div className="col-md-9 col-lg-8 section__header-v9">
            <h3
              className="h3 section__header-title-v9 fade_up_anim"
              data-delay=".2"
            >
              {roadmapContent.sectionHeader.title}
            </h3>
            <p className="fade_up_anim" data-delay=".4">
              {roadmapContent.sectionHeader.description}
            </p>
          </div>
        </div>
        <div className="row g-3 pt-100">
          {roadmapContent.items.map((item) => (
            <RoadmapItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
