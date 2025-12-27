import React from "react";
import Image from "next/image";
import { portfolioDetailsContent } from "@/content/inner-pages/portfolio-details";
import ProcessStep from "./portfolio-details/ProcessStep";
import GalleryItem from "./portfolio-details/GalleryItem";
import RelatedProjectItem from "./portfolio-details/RelatedProjectItem";
import ProjectInfo from "./portfolio-details/ProjectInfo";
import ResultsList from "./portfolio-details/ResultsList";
import ObjectivesList from "./portfolio-details/ObjectivesList";

const PortfolioDetails = () => {
  const {
    background,
    objectives,
    mainImage,
    process,
    gallery,
    results,
    projectInfo,
    relatedProjects,
  } = portfolioDetailsContent;

  return (
    <div className="case-details__area pt-150 pb-150">
      <div className="container pb-75">
        <div className="row g-4 g-xxl-5">
          <div className="col-xl-8 fade_up_anim" data-delay=".2">
            <div className="case-details__detailedInfo">
              <h4 className="h4 fade_up_anim" data-delay=".22">
                {background.title}
              </h4>
              <p className="fade_up_anim" data-delay=".23">
                {background.description}
              </p>
              
              <ObjectivesList objectives={objectives} />
              
              <figure className="fade_up_anim" data-delay=".25">
                <Image src={mainImage.image} alt={mainImage.alt} />
              </figure>
              
              <h4 className="h4 fade_up_anim" data-delay=".26">
                {process.title}
              </h4>
              <div className="case-details__detailedInfo-process-list">
                {process.steps.map((step) => (
                  <ProcessStep key={step.id} step={step} delay=".27" />
                ))}
              </div>
              
              <div className="case-details__detailedInfo-gallery">
                {gallery.map((item) => (
                  <GalleryItem key={item.id} item={item} />
                ))}
              </div>
              
              <ResultsList results={results} />
            </div>
          </div>
          
          <div className="col-xl-4 fade_up_anim" data-delay=".4">
            <ProjectInfo projectInfo={projectInfo} />
          </div>
        </div>
      </div>
      
      <div className="container border-top pt-75">
        <div className="row more-project g-4">
          <div className="col-12">
            <h4 className="h4 fade_up_anim" data-delay=".2">
              {relatedProjects.title}
            </h4>
          </div>
          {relatedProjects.items.map((project, index) => (
            <RelatedProjectItem
              key={project.id}
              project={project}
              delay={index === 0 ? ".3" : ".4"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetails;