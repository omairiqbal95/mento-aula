import React from "react";
import Image from "next/image";
import { RoadmapItem as RoadmapItemType } from "@/types/financial-advisor/roadmap";

interface RoadmapItemProps {
  item: RoadmapItemType;
}

const RoadmapItem = ({ item }: RoadmapItemProps) => {
  return (
    <div
      className="col-sm-6 col-lg-4 col-xl-3 fade_up_anim"
      data-delay={item.delay}
    >
      <div className="roadmap-fin__item">
        <span className="roadmap-fin__number"></span>
        <figure className="roadmap-fin__icon">
          <Image
            src={item.icon}
            alt={item.title}
          />
        </figure>
        <h5 className="h5">{item.title}</h5>
        <p>{item.description}</p>
      </div>
    </div>
  );
};

export default RoadmapItem;
