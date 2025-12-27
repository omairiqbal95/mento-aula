import React from "react";
import { ResultItem } from "@/types/inner-pages/portfolio-details";

interface ResultsListProps {
  results: {
    title: string;
    items: ResultItem[];
  };
}

const ResultsList: React.FC<ResultsListProps> = ({ results }) => {
  return (
    <>
      <h4 className="h4 fade_up_anim" data-delay=".30">
        {results.title}
      </h4>
      <ul className="custom-ul case-details__detailedInfo-result-list">
        {results.items.map((item) => (
          <li key={item.id} className="fade_up_anim" data-delay=".31">
            <span>{item.title}</span> {item.description}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ResultsList;
