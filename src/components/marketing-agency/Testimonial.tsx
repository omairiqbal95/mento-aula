import React from "react";
import TestimonialSwiper from "./TestimonialSwiper";
import { CONSTANT_TESTIMONIALS } from "@/content/marketing-agency/home/testimonial";
import { CONSTANT_TESTIMONIAL_HEADER } from "@/content/marketing-agency/home/testimonial";

const TestimonialSlider= () => {
  const {subTitle,title,description}=CONSTANT_TESTIMONIAL_HEADER;
  return (
    <div className="testimonial-mar__area pt-150">
      <div className="container container-mini">
        <div className="row g-4 align-items-center section__header-v11">
          <div className="col-lg-7 fade_up_anim" data-delay=".4">
            <span className="section__header-sub-title-v11">{subTitle}</span>
            <h2 className="h2 section__header-title-v11">{title}</h2>
          </div>
          <div className="col-lg-5 fade_up_anim" data-delay=".8">
            <p>{description}</p>
          </div>
        </div>
      </div>

      {/* Testimonial Slider Area - Renders the client component */}
      <div className="container container-left-auto pt-100">
        <div className="row">
          <div className="col-12">
            <TestimonialSwiper testimonials={CONSTANT_TESTIMONIALS} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
