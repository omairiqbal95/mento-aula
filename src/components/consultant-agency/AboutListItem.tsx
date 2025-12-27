import React from "react";
import type { AboutListItem as AboutListItemType } from "@/types/consultant-agency/about";

interface AboutListItemProps {
  item: AboutListItemType;
}

const AboutListItem = ({ item }: AboutListItemProps) => {
  return (
    <div 
      className="about-list fade_up_anim" 
      data-delay={item.delay || undefined}
    >
      <div className="list-wrapper">
        <h5 className="h5">{item.title}</h5>
        <p>{item.description}</p>
      </div>
    </div>
  );
};

export default AboutListItem;
