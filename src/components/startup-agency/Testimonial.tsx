import React from "react";
import { testimonialContent } from "@/content/startup-agency/home/testimonials";
import TestimonialSlider from "./TestimonialSlider";

const Testimonial = () => {
  return (
    <section className="testimonial-sa__area overflow-hidden mb-150">
      <div className="testimonial-sa__wrapper pt-150">
        <div className="container container-3xl custom-container">
          <div className="row g-4">
            <div className="col-md-6 col-lg-4 col-xxl-3">
              <div className="section__header text-center text-md-start">
                <h3 className="h3 section__title fade_up_anim">
                  {testimonialContent.sectionTitle}
                </h3>
                <p className="fade_up_anim" data-delay=".4">
                  {testimonialContent.sectionDescription}
                </p>
              </div>
            </div>
            <div className="col-lg-8 col-xxl-9">
              <TestimonialSlider
                testimonials={testimonialContent.testimonials}
                navigation={testimonialContent.navigation}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
