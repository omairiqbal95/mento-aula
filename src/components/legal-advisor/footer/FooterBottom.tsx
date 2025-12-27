import React from "react";
import Link from "next/link";
import { BottomLink } from "@/types/legal-advisor/footer";

interface FooterBottomProps {
  currentYear: number;
  bottomLinks: BottomLink[];
}

const FooterBottom: React.FC<FooterBottomProps> = ({ currentYear, bottomLinks }) => {
  return (
    <div className="footer-common__bottom">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
            <p className="footer-common__bottom-copyright">
              <i className="fa-regular fa-copyright"></i>
              &nbsp;Copyright {currentYear} Unikon. Inc.
            </p>
            <ul className="custom-ul pages">
              {bottomLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href}>{link.text}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;
