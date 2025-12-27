"use client";

import React, { useCallback } from "react";
import { ctaContent } from "@/content/consultant-agency/home/cta";
import CtaFormField from "./CtaFormField";

const Cta = () => {
  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Add form submission logic here
    e.currentTarget.reset();
  }, []);

  return (
    <div 
      className="cta-ca__area pt-150 pb-150" 
      style={{ 
        backgroundImage: `url(${ctaContent.backgroundImage.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="container container-4xl border-grid-px">
        <div className="row justify-content-center justify-content-xxl-end align-items-center">
          <div className="col-md-7 col-xxl-5 d-flex justify-content-center justify-content-xxl-end">
            <form
              action={ctaContent.form.action}
              method={ctaContent.form.method}
              className="cta__form fade_up_anim"
              data-delay={ctaContent.form.animationDelay}
              onSubmit={handleSubmit}
            >
              <h6 className="h6 cta__form-title">
                {ctaContent.form.title}
              </h6>
              {ctaContent.form.fields.map((field) => (
                <CtaFormField key={field.id} field={field} />
              ))}
              <button 
                type="submit"
                className={ctaContent.form.submitButton.className}
              >
                {ctaContent.form.submitButton.text}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cta;
