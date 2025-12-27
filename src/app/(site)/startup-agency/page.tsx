import About from "@/components/startup-agency/About";
import FAQ from "@/components/startup-agency/FAQ";
import Hero from "@/components/startup-agency/Hero";
import ImageGallery from "@/components/startup-agency/ImageGallery";
import Process from "@/components/startup-agency/Process";
import Services from "@/components/startup-agency/Services";
import Testimonial from "@/components/startup-agency/Testimonial";
import Work from "@/components/startup-agency/Work";
import React from "react";

const StartupAgency = () => {
  return (
    <>
      <Hero />
      <About />
      <Work />
      <Services />
      <Testimonial />
      <Process />
      <FAQ />
      <ImageGallery />
    </>
  );
};

export default StartupAgency;
