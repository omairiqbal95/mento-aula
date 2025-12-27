import React from "react";
import Image from "next/image";
import { workData } from "@/content/digital-agency/home/featuredWorks";
import Link from "next/link";

const Work = () => {
  return (
    <div className="work-digital pt-150 pb-150">
      <div className="container container-mini">
        <div className="row">
          <div className="col-12">
            <div className="section__header-v12">
              <span className="section__header-sub-title-v12">
                {workData.sectionSubtitle}
              </span>
              <h2 className="h2 section__header-title-v12">
                {workData.sectionTitle}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="container container-fitness">
        <div className="row">
          <div className="col-12">
            <div className="work-digital__items">
              {workData.works.map((work) => (
                <div key={work.id} className="work-digital__item">
                  <figure className="work-digital__item-thumb">
                    <Image src={work.image} alt={work.title} />
                    <Link
                      href={work.link}
                      className="work-digital__item-link btn-hover btn-item"
                    >
                      View
                    </Link>
                  </figure>
                  <div className="work-digital__item-content">
                    <h5 className="h5 work-title">{work.title}</h5>
                    <p className="work-info">
                      {work.category} - {work.year}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 pt-100 text-center">
            <Link
              href={workData.viewAllLink}
              className="common-btn common-btn-v1 black-transparent-btn"
            >
              {workData.viewAllText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
