import React from 'react';
import { CONSTANT_FOOTER_DATA } from '@/content/marketing-agency/home/footer';
import FooterBody from './FooterBody';
import FooterBottom from './FooterBottom';

const Footer: React.FC = () => {
  const data = CONSTANT_FOOTER_DATA; 

  return (
    <footer id="footer" className="footer-eight pt-150">
      <FooterBody 
        contactInfo={data.contactInfo} 
        form={data.form} 
      />
      
      <FooterBottom 
        navigation={data.navigation} 
      />
    </footer>
  );
};

export default Footer;