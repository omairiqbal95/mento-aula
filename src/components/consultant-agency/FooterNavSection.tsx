import React from "react";
import Link from "next/link";
import type { FooterNavSection as FooterNavSectionType } from "@/types/consultant-agency/footer";

interface FooterNavSectionProps {
  section: FooterNavSectionType;
}

const FooterNavSection = ({ section }: FooterNavSectionProps) => {
  return (
    <div
      className="col-sm-6 col-md-3 fade_up_anim"
      data-delay={section.delay}
    >
      <ul className="custom-ul footer-common__body-nav-links footer-common__body-nav-links-light">
        <li>{section.title}</li>
        {section.links.map((link) => (
          <li key={link.id}>
            <Link href={link.url}>{link.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterNavSection;
