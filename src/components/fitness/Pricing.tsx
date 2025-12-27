import React from "react";
import { pricingContent } from "@/content/fitness/home/pricing";
import PricingCard from "./PricingCard";

const Pricing = () => {
  return (
    <div className="pricing-fit pt-150">
      <div className="container container-fitness">
        <div className="row justify-content-between align-items-center section__header-v10">
          <div className="col-md-6">
            <h3
              className="h3 section__header-title-v10 fade_up_anim"
              data-delay=".2"
            >
              {pricingContent.sectionHeader.title}
            </h3>
          </div>
          <div className="col-md-5 fade_up_anim" data-delay=".4">
            <p>{pricingContent.sectionHeader.description}</p>
          </div>
        </div>
        <div className="row g-4 gy-5 pt-100">
          {pricingContent.plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
