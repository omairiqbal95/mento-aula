import React from "react";
import { portfolioMasonryContent } from "@/content/inner-pages/portfolio-masonry";
import { PortfolioMasonryItem as PortfolioMasonryItemType } from "@/types/inner-pages/portfolio-masonry";
import PortfolioMasonryItem from "./PortfolioMasonryItem";

const PortfolioMasonry = () => {
  const { items } = portfolioMasonryContent;

  return (
    <div className="work__area pt-150 pb-150">
      <div className="container">
        <div className="row g-4 gy-xl-5">
          {items.map((item: PortfolioMasonryItemType) => (
            <PortfolioMasonryItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioMasonry;