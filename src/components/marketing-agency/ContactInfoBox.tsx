// components/ContactInfoBox.tsx
import React from 'react';
import { TypeContactInfo } from '@/types/marketing-agency/footer';
import MaiIcon from '@/icons/MaiIcon';
import PhoneIcon from '@/icons/PhoneIcon';
import PinIcon from '@/icons/PinIcon';

const IconSelect = ({ icon }: { icon: string }) => {
  switch(icon){
    case 'MaiIcon':
      return <MaiIcon />;
    case 'PhoneIcon':
      return <PhoneIcon />;
    case 'PinIcon':
      return <PinIcon />;
    default:
      return <MaiIcon />;
  }
}
const ContactInfoBox: React.FC<TypeContactInfo> = ({
  label,
  value,
  icon,
}) => (
  <div className="content-info__box">
    <div className="content-info__box-icon">
      <IconSelect icon={icon} />
    </div>
    <span className="content-info__box-label">{label}</span>
    <h5 className="h5 content-info__box-title">{value}</h5>
  </div>
);

export default ContactInfoBox;