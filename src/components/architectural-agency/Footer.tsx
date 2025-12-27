import React from "react";
import Image from "next/image";
import Link from "next/link";
import { footerContent } from "@/content/architectural-agency/footer";

const Footer = () => {
  return (
    <div className="footer-four pt-150">
      <div className="footer-four__top">
        <div className="container container-4xl">
          <div className="row justify-content-between">
            <div className="col-lg-5 fade_up_anim" data-delay=".2">
              <div className="footer-common__body-content footer-common__body-content--extend">
                <Link className="logo" href="/">
                  <Image src={footerContent.topSection.logo} alt="logo" />
                </Link>
                <p>{footerContent.topSection.description}</p>
                <div className="location">
                  <i className={footerContent.topSection.location.icon}></i>
                  {footerContent.topSection.location.address}
                </div>
                <div className="quick-links">
                  <h6 className="h6">
                    {footerContent.topSection.quickLinks.title}
                  </h6>
                  <ul className="custom-ul quick-links-list">
                    {footerContent.topSection.quickLinks.links.map(
                      (link, index) => (
                        <li key={index}>
                          <Link href={link.href}>{link.name}</Link>
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div className="footer-common__body-social-share footer-common__body-social-share--extend footer-common__body-social-share--extend45">
                  <ul className="custom-ul">
                    {footerContent.topSection.socialMedia.map(
                      (social, index) => (
                        <li key={index}>
                          <Link href={social.href}>
                            <i className={social.icon}></i>
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-5 fade_up_anim" data-delay=".4">
              <form action="/" className="footer-four__contact-form">
                <h3 className="h3">
                  {footerContent.topSection.contactForm.title}
                </h3>
                <div className="name d-flex">
                  <input
                    type="text"
                    name={
                      footerContent.topSection.contactForm.fields.firstName.name
                    }
                    id={
                      footerContent.topSection.contactForm.fields.firstName.id
                    }
                    placeholder={
                      footerContent.topSection.contactForm.fields.firstName
                        .placeholder
                    }
                    className={
                      footerContent.topSection.contactForm.fields.firstName
                        .className
                    }
                  />
                  <input
                    type="text"
                    name={
                      footerContent.topSection.contactForm.fields.lastName.name
                    }
                    id={footerContent.topSection.contactForm.fields.lastName.id}
                    placeholder={
                      footerContent.topSection.contactForm.fields.lastName
                        .placeholder
                    }
                    className={
                      footerContent.topSection.contactForm.fields.lastName
                        .className
                    }
                  />
                </div>
                <input
                  type="email"
                  name={footerContent.topSection.contactForm.fields.email.name}
                  id={footerContent.topSection.contactForm.fields.email.id}
                  placeholder={
                    footerContent.topSection.contactForm.fields.email
                      .placeholder
                  }
                  className={
                    footerContent.topSection.contactForm.fields.email.className
                  }
                />
                <button
                  className={
                    footerContent.topSection.contactForm.submitButton.className
                  }
                >
                  <span>
                    {footerContent.topSection.contactForm.submitButton.text}
                  </span>
                  <span className="arrow">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M18.0766 10.2412C18.0449 10.3179 17.9992 10.3869 17.9417 10.4444L12.1084 16.2778C11.9867 16.3994 11.8267 16.4611 11.6667 16.4611C11.5067 16.4611 11.3466 16.4003 11.225 16.2778C10.9808 16.0336 10.9808 15.6377 11.225 15.3936L15.9916 10.6269H2.5C2.155 10.6269 1.875 10.3469 1.875 10.0019C1.875 9.65693 2.155 9.37693 2.5 9.37693H15.9908L11.2242 4.61029C10.98 4.36612 10.98 3.97026 11.2242 3.72609C11.4683 3.48193 11.8642 3.48193 12.1084 3.72609L17.9417 9.55943C17.9992 9.61693 18.0449 9.68601 18.0766 9.76267C18.1399 9.91601 18.1399 10.0879 18.0766 10.2412Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-common__bottom footer-four__bottom">
        <div className="container container-4xl">
          <div className="row gy-5">
            <div className="col-12 text-center d-flex flex-column flex-md-row justify-content-between align-items-center gap-5">
              <div className="footer-four__bottom-left">
                <p className="footer-common__bottom-copyright">
                  <i className="fa-regular fa-copyright"></i>
                  {footerContent.bottomSection.leftSection.copyright}
                </p>
                <Link href={footerContent.bottomSection.leftSection.email.href}>
                  {footerContent.bottomSection.leftSection.email.address}
                </Link>
              </div>

              <ul className="custom-ul pages">
                {footerContent.bottomSection.rightSection.legalPages.map(
                  (page, index) => (
                    <li key={index}>
                      <Link href={page.href}>{page.name}</Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
