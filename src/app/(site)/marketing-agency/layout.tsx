import React from "react";
import Header from "@/components/marketing-agency/Header";
import Footer from "@/components/marketing-agency/Footer";
import Link from "next/link";

const MarketingAgencyLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>{children}</main>
          <Footer />
        </div>
      </div>
      <Link href="#footer" className="scroll-down section-link">
        <div className="line"></div>
        <p className="text">scroll down</p>
      </Link>
    </>
  );
};

export default MarketingAgencyLayout;
