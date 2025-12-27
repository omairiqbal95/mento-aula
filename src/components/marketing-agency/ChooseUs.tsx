import React from "react";
import FunFactItem from "./FunFactItem";
import { CONSTANT_CHOOSE_US } from "@/content/marketing-agency/home/choose-us";

const ChooseUs = () => {
  const { header, funFacts } = CONSTANT_CHOOSE_US;
  const { subTitle, title } = header;

  return (
    <div className="choose-us-mar__area text-reveal-section pt-150 pb-150">
      <div className="container container-mini">
        <div className="row g-4 align-items-center section__header-v11">
          <div className="col-12">
            <span className="section__header-sub-title-v11 fade_up_anim">
              {subTitle}
            </span>
            <h2
              className="h2 section__header-title-v11 text-reveal fade_up_anim"
              data-delay=".4"
            >
              {title}
            </h2>
          </div>
        </div>

        <div className="row g-4 pt-100">
          {funFacts.map((fact) => (
            <div key={fact.id} className="col-sm-6 col-md-4 fade_up_anim">
              <FunFactItem {...fact} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChooseUs;
