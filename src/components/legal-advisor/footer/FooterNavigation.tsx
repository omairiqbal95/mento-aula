import React from "react";
import { FooterSection as FooterSectionType, ContactSection as ContactSectionType } from "@/types/legal-advisor/footer";
import FooterSection from "./FooterSection";
import ContactSection from "./ContactSection";

interface FooterNavigationProps {
  sections: FooterSectionType[];
  contactSection: ContactSectionType;
}

const FooterNavigation: React.FC<FooterNavigationProps> = ({ sections, contactSection }) => {
  return (
    <div className="col-lg-9 col-xl-8">
      <div className="footer-common__body-nav">
        <div className="row g-3 gy-4 justify-content-lg-end">
          {sections.map((section, index) => (
            <FooterSection 
              key={index}
              section={section} 
              delay={`.${4 + (index * 2)}`} 
            />
          ))}
          <ContactSection contactSection={contactSection} />
        </div>
      </div>
    </div>
  );
};

export default FooterNavigation;
