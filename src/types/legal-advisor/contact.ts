export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface ContactSectionHeader {
  title: string;
}


export interface ContactContent {
  sectionHeader: ContactSectionHeader;
  form: {
    namePlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    messagePlaceholder: string;
    submitText: string;
    action: string;
  };
}
