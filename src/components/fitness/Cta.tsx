"use client";

import React, { useState } from "react";
import { ctaContent } from "@/content/fitness/home/cta";

const Cta = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="cta-fit">
      <div className="container container-fitness">
        <div className="row cta-fit__wrapper">
          <div className="col-12">
            <div className="cta-fit__content">
              <h3
                className="h3 section__header-title-v10 fade_up_anim"
                data-delay=".2"
              >
                {ctaContent.title}
              </h3>
              <p className="fade_up_anim" data-delay=".4">
                {ctaContent.description}
              </p>
              <form
                onSubmit={handleSubmit}
                className="cta-fit__form fade_up_anim"
                data-delay=".6"
              >
                <input
                  type="email"
                  className="form-control"
                  placeholder={ctaContent.form.placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    fill="none"
                  >
                    <path
                      d="M40.7061 24.7085L32.7061 32.7085C32.5101 32.9045 32.254 33.0005 31.998 33.0005C31.742 33.0005 31.486 32.9025 31.29 32.7085C30.9 32.3185 30.9 31.6845 31.29 31.2945L37.582 25.0025H8C7.448 25.0025 7 24.5545 7 24.0025C7 23.4505 7.448 23.0025 8 23.0025H37.5859L31.2939 16.7105C30.9039 16.3205 30.9039 15.6864 31.2939 15.2964C31.6839 14.9064 32.318 14.9064 32.708 15.2964L40.708 23.2964C40.8 23.3884 40.8738 23.5006 40.9238 23.6226C41.0258 23.8666 41.0258 24.1427 40.9238 24.3867C40.8718 24.5047 40.7981 24.6165 40.7061 24.7085Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cta;
