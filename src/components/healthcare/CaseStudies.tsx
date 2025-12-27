import Image from "next/image";
import Link from "next/link";
import {
  caseStudiesData,
  caseStudiesHeader,
} from "@/content/healthcare/home/case-studies";
import ArrowIcon from "@/icons/ArrowIcon";

const CaseStudies = () => {
  return (
    <div className="case-studies-health__area">
      <div className="container container-2xl">
        <div className="row">
          <div className="col-12">
            <div className="section-header-v8 d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3">
              <h2
                className="h2 section__header-title-v8 fade_up_anim"
                data-delay=".2"
              >
                {caseStudiesHeader.title}
              </h2>
              <Link
                href={caseStudiesHeader.ctaLink}
                className="common-btn__variation8--extend common-btn__variation8--extend-2 fade_up_anim"
                data-delay=".4"
              >
                <span>
                  {caseStudiesHeader.ctaText}
                  <ArrowIcon />
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className="row pt-100">
          <div className="col-12">
            <div className="case-studies-health__masonry">
              {caseStudiesData.map((caseStudy) => (
                <div
                  key={caseStudy.id}
                  className={`case-studies-health__item ${caseStudy.itemClass}`}
                >
                  <div className="case-studies-health__thumb">
                    <Image
                      src={caseStudy.image}
                      alt={caseStudy.alt}
                      width={600}
                      height={400}
                    />
                  </div>
                  <Link
                    href={caseStudy.link}
                    className="common-btn__variation8--extend"
                  >
                    View Works
                    <ArrowIcon />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;
