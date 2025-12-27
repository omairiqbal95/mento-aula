export interface ContactSectionHeader {
  title: string;
  animationDelay: string;
}

export type ContactInfoIconKey = 'email' | 'phone' | 'location';

export interface ContactInfoCard {
  id: string;
  title: string;
  description: string;
  iconKey: ContactInfoIconKey;
  animationDelay: string;
}

export type ContactFieldType = 'text' | 'email' | 'textarea';

export interface ContactFormField {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  type: ContactFieldType;
  animationDelay: string;
}

export interface ContactFormButton {
  text: string;
  animationDelay: string;
  icon: 'arrow-right-five';
}

export interface ContactFormContent {
  action: string;
  method: 'post' | 'get';
  fields: ContactFormField[];
  submitButton: ContactFormButton;
}

export interface ContactContent {
  sectionHeader: ContactSectionHeader;
  infoCards: ContactInfoCard[];
  arrowAnimationDelay: string;
  form: ContactFormContent;
  currentYear: number;
}

export interface ContactProps {
  className?: string;
}

export interface ContactFormProps {
  formContent: ContactFormContent;
}

export interface ContactInfoCardProps {
  card: ContactInfoCard;
}
