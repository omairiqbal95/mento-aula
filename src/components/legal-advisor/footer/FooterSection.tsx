import React from "react";
import Link from "next/link";
import { FooterSection as FooterSectionType } from "@/types/legal-advisor/footer";

interface FooterSectionProps {
  section: FooterSectionType;
  delay: string;
}

const FooterSection: React.FC<FooterSectionProps> = ({ section, delay }) => {
  return (
    <div
      className="col-sm-6 col-md-4 col-lg-3 fade_up_anim"
      data-delay={delay}
    >
      <ul className="custom-ul footer-common__body-nav-links nav-stye-4">
        <li>{section.title}</li>
        {section.links.map((link, index) => (
          <li key={index}>
            <Link href={link.href}>{link.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterSection;
