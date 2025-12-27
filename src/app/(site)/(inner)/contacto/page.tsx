import React from "react";
import breadcrumbContactImage from "@/assets/images/breadcrumb/breadcrumb-contact.png";
import Breadcrumb from "@/components/common/Breadcrumb";
import ContactForm from "@/components/contact/ContactForm";
import LocationMap from "@/components/contact/LocationMap";

const Contact = () => {
  return (
    <>
      <Breadcrumb title="Contacto" backgroundImage={breadcrumbContactImage} />
      <ContactForm />
      <LocationMap />
    </>
  );
};

export default Contact;
