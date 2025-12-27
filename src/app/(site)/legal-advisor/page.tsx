import React from "react";
import Hero from "@/components/legal-advisor/Hero";
import About from "@/components/legal-advisor/About";
import Services from "@/components/legal-advisor/Services";
import Testimonial from "@/components/legal-advisor/Testimonial";
import Clients from "@/components/legal-advisor/Clients";
import Video from "@/components/legal-advisor/Video";
import Team from "@/components/legal-advisor/Team";
import Contact from "@/components/legal-advisor/Contact";

const ArchitecturalAgency = () => {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Testimonial />
      <Clients />
      <Video />
      <Team />
      <Contact />
    </>
  );
};

export default ArchitecturalAgency;
