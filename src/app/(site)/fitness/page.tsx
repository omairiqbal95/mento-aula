import React from "react";
import Hero from "@/components/fitness/Hero";
import About from "@/components/fitness/About";
import Services from "@/components/fitness/Services";
import ChooseUs from "@/components/fitness/ChooseUs";
import Quote from "@/components/fitness/Quote";
import Products from "@/components/fitness/Products";
import Pricing from "@/components/fitness/Pricing";
import Faq from "@/components/fitness/Faq";
import Cta from "@/components/fitness/Cta";

const Fitness = () => {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <ChooseUs />
      <Quote />
      <Products />
      <Pricing />
      <Faq />
      <Cta />
    </>
  );
};

export default Fitness;
