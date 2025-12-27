import React from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import breadcrumbPortfolioMasonryImage from "@/assets/images/breadcrumb/breadcrumb-portfolio-2.png";
import PortfolioMasonry from "@/components/inner-pages/PortfolioMasonry";

const Portfolio = () => {
  return (
    <>
      <Breadcrumb
        title="Portfolio Masonry"
        backgroundImage={breadcrumbPortfolioMasonryImage}
      />
      <PortfolioMasonry />
    </>
  );
};

export default Portfolio;