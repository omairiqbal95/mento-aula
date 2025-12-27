import React from "react";
import { testimonialData } from "@/content/digital-agency/home/testimonial";
import TestimonialSlider from "./TestimonialSlider";

const Testimonial = () => {
  return (
    <div className="testimonial-digital pt-150 pb-150">
      <div className="container container-mini">
        <div className="row">
          <div className="col-12">
            <div className="section__header-v12 text-center">
              <h2 className="h2 section__header-title-v12 fade_up_anim">
                {testimonialData.title}
              </h2>
              <p className="fade_up_anim" data-delay=".4">
                {testimonialData.description}
              </p>
            </div>
          </div>
        </div>
        <div className="row pt-100">
          <div className="col-12">
            <TestimonialSlider testimonials={testimonialData.testimonials} noBorder={true}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
