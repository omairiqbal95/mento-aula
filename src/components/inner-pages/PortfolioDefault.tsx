import React from "react";
import { portfolioDefaultContent } from "@/content/inner-pages/portfolio-default";
import PortfolioDefaultItem from "./PortfolioDefaultItem";

 

const PortfolioDefault = () => {
  return (
    <div className="work__area pt-150 pb-150">
      <div className="container extend">
        <div className="row g-4 gy-xl-5">
          {portfolioDefaultContent.items.map((item, idx) => {
            const cols = ["col-md-6", "col-md-6", "col-12", "col-md-6", "col-md-6"];
            return (
              <div key={item.id} className={`${cols[idx] ?? "col-md-6"} fade_up_anim`} data-delay=".2">
                <PortfolioDefaultItem item={item} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default PortfolioDefault