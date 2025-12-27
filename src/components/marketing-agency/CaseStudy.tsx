import React from 'react'
import CaseStudyItem from './CaseStudyItem';
import { CONSTANT_CASE_STUDIES } from "@/content/marketing-agency/home/case-study";

const CaseStudy  = () => {
  return (
    <div className="case-study-mar__area">
      <div className="case-study-mar__wrapper">
        {CONSTANT_CASE_STUDIES.map((study) => (
          <CaseStudyItem key={study.id} {...study} />
        ))}
      </div>
    </div>
  )
}

export default CaseStudy