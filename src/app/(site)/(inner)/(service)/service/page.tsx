import React from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import breadcrumbServicesImage from '@/assets/images/breadcrumb/breadcrumb-services.png';
import ServiceDefault from "@/components/inner-pages/ServiceDefault";


const Service = () => {
  return (
    <>
      <Breadcrumb title="Service Default" backgroundImage={breadcrumbServicesImage} />
      <ServiceDefault/>
    </>
  );
};

export default Service;
