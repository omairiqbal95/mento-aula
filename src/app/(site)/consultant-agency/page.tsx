import React from "react";
import Hero from "@/components/consultant-agency/Hero";
import Brand from "@/components/consultant-agency/Brand";
import Services from "@/components/consultant-agency/Services";
import About from "@/components/consultant-agency/About";
import FunFact from "@/components/consultant-agency/FunFact";
import ImageSlider from "@/components/consultant-agency/ImageSlider";
import Testimonial from "@/components/consultant-agency/Testimonial";
import Team from "@/components/consultant-agency/Team";
import Resources from "@/components/consultant-agency/Resources";
import Cta from "@/components/consultant-agency/Cta";

const ConsultantAgency = () => {
  return (
    <>
      <Hero />
      <Brand />
      <Services />
      <About />
      <FunFact />
      <ImageSlider />
      <Testimonial />
      <Team />
      <Resources />
      <Cta />
    </>
  );
};

export default ConsultantAgency;
