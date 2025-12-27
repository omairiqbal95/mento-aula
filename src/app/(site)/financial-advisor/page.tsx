import React from "react";
import Hero from "@/components/financial-advisor/Hero";
import About from "@/components/financial-advisor/About";
import Roadmap from "@/components/financial-advisor/Roadmap";
import Services from "@/components/financial-advisor/Services";
import ChooseUs from "@/components/financial-advisor/ChooseUs";
import Team from "@/components/financial-advisor/Team";
import Testimonial from "@/components/financial-advisor/Testimonial";
import Faq from "@/components/financial-advisor/Faq";
import Contact from "@/components/financial-advisor/Contact";

const FinancialAdvisor = () => {
  return (
    <>
      <Hero />
      <About />
      <Roadmap />
      <Services />
      <ChooseUs />
       <Team />
      <Testimonial />
      <Faq />
      <Contact />
    </>
  );
};

export default FinancialAdvisor;
