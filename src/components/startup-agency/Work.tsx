import React from "react";
import Image from "next/image";
import { workContent } from "@/content/startup-agency/home/work";
import Link from "next/link";

const Work = () => {
  return (
    <section className="work-sa__area">
      <div className="work-sa__wrapper pb-150">
        <div className="container container-3xl">
          <div className="row align-items-center mb-100">
            <div className="col-md-6 col-xl-6 fade_up_anim">
              <div className="section__title">
                <h2 className="h2">{workContent.section.title}</h2>
              </div>
            </div>
            <div className="col-md-6 col-xl-4 fade_up_anim" data-delay=".4">
              <p>{workContent.section.description}</p>
            </div>
          </div>
          <div className="row g-4 gy-xl-5">
            {workContent.items.map((item) => (
              <div
                key={item.id}
                className={`${
                  item.isFullWidth ? "col-12" : "col-md-6"
                } fade_up_anim`}
                data-delay={item.delay}
              >
                <div className="work-sa__item">
                  <Link href={item.href} className="work-sa__item-figure">
                    <Image
                      src={item.image}
                      alt="work"
                      width={0}
                      height={0}
                      style={{ width: "100%", height: "auto" }}
                    />
                  </Link>
                  <div className="work-sa__item-body">
                    <div className="work-sa__item-content">
                      <h6 className="h6">
                        <Link href={item.href}>{item.title}</Link>
                      </h6>
                      <p>{item.description}</p>
                    </div>
                    <Link href={item.href} className="arrow">
                      <Image
                        src={workContent.arrow}
                        alt="arrow"
                        width={0}
                        height={0}
                        style={{ width: "auto", height: "auto" }}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            className="d-flex justify-content-center align-items-lg-center pt-75 gap-3 fade_up_anim"
            data-delay="1"
          >
            <Link href={workContent.button.href} className="common-btn">
              <span>{workContent.button.text}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="15"
                viewBox="0 0 20 15"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.6047 5.59423C17.0639 6.64489 18.83 7 20 7V8C18.83 8 17.0639 8.35511 15.6047 9.40577C14.1709 10.4381 13 12.163 13 15H12C12 11.837 13.3291 9.81193 15.0203 8.59423C15.3337 8.36859 15.6584 8.17142 15.9878 8H0V7H15.9878C15.6584 6.82858 15.3337 6.63141 15.0203 6.40577C13.3291 5.18807 12 3.16296 12 0H13C13 2.83704 14.1709 4.56193 15.6047 5.59423Z"
                  fill="currentColor"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
