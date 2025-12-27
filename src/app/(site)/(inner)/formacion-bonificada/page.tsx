// app/formacion-bonificada/page.tsx
"use client";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";

const FormacionBonificada = () => {
  return (
    <>
      
      <div className="pt-120 pb-120">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center mb-5">
                <h1 className="display-4 fw-bold">Formación Bonificada FUNDAE</h1>
                <p className="lead">
                  Ayudamos a las empresas a formar a sus trabajadores mediante formación bonificada FUNDAE, 
                  permitiendo restar el coste de la formación de los seguros sociales.
                </p>
              </div>
            </Col>
          </Row>
          
          <Row className="mb-5">
            <Col lg={8}>
              <div className="blog-details-content">
                <h2>¿Qué es la Formación Bonificada?</h2>
                
                <p>
                  La Formación Bonificada a través de FUNDAE permite a las empresas formar a sus 
                  trabajadores y restar el coste de la formación de los seguros sociales, aprovechando 
                  el crédito anual disponible. En Mentoaula gestionamos todo el proceso de principio a fin, 
                  asegurando el cumplimiento normativo y una gestión clara, ordenada y segura.
                </p>
                
                <h3>¿Cómo funciona?</h3>
                <p>
                  El proceso de formación bonificada se divide en varias fases: análisis de necesidades 
                  formativas, diseño del plan formativo, comunicación de inicio a FUNDAE, impartición de 
                  la formación, seguimiento del proceso, evaluación y justificación final.
                </p>
                
                <h3>Beneficios para tu empresa</h3>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Formación sin coste para la empresa
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Mejora del rendimiento y competitividad del equipo
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Flexibilidad total en horarios y ubicación
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Formación 100% online y tutorizada
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Gestión integral del proceso formativo
                  </li>
                </ul>
                
                <h3>Qué incluye nuestro servicio</h3>
                <p>
                  En Mentoaula ofrecemos un servicio completo que incluye el análisis del crédito formativo 
                  disponible, diseño del plan formativo online, gestión administrativa y documental, 
                  comunicaciones oficiales de inicio y finalización, seguimiento técnico de la formación 
                  y justificación técnica y económica.
                </p>
                
                <div className="mt-4">
                  <Link href="/contacto" className="common-btn me-3">
                    <span>Solicitar Información</span>
                  </Link>
                  <Link href="/catalogo-cursos" className="common-btn outline">
                    <span>Ver Catálogo de Cursos</span>
                  </Link>
                </div>
              </div>
            </Col>
            
            <Col lg={4}>
              <div className="sidebar-area">
                <div className="sidebar-widget shadow p-4 mb-4">
                  <h4 className="sidebar-title">Servicios Relacionados</h4>
                  <ul className="sidebar-links list-unstyled">
                    <li className="mb-2">
                      <Link href="/plataforma-elearning" className="text-decoration-none">
                        Plataforma eLearning
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link href="/gestion-fundae" className="text-decoration-none">
                        Gestión FUNDAE
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link href="/consultoria" className="text-decoration-none">
                        Consultoría Formativa
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link href="/como-trabajamos" className="text-decoration-none">
                        Cómo Trabajamos
                      </Link>
                    </li>
                  </ul>
                </div>
                
                <div className="sidebar-widget shadow p-4">
                  <h4 className="sidebar-title">¿Tienes dudas?</h4>
                  <p className="mb-3">
                    ¿Necesitas más información sobre la formación bonificada? Contacta con nosotros 
                    para resolver todas tus preguntas.
                  </p>
                  <Link href="/contacto" className="common-btn outline w-100">
                    <span>Contactar</span>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default FormacionBonificada;