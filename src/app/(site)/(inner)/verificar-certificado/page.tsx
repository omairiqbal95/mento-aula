import React from "react";
import { Metadata } from "next";
import Breadcrumb from "@/components/common/Breadcrumb";
import breadcrumbContactImage from "@/assets/images/breadcrumb/breadcrumb-contact.png";
import CertificateVerifier from "./CertificateVerifier";

export const metadata: Metadata = {
  title: "Verificar certificado | Mentoaula",
  description:
    "Verifica la autenticidad de un certificado Mentoaula introduciendo su código único de 10 caracteres.",
};

const VerifyCertificatePage = () => {
  return (
    <>
      <Breadcrumb title="Verificar certificado" backgroundImage={breadcrumbContactImage} />
      <CertificateVerifier />
    </>
  );
};

export default VerifyCertificatePage;
