import React from 'react';
import Link from 'next/link';
import { TypeFooterProps } from '@/types/marketing-agency/footer';
import ContactInfoBox from './ContactInfoBox';
import ContactForm from './ContactForm'; 

const TypeFooterBody: React.FC<Pick<TypeFooterProps, 'contactInfo' | 'form'>> = ({ contactInfo, form }) => {
  return (
    <div className="footer-eight__body pb-100">
      <div className="container container-mini">
        <div className="row g-4 gy-5 gy-md-0">
          
          <div className="col-md-6 fade_up_anim">
            <div className="footer-eight__body-content">
              <h4 className="h4 footer-eight__body-title">{contactInfo.title}</h4>
              <div className="content-info__wrapper">
                {contactInfo.items.map(item => (
                  <ContactInfoBox key={item.id} {...item} />
                ))}
              </div>
              <ul className="custom-ul content-social">
                {contactInfo.socialLinks.map(link => (
                  <li key={link.id}>
                    <Link href={link.href} aria-label={link.label}>
                      <i className={link.iconClass}></i>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-md-6 fade_up_anim" data-delay=".4">
            <ContactForm title={form.title} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypeFooterBody;