import { StaticImageData } from "next/image";

export interface CtaFormField {
  id: string;
  type: string;
  name: string;
  placeholder: string;
  required: boolean;
  pattern?: string;
  rows?: number;
}

export interface CtaForm {
  title: string;
  action: string;
  method: string;
  fields: CtaFormField[];
  submitButton: {
    text: string;
    className: string;
  };
  animationDelay?: string;
}

export interface CtaContent {
  backgroundImage: StaticImageData;
  form: CtaForm;
}