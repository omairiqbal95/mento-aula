import React from "react";
import type { TestimonialColumn as TestimonialColumnType } from "@/types/consultant-agency/testimonial";
import TestimonialItem from "./TestimonialItem";

interface TestimonialColumnProps {
  column: TestimonialColumnType;
}

const TestimonialColumn = ({ column }: TestimonialColumnProps) => {
  return (
    <div className="col">
      <div className="row gy-4">
        {column.items.map((item) => (
          <div key={item.id} className="col-12">
            <TestimonialItem item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialColumn;
