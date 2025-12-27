import React from "react";
import Link from "next/link";
import { ContactSection as ContactSectionType } from "@/types/legal-advisor/footer";

interface ContactSectionProps {
  contactSection: ContactSectionType;
}

const ContactSection: React.FC<ContactSectionProps> = ({ contactSection }) => {
  return (
    <div
      className="col-sm-12 col-md-4 col-lg-5 fade_up_anim"
      data-delay=".8"
    >
      <ul className="custom-ul footer-common__body-nav-links footer-common__body-nav-links-getTouch nav-stye-4">
        <li>{contactSection.title}</li>
        {contactSection.contacts.map((contact, index) => (
          <li key={index}>
            <i className={contact.icon}></i>
            <Link href={contact.href}>{contact.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactSection;
