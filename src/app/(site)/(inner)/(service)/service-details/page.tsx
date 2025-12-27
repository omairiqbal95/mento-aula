import React from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import breadcrumbServiceDetailsImage from '@/assets/images/breadcrumb/breadcrumb-service-details.png';
import ServiceDetails from "@/components/inner-pages/ServiceDetails";


const Service = () => {
  return (
    <>
      <Breadcrumb title="Development" backgroundImage={breadcrumbServiceDetailsImage} />
      <ServiceDetails/>
    </>
  );
};

export default Service;
