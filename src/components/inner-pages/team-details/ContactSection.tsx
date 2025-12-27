import React from "react";
import Link from "next/link";
import { ContactLink } from "@/types/inner-pages/team-details";

interface ContactSectionProps {
  title: string;
  contactLinks: ContactLink[];
}

const ContactSection: React.FC<ContactSectionProps> = ({ title, contactLinks }) => {
  return (
    <div className="contact d-flex">
      <span className="d-inline-block">{title}</span>
      <ul className="custom-ul contact-lists">
        {contactLinks.map((contact) => (
          <li key={contact.id}>
            <Link href={contact.href}>
              <i className={contact.icon}></i>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactSection;
