// components/TypeFooterBottom.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { TypeFooterProps } from "@/types/marketing-agency/footer";

const FooterBottom: React.FC<Pick<TypeFooterProps, "navigation">> = ({
  navigation,
}) => {
  return (
    <div className="footer-eight__bottom">
      <div className="container container-mini">
        <div className="row g-4 gx-xxl-5 align-items-center">
          <div className="col-lg-6">
            <ul className="custom-ul footer-eight__bottom-left-navlinks">
              <li>
                <Link href="//">
                  <Image
                    src={navigation.logoSrc}
                    alt="Company Logo"
                    width={100}
                    height={30}
                  />
                </Link>
              </li>
              {navigation.mainLinks.map((link) => (
                <li key={link.id}>
                  <Link href={link.href} className="link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-lg-6">
            <ul className="custom-ul footer-eight__bottom-right-navlinks">
              {navigation.utilityLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="text-decoration-underline link"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <i className="fa-regular fa-copyright"></i>{" "}
                {navigation.copyrightText}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;
