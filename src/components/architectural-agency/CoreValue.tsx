import React from "react";
import { coreValueData } from "@/content/architectural-agency/corevalue";

const CoreValue = () => {
  const firstColumn = coreValueData.values.slice(0, 2);
  const secondColumn = coreValueData.values.slice(2);

  return (
    <div className="core-value__area pt-150 pb-150">
      <div className="container container-4xl">
        <div className="row align-items-center section__header-v3">
          <div className="col-md-6 fade_up_anim" data-delay=".2">
            <h3 className="h3 section__header-title-v3 text-white">
              {coreValueData.sectionTitle}
            </h3>
          </div>
          <div className="col-md-6 fade_up_anim" data-delay=".4">
            <p className="text-white">{coreValueData.sectionDescription}</p>
          </div>
        </div>
        <div className="core-value__items-outer">
          <div className="core-value__items-inner">
            {firstColumn.map((value, index) => (
              <div
                key={index}
                className="core-value__item fade_up_anim"
                data-delay={`.${5 + index}`}
              >
                <figure
                  className="core-value__item-icon"
                  dangerouslySetInnerHTML={{ __html: value.icon }}
                />
                <div className="core-value__item-content">
                  <h6 className="h6 core-value__item-title">{value.title}</h6>
                  <p>{value.description}</p>
                  <p className="core-value__item-border-bottom"></p>
                </div>
              </div>
            ))}
          </div>

          <div className="core-value__items-inner">
            {secondColumn.map((value, index) => (
              <div
                key={index}
                className="core-value__item fade_up_anim"
                data-delay={`.${7 + index}`}
              >
                <figure
                  className="core-value__item-icon"
                  dangerouslySetInnerHTML={{ __html: value.icon }}
                />
                <div className="core-value__item-content">
                  <h6 className="h6 core-value__item-title">{value.title}</h6>
                  <p>{value.description}</p>
                  <p className="core-value__item-border-bottom"></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoreValue;
