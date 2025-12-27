import React from "react";
import type { CtaFormField as CtaFormFieldType } from "@/types/consultant-agency/cta";

interface CtaFormFieldProps {
  field: CtaFormFieldType;
}

const CtaFormField = ({ field }: CtaFormFieldProps) => {
  if (field.type === "textarea") {
    return (
      <textarea
        id={field.id}
        name={field.name}
        className="form-control"
        placeholder={field.placeholder}
        rows={field.rows}
        required={field.required}
      ></textarea>
    );
  }

  return (
    <input
      id={field.id}
      type={field.type}
      name={field.name}
      className="form-control"
      placeholder={field.placeholder}
      required={field.required}
      pattern={field.pattern}
    />
  );
};

export default CtaFormField;
