import { testimonialAbContent } from "@/content/about/testimonialAb";
import TestimonialAbSlider from "./TestimonialAbSlider";

export default function TestimonialAb() {
  return (
    <div className="testimonial-ab__area pt-150 pb-150 overflow-hidden">
      <div className="section__header">
        <div className="container container-custom">
          <div className="row g-3 justify-content-between align-items-end text-center text-md-start">
            <div className="col-lg-7 col-xl-7">
              <span
                className="section__header-sub-title fade_up_anim"
                data-delay=".2"
              >
                {testimonialAbContent.sectionSubTitle}
              </span>
              <h2
                className="h2 section__header-title fade_up_anim"
                data-delay=".4"
              >
                {testimonialAbContent.sectionTitle}
              </h2>
            </div>
            <div className="col-lg-5 col-xl-4 fade_up_anim" data-delay=".6">
              <p>{testimonialAbContent.sectionDescription}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container container-custom pt-100">
        <TestimonialAbSlider testimonials={testimonialAbContent.testimonials} />
      </div>
    </div>
  );
}
