import React from "react";
import Link from "next/link";
import { SocialLink } from "@/types/legal-advisor/footer";

interface SocialLinksProps {
  socialLinks: SocialLink[];
}

const SocialLinks: React.FC<SocialLinksProps> = ({ socialLinks }) => {
  return (
    <div className="footer-common__body-social-share footer-common__body-social-share--extend">
      <ul className="custom-ul">
        {socialLinks.map((social, index) => (
          <li key={index}>
            <Link href={social.href}>
              <i className={social.icon}></i>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SocialLinks;
