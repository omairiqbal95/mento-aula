import React from "react";
import Link from "next/link";
import { PricingPlan } from "@/types/fitness/pricing";

interface PricingCardProps {
  plan: PricingPlan;
}

const PricingCard = ({ plan }: PricingCardProps) => {
  return (
    <div className="col-md-6 col-xl-4 fade_up_anim" data-delay={plan.delay}>
      <div className="pricing-fit__item">
        <span className="pricing-fit__item-package">{plan.package}</span>
        <h4 className="h4 pricing-fit__item-price">
          {plan.name} - {plan.price}
        </h4>
        <ul className="custom-ul pricing-fit__item-facilitys">
          {plan.features.map((feature, index) => (
            <li key={index}>{feature.text}</li>
          ))}
        </ul>
        <Link href={plan.buttonLink} className="pricing-fit__item-buy-plan">
          {plan.buttonText}
        </Link>
      </div>
    </div>
  );
};

export default PricingCard;
