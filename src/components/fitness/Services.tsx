import Image from "next/image";
import Link from "next/link";
import { servicesContent } from "@/content/fitness/home/services";
import ArrowRightLong from "@/icons/ArrowRightLong";

const Services = () => {
  return (
    <div className="service-fit pt-150 pb-150">
      <div className="container container-fitness">
        <div className="row g-4 justify-content-center justify-content-md-between align-items-end text-center text-md-start">
          <div className="col-md-7 col-xl-9">
            <span
              className="section__header-sub-title-v10--extend fade_up_anim"
              data-delay=".2"
            >
              <Image src={servicesContent.sectionHeader.icon} alt="thunder" />
              {servicesContent.sectionHeader.subTitle}
            </span>
            <h3
              className="h3 section__header-title-v10 fade_up_anim"
              data-delay=".4"
            >
              {servicesContent.sectionHeader.title}
            </h3>
          </div>
          <div
            className="col-md-5 col-xl-3 text-center text-md-end fade_up_anim"
            data-delay={servicesContent.ctaButton.delay}
          >
            <Link
              href={servicesContent.ctaButton.href}
              className="common-btn__variation10"
            >
              {servicesContent.ctaButton.text}
            </Link>
          </div>
        </div>
        <div className="row g-4 pt-100">
          {servicesContent.services.map((service) => (
            <div
              key={service.id}
              className="col-sm-6 col-xl-4 col-xxl-3 fade_up_anim"
              data-delay={service.delay}
            >
              <div className="service-fit__item">
                <div className="service-fit__item-body">
                  <figure className="service-fit__item-thumb">
                    <Image
                      src={service.image}
                      alt={`services-fit-${service.id}`}
                    />
                  </figure>
                  <h5 className="h5 service-fit__item-title">
                    <Link href={service.link}>{service.title}</Link>
                  </h5>
                  <p>{service.description}</p>
                </div>
                <Link href={service.link} className="learn-more-btn">
                  LEARN MORE
                  <ArrowRightLong />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
