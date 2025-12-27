import React from "react";
import About from "@/components/architectural-agency/About";
import Awards from "@/components/architectural-agency/Awards";
import BrandSlider from "@/components/architectural-agency/BrandSlider";
import CoreValue from "@/components/architectural-agency/CoreValue";
import Hero from "@/components/architectural-agency/Hero";
import Landmark from "@/components/architectural-agency/LandMark";
import LatestArticles from "@/components/architectural-agency/LatestArticles";
import Video from "@/components/architectural-agency/Video";

const ArchitecturalAgency = () => {
  return (
    <>
      <Hero />
      <About />
      <CoreValue />
      <Landmark />
      <BrandSlider />
      <Awards />
      <LatestArticles />
      <Video />
    </>
  );
};

export default ArchitecturalAgency;
