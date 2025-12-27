import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { FooterBrand as FooterBrandType } from "@/types/consultant-agency/footer";

interface FooterBrandProps {
  brand: FooterBrandType;
}

const FooterBrand = ({ brand }: FooterBrandProps) => {
  return (
    <div className="footer-common__body-content footer-common__body-content-light fade_up_anim">
      <Link className="logo" href={brand.logoUrl}>
        <Image src={brand.logo} alt="logo" />
      </Link>
      <p>{brand.description}</p>
      <div className="footer-common__body-social-share">
        <ul className="custom-ul">
          {brand.socialLinks.map((social) => (
            <li key={social.id}>
              <Link href={social.url}>
                <i className={social.icon}></i>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FooterBrand;
