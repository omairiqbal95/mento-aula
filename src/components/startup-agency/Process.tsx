import Image from "next/image";
import { processContent } from "@/content/startup-agency/home/process";

export default function Process() {
  return (
    <section className="process-sa__area pb-150">
      <div className="container container-3xl">
        <div className="row align-items-center gy-4">
          <div className="col-xl-8 col-xxl-6">
            <div className="section__header text-center text-md-start">
              <h3 className="h3 section__title fade_up_anim">
                {processContent.sectionTitle}
              </h3>
              <p className="fade_up_anim" data-delay=".4">
                {processContent.sectionDescription}
              </p>
            </div>
          </div>
        </div>
        <div className="row justify-content-center justify-content-md-between text-center text-lg-start g-4 gy-5 pt-100">
          {processContent.processes.map((process) => (
            <div
              key={process.id}
              className="col-md-6 col-lg-4 process-sa__item-wrapper fade_up_anim"
              data-delay={process.delay}
            >
              <div className="process-sa__item">
                <div className="process-sa__item-thumb">
                  <Image
                    src={process.icon}
                    alt={process.title}
                    width={80}
                    height={80}
                  />
                </div>
                <div className="process-sa__item-content">
                  <h5 className="h5">{process.title}</h5>
                  <p>{process.description}</p>
                </div>
                <div className="process-sa__item-number d-none d-md-flex">
                  <span>{process.number}</span>
                  <span className="line"></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
