import React from 'react';
import AwardItem from './AwardItem';
import { CONSTANT_AWARDS_DATA } from "@/content/marketing-agency/home/awards";

const Awards= () => {
  const { header, awards } = CONSTANT_AWARDS_DATA;
  const { subTitle, title } = header;

  return (
    <div className="awards-mar__area pt-150">
      <div className="container container-mini">
        <div className="row text-center">
          <div className="col-12">
            <span className="section__header-sub-title-v11 fade_up_anim">
              {subTitle}
            </span>
            <h2 className="h2 section__header-title-v11 fade_up_anim" data-delay=".4">
              {title}
            </h2>
          </div>
        </div>
        
        <div className="row pt-100">
          <div className="col-12">
            {awards.map((award) => (
              <AwardItem key={award.id} {...award} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Awards;