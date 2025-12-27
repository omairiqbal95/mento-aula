import React from "react";
import { funFactsContent } from "@/content/healthcare/home/fanfacts";
import FunFactsCounter from "./FunFactsCounter";

const FunFacts = () => {
  return (
    <div className="funfacts-health__area">
      <div className="container container-2xl">
        <div className="row">
          <div className="col-12">
            <FunFactsCounter items={funFactsContent.items} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FunFacts;
