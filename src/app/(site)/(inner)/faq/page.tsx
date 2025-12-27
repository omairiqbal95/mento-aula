import React from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import breadcrumbFaqImage from "@/assets/images/breadcrumb/breadcrumb-faq.png";
import FaqComponent from "@/components/inner-pages/FaqComponent";

const FAQ = () => {

  return (
    <>
      <Breadcrumb title="FAQ" backgroundImage={breadcrumbFaqImage} />
      <FaqComponent/>
    </>
  );
};

export default FAQ;
