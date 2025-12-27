import React from "react";
import { testimonialHealthContent } from "@/content/healthcare/home/testimonial-health";
import TestimonialHealthSlider from "./TestimonialHealthSlider";

const TestimonialHealth = () => {
  return (
    <div className="testimonial-health__area pb-150">
      <div className="container container-2xl">
        <div className="testimonial-health__wrapper">
          <div className="row justify-content-center text-center">
            <div className="col-lg-11 col-xl-9 section-header-v8">
              <h2
                className="h2 h2 section__header-title-v8 fade_up_anim"
                data-delay=".2"
              >
                {testimonialHealthContent.sectionTitle}
              </h2>
              <p className="health fade_up_anim" data-delay=".4">
                {testimonialHealthContent.sectionDescription}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <TestimonialHealthSlider
                testimonials={testimonialHealthContent.testimonials}
                navigation={testimonialHealthContent.navigation}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialHealth;
