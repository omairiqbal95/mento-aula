import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FooterBrand as FooterBrandType } from "@/types/legal-advisor/footer";
import SocialLinks from "./SocialLinks";

interface FooterBrandProps {
  brand: FooterBrandType;
}

const FooterBrand: React.FC<FooterBrandProps> = ({ brand }) => {
  return (
    <div className="col-lg-3 col-xl-4">
      <div
        className="footer-common__body-content footer-common__body-content--extend fade_up_anim"
        data-delay=".2"
      >
        <Link className="logo" href="/">
          <Image 
            src={brand.logo} 
            alt={brand.logoAlt} 
          />
        </Link>
        <p>{brand.description}</p>
        <SocialLinks socialLinks={brand.socialLinks} />
      </div>
    </div>
  );
};

export default FooterBrand;
