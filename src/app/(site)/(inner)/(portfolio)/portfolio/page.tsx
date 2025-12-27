import React from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import breadcrumbPortfolioImage from "@/assets/images/breadcrumb/breadcrumb-portfolio.png";
import PortfolioDefault from "@/components/inner-pages/PortfolioDefault";

const Portfolio = () => {
  return (
    <>
      <Breadcrumb
        title="Portfolio Default"
        backgroundImage={breadcrumbPortfolioImage}
      />
      <PortfolioDefault />
    </>
  );
};

export default Portfolio;