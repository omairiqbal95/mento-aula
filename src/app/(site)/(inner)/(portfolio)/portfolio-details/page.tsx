import React from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import breadcrumbPortfolio from "@/assets/images/breadcrumb/breadcrumb-case-details.png";
import PortfolioDetails from "@/components/inner-pages/PortfolioDetails";

const Portfolio = () => {
  return (
    <>
      <Breadcrumb
        title={<>How We Grew X&apos;s Leads <span className="text-lowercase">by</span> Y% Through Redesign</>}
        backgroundImage={breadcrumbPortfolio}
      />
      <PortfolioDetails />
    </>
  );
};

export default Portfolio;
