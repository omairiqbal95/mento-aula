import ctaBgImage from "@/assets/images/cta/cta-bg-Image.png";
import type { CtaContent } from "@/types/consultant-agency/cta";

export const ctaContent: CtaContent = {
  backgroundImage: ctaBgImage,
  form: {
    title: "Have any question? Write to us.",
    action: "/contact",
    method: "POST",
    animationDelay: ".4",
    fields: [
      {
        id: "name",
        type: "text",
        name: "name",
        placeholder: "Your Name",
        required: true
      },
      {
        id: "email",
        type: "email",
        name: "email",
        placeholder: "Email Address",
        required: true
      },
      {
        id: "phone",
        type: "tel",
        name: "phone",
        placeholder: "Phone Number",
        required: true,
        pattern: "[0-9]{11}"
      },
      {
        id: "message",
        type: "textarea",
        name: "message",
        placeholder: "Your Message...",
        required: true,
        rows: 4
      }
    ],
    submitButton: {
      text: "Submit",
      className: "common-btn__variation3"
    }
  }
};