"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { heroContent } from "@/content/startup-agency/home/hero";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="hero-sa__area overflow-hidden">
      {/* <!-- hero header content  --> */}
      <div className="container container-3xl">
        <div className="row">
          <div className="col-12">
            <div className="row g-4 align-items-end hero-sa__header-gap">
              <div className="col-md-7 col-xxl-5">
                <div className="hero-sa__header">
                  <h1 className="h1 hero-sa__title text-center text-md-start">
                    <span className="word-animation">
                      {heroContent.title.firstLine}
                    </span>
                    <span className="word-animation">
                      {heroContent.title.secondLine}
                    </span>
                  </h1>
                </div>
              </div>
              <div className="col-md-5 col-xxl-3 text-center text-md-start fade_up_anim">
                <p>{heroContent.description}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="hero-sa__btn-wrapper fade_up_anim" data-delay=".4">
              <Link
                href={heroContent.button.href}
                className="common-btn outline"
              >
                <span>{heroContent.button.text}</span>
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
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- hero figures  --> */}
      <div className="d-flex justify-content-center align-items-end g-2 hero-sa__figures hero-sa__bg-shape">
        <div
          className="hero-sa__figures-item item-popup"
          data-delay={heroContent.figures[0].delay}
        >
          <Image
            src={heroContent.figures[0].src}
            alt={heroContent.figures[0].alt}
            width={0}
            height={0}
            style={{ width: "auto", height: "auto" }}
          />
        </div>

        <div
          className="hero-sa__figures-item item-popup"
          data-delay={heroContent.figures[1].delay}
        >
          <div className="hero-sa__box-wrapper d-none d-md-flex align-items-center gap-3">
            <div className="hero-sa__box-wrapper-avarters d-none d-xl-block">
              {heroContent.statsBox.avatars.map((avatar, index) => (
                <Image
                  key={index}
                  src={avatar.src}
                  alt={avatar.alt}
                  width={0}
                  height={0}
                  style={{ width: "auto", height: "auto" }}
                />
              ))}
            </div>
            <ul className="custom-ul counter d-flex align-items-center gap-1">
              <li className="counter-item hero-sa__projects">
                <span
                  className="d-inline-block odometer"
                  data-odometer-final={heroContent.statsBox.counter.value}
                >
                  100
                </span>
                <span>{heroContent.statsBox.counter.suffix}</span>
              </li>
              <li>{heroContent.statsBox.counter.label}</li>
            </ul>
          </div>
          <Image
            src={heroContent.figures[1].src}
            alt={heroContent.figures[1].alt}
            width={0}
            height={0}
            style={{ width: "auto", height: "auto" }}
          />
        </div>

        <div
          className="hero-sa__figures-item item-popup"
          data-delay={heroContent.figures[2].delay}
        >
          <Image
            src={heroContent.figures[2].src}
            alt={heroContent.figures[2].alt}
            width={0}
            height={0}
            style={{ width: "auto", height: "auto" }}
          />
        </div>

        <div
          className="hero-sa__figures-item item-popup"
          data-delay={heroContent.figures[3].delay}
        >
          <Image
            src={heroContent.figures[3].src}
            alt={heroContent.figures[3].alt}
            width={0}
            height={0}
            style={{ width: "auto", height: "auto" }}
          />
        </div>
      </div>

      {/* <!-- hero brand slider  --> */}
      <div className="container container-3xl">
        <div className="row">
          <div className="col-12">
            <div className="pseudo-reset brand__slider pt-50">
              <Swiper
                modules={[Autoplay]}
                slidesPerView="auto"
                spaceBetween={30}
                loop={true}
                autoplay={{
                  delay: 0,
                  disableOnInteraction: false,
                }}
                freeMode={true}
                speed={3000}
              >
                {heroContent.brands.map((brand, index) => (
                  <SwiperSlide key={index}>
                    <div className="brand-box">
                      <Image
                        src={brand.src}
                        alt={brand.alt}
                        style={{ width: "auto", height: "auto" }}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
