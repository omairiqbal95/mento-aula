import React from "react";
import Link from "next/link";
import { footerContent } from "@/content/consultant-agency/home/footer";
import FooterBrand from "./FooterBrand";
import FooterNavSection from "./FooterNavSection";
import FooterNewsletter from "./FooterNewsletter";

const Footer = () => {
  return (
    <footer className="footer-common footer-common-light overflow-hidden">
      <div className="footer-common__body footer-common__body-light">
        <div className="container container-4xl pt-150 pb-150">
          <div className="row justify-content-between g-4 gx-xl-5">
            <div className="col-xl-3 col-xxl-2">
              <FooterBrand brand={footerContent.brand} />
            </div>
            <div className="col-xl-9 col-xxl-9">
              <div className="footer-common__body-nav">
                <div className="row g-4">
                  {footerContent.navigation.map((section) => (
                    <FooterNavSection key={section.id} section={section} />
                  ))}
                  <FooterNewsletter 
                    newsletter={footerContent.newsletter} 
                    delay=".8" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-common__bottom footer-common__bottom-light">
        <div className="container container-4xl">
          <div className="row">
            <div className="col-12 text-center d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
              <p className="footer-common__bottom-copyright">
                <i className="fa-regular fa-copyright"></i>
                {footerContent.copyright.text} {footerContent.copyright.year} {footerContent.copyright.companyName}. Inc.
              </p>
              <ul className="custom-ul">
                <li className="flex align-items-center">
                  <i className="bi bi-telephone me-2"></i>
                  <Link href={footerContent.contact.phoneUrl}>
                    {footerContent.contact.phone}
                  </Link>
                </li>
                <li>
                  <p className="footer-common__bottom-location">
                    <i className="bi bi-geo-alt me-2"></i>
                    {footerContent.contact.address}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
