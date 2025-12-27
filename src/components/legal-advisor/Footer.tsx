import React from "react";
import { footerContent } from "@/content/legal-advisor/home/footer";
import FooterBrand from "./footer/FooterBrand";
import FooterNavigation from "./footer/FooterNavigation";
import FooterBottom from "./footer/FooterBottom";

const Footer = () => {
  return (
    <footer className="footer-common footer-common">
      <div className="footer-common__body footer-common__body">
        <div className="container pt-150 pb-150">
          <div className="row justify-content-between gy-5 gx-xl-5">
            <FooterBrand brand={footerContent.brand} />
            <FooterNavigation 
              sections={footerContent.sections} 
              contactSection={footerContent.contactSection} 
            />
          </div>
        </div>
      </div>
      <FooterBottom 
        currentYear={footerContent.currentYear} 
        bottomLinks={footerContent.bottomLinks} 
      />
    </footer>
  );
};

export default Footer;
