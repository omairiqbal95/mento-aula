import React from "react";
import Link from "next/link";
import { SocialLink } from "@/types/showcase/showcase";

interface SocialLinksProps {
  socialLinks: SocialLink[];
}

const SocialLinks: React.FC<SocialLinksProps> = ({ socialLinks }) => {
  return (
    <ul className="custom-ul side__social">
      {socialLinks.map((social) => (
        <li key={social.id}>
          <Link href={social.href} aria-label={social.label}>
            <i className={social.icon}></i>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SocialLinks;
