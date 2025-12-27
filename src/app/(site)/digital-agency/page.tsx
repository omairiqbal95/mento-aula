import React from "react";
import Hero from "@/components/digital-agency/Hero";
import About from "@/components/digital-agency/About";
import Work from "@/components/digital-agency/Work";
import Services from "@/components/digital-agency/Services";
import Testimonial from "@/components/digital-agency/Testimonial";
import Team from "@/components/digital-agency/Team";
import ImageSlider from "@/components/digital-agency/ImageSlider";
import Clients from "@/components/digital-agency/Clients";

const DigitalAgency = () => {
  return (
    <>
      <Hero />
      <About />
      <Work />
      <Services />
      <Testimonial />
      <Team />
      <ImageSlider />
      <Clients />
    </>
  );
};

export default DigitalAgency;
