import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { footerContent } from '@/content/financial-advisor/home/footer';
import NewsletterForm from './footer/NewsletterForm';

const Footer = () => {
  return (
    <footer className="footer-six">
      <div className="footer-six__top">
        <div className="container container-2xl">
          <div className="row g-4 footer-six__top-wrapper justify-content-between">
            <div className="col-sm-12 col-xxl-3 fade_up_anim" data-delay=".2">
              <div className="footer-six__top-content footer-six__top-left-content">
                <Link className="logo" href={footerContent.brand.logoHref}>
                  <Image src={footerContent.brand.logo} alt="logo" />
                </Link>
                <p>{footerContent.brand.description}</p>
                <ul className="custom-ul">
                  {footerContent.brand.socialLinks.map((social, index) => (
                    <li key={index}>
                      <Link href={social.href}>
                        <i className={social.icon}></i>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {footerContent.navigationSections.map((section, sectionIndex) => {
              const colClass = sectionIndex === 0 ? 'col-sm-6 col-lg-3 col-xxl-1' : 'col-sm-6 col-lg-3 col-xxl-2';
              const delay = `.${4 + (sectionIndex * 2)}`;
              return (
                <div key={sectionIndex} className={`${colClass} fade_up_anim`} data-delay={delay}>
                  <div className="footer-six__top-content">
                    <ul className="custom-ul page-links">
                      <li>{section.title}</li>
                      {section.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <Link href={link.href}>{link.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
            <div className="col-sm-6 col-lg-3 col-xxl-3 fade_up_anim" data-delay="1">
              <div className="footer-six__top-content">
                <ul className="custom-ul page-links">
                  <li>{footerContent.newsletter.title}</li>
                  <li className="reset">
                    <NewsletterForm newsletter={footerContent.newsletter} />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-six__bottom">
        <div className="container container-2xl">
          <div className="row">
            <div className="col-12">
              <ul className="custom-ul d-flex justify-content-center">
                <li className="copyright">
                  <i className="fa-regular fa-copyright"></i>
                  {footerContent.bottom.copyrightText.replace('{year}', footerContent.bottom.currentYear.toString())}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;