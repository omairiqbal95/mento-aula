import React from 'react';
import { ContactInfoCard as ContactInfoCardType } from '@/types/financial-advisor/contact';
import { contactContent } from '@/content/financial-advisor/home/contact';
import ContactEmailIcon from '@/icons/ContactEmailIcon';
import ContactPhoneIcon from '@/icons/ContactPhoneIcon';
import ContactLocationIcon from '@/icons/ContactLocationIcon';
import ContactArrowIcon from '@/icons/ContactArrowIcon';
import ContactForm from './ContactForm';

// Contact Info Card Component
const ContactInfoCard: React.FC<{ card: ContactInfoCardType }> = ({ card }) => {
  const getIcon = () => {
    switch (card.iconKey) {
      case 'email':
        return <ContactEmailIcon />;
      case 'phone':
        return <ContactPhoneIcon />;
      case 'location':
        return <ContactLocationIcon />;
      default:
        return null;
    }
  };

  return (
    <div
      className="contact-us-fin__info-card fade_up_anim"
      data-delay={card.animationDelay}
    >
      <figure className="card-icon">
        {getIcon()}
      </figure>
      <div className="card-content">
        <h6 className="h6">{card.title}</h6>
        <span className="card-info">{card.description}</span>
      </div>
    </div>
  );
};

const Contact = () => {
  return (
    <div className="contact-us-fin pt-150 pb-150">
      <div className="container container-2xl">
        <div className="row g-4 justify-content-between">
          <div className="col-lg-6 col-xl-5">
            <div className="contact-us-fin__info">
              <h3 className="h3 section__header-title-v9 fade_up_anim">
                {contactContent.sectionHeader.title}
              </h3>
              <div className="contact-us-fin__info-cards">
                {contactContent.infoCards.map((card) => (
                  <ContactInfoCard key={card.id} card={card} />
                ))}
              </div>
              <div className="contact-us-fin__arrow">
                <ContactArrowIcon />
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-xl-7">
            <div className="contact-us-fin__form-wrap">
              <ContactForm formContent={contactContent.form} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
