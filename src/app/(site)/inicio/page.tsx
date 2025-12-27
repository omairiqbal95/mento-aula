import Hero from "@/components/marketing-agency/Hero";
import Services from "@/components/marketing-agency/Services";
import CaseStudy from "@/components/marketing-agency/CaseStudy";
import TestimonialSlider from "@/components/marketing-agency/Testimonial";
import ChooseUs from "@/components/marketing-agency/ChooseUs";
import VideoSection from "@/components/marketing-agency/VideoSection";
import Awards from "@/components/marketing-agency/Awards";
import Blogs from "@/components/marketing-agency/Blogs";
import CtaMarquee from "@/components/marketing-agency/CtaMarquee";

const MarketingAgency = () => {
  return (
    <>
      <Hero />
      <Services />
      <CaseStudy />
      <TestimonialSlider />
      <ChooseUs />
      <VideoSection />
      <Awards />
      <Blogs />
      <CtaMarquee />
    </>
  );
};

export default MarketingAgency;
