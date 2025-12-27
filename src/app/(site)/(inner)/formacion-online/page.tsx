// app/formacion-online/page.tsx
"use client";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";

const FormacionOnline = () => {
  return (
    <>
      
      <div className="pt-120 pb-120">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center mb-5">
                <h1 className="display-4 fw-bold">Formación 100% Online</h1>
                <p className="lead">
                  Toda nuestra formación se imparte 100% online, con flexibilidad total y 
                  acompañamiento continuo para mejorar las competencias profesionales de tus trabajadores.
                </p>
              </div>
            </Col>
          </Row>
          
          <Row className="mb-5">
            <Col lg={8}>
              <div className="blog-details-content">
                <h2>Formación Online Flexible y Accesible</h2>
                
                <p>
                  Nuestra formación 100% online está diseñada para adaptarse a las necesidades de las empresas 
                  y los horarios de los trabajadores. Ofrecemos una plataforma eLearning accesible desde 
                  cualquier dispositivo, con contenido interactivo y evaluaciones continuas que aseguran 
                  el aprovechamiento del proceso formativo.
                </p>
                
                <h3>Ventajas de la formación online</h3>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Acceso desde cualquier lugar y en cualquier momento
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Flexibilidad horaria total
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Contenidos interactivos y multimedia
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Seguimiento del progreso en tiempo real
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Reducción de costes logísticos
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Tutorización personalizada
                  </li>
                </ul>
                
                <h3>Modalidad de formación</h3>
                <p>
                  La formación se imparte en modalidad 100% online, tutorizada y accesible desde cualquier 
                  dispositivo. Los trabajadores pueden acceder a los contenidos formativos, participar en 
                  actividades, realizar evaluaciones y obtener certificaciones sin necesidad de desplazamientos 
                  ni ajustes de horarios.
                </p>
                
                <h3>Plataforma eLearning</h3>
                <p>
                  Contamos con una plataforma eLearning propia que permite impartir formación online de forma 
                  flexible, accesible y eficiente. El campus facilita el aprendizaje autónomo, el seguimiento 
                  del progreso del alumnado y la reducción de costes logísticos.
                </p>
                
                <div className="mt-4">
                  <Link href="/plataforma-elearning" className="common-btn me-3">
                    <span>Conocer Plataforma</span>
                  </Link>
                  <Link href="/contacto" className="common-btn outline">
                    <span>Solicitar Información</span>
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
                      <Link href="/formacion-bonificada" className="text-decoration-none">
                        Formación Bonificada
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link href="/tutorizacion" className="text-decoration-none">
                        Tutorización
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link href="/evaluacion" className="text-decoration-none">
                        Evaluación Online
                      </Link>
                    </li>
                  </ul>
                </div>
                
                <div className="sidebar-widget shadow p-4">
                  <h4 className="sidebar-title">¿Tienes dudas?</h4>
                  <p className="mb-3">
                    ¿Quieres saber más sobre nuestra formación 100% online? Contacta con nosotros 
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

export default FormacionOnline;