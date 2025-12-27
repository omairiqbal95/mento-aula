import About from "@/components/healthcare/About";
import AppointmentForm from "@/components/healthcare/AppointmentForm";
import BrandSlider from "@/components/healthcare/Brand";
import CaseStudies from "@/components/healthcare/CaseStudies";
import FunFacts from "@/components/healthcare/FanFacts";
import Gallery from "@/components/healthcare/Gallery";
import Hero from "@/components/healthcare/Hero";
import ServiceAccordion from "@/components/healthcare/ServiceAccordion";
import TeamHealth from "@/components/healthcare/TeamHealth";
import TestimonialHealth from "@/components/healthcare/TestimonialHealth";
import React from "react";

const Healthcare = () => {
  return (
    <>
      <Hero />
      <About />
      <BrandSlider />
      <ServiceAccordion />
      <CaseStudies />
      <TeamHealth />
      <TestimonialHealth />
      <FunFacts />
      <AppointmentForm />
      <Gallery />
    </>
  );
};

export default Healthcare;
