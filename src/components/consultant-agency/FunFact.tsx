import React from "react";
import { funFactContent } from "@/content/consultant-agency/home/fun-fact";
import FunFactItem from "./FunFactItem";

const FunFact = () => {
  return (
    <div className="funfact__area overflow-hidden pb-150">
      <div className="container container-4xl custom-container">
        <div className="funfact__items">
          {funFactContent.items.map((item) => (
            <FunFactItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FunFact;
