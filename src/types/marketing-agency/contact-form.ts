export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
}

export interface ContactFormProps {
  title: string;
  onSubmit?: (data: ContactFormData) => void;
  className?: string;
}

export type FormSubmitStatus = 'idle' | 'success' | 'error';
