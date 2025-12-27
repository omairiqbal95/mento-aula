import React from "react";
import Link from "next/link";
import { testimonialContent } from "@/content/consultant-agency/home/testimonial";
import TestimonialColumn from "./TestimonialColumn";

const Testimonial = () => {
  return (
    <div className="testimonial-ca__area pt-150">
      <div className="container container-4xl border-grid-px">
        <div className="row justify-content-center text-center">
          <div className="col-xxl-6">
            <div className="setion_header">
              <span className="section__header-sub-title-v2 fade_up_anim">
                {testimonialContent.sectionHeader.subTitle}
              </span>
              <h3
                className="h3 section__header-title-v2--extend fade_up_anim"
                data-delay=".4"
              >
                {testimonialContent.sectionHeader.title}
              </h3>
            </div>
          </div>
        </div>
        <div className="row g-3 gy-5 gy-md-4 pt-100 testimonial-ca__wrapper row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xxl-4 row-cols-xxxl-5">
          {testimonialContent.columns.map((column) => (
            <TestimonialColumn key={column.id} column={column} />
          ))}
          <div className="col-12 testimonial-ca__view-all fade_up_anim pointer-events-none">
            <Link href="#" className="common-btn__variation3 pointer-events-auto">
              View All Reviews
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
