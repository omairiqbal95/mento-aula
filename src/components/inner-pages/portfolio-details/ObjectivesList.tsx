import React from "react";

interface ObjectivesListProps {
  objectives: {
    title: string;
    items: string[];
  };
}

const ObjectivesList: React.FC<ObjectivesListProps> = ({ objectives }) => {
  return (
    <>
      <h4 className="h4 fade_up_anim" data-delay=".24">
        {objectives.title}
      </h4>
      <ul>
        {objectives.items.map((item, index) => (
          <li key={index} className="fade_up_anim" data-delay=".25">
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ObjectivesList;
