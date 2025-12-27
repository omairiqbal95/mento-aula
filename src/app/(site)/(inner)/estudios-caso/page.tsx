// app/estudios-caso/page.tsx
"use client";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";

const EstudiosCaso = () => {
  return (
    <>
      
      <div className="pt-120 pb-120">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center mb-5">
                <h1 className="display-4 fw-bold">Casos de Éxito</h1>
                <p className="lead">
                  Descubre cómo hemos ayudado a empresas de diferentes sectores a mejorar 
                  el rendimiento de sus equipos mediante formación bonificada FUNDAE.
                </p>
              </div>
            </Col>
          </Row>
          
          <Row className="mb-5">
            <Col lg={8}>
              <div className="blog-details-content">
                <h2>Historias de Éxito en Formación Empresarial</h2>
                
                <p>
                  En Mentoaula hemos tenido la oportunidad de trabajar con empresas de diversos 
                  sectores, ayudándoles a mejorar el rendimiento de sus equipos a través de 
                  formación bonificada FUNDAE. Cada caso representa un desafío único y una 
                  oportunidad para demostrar el valor de una formación bien gestionada y 
                  adaptada a las necesidades específicas de cada organización.
                </p>
                
                <h3>¿Qué encontrarás en nuestros casos de éxito?</h3>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Ejemplos reales de empresas que han mejorado su rendimiento
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Resultados tangibles obtenidos tras la formación
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Desafíos superados y soluciones implementadas
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Procesos de formación personalizados
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Impacto en la productividad y competitividad
                  </li>
                </ul>
                
                <h3>Beneficios comunes observados</h3>
                <p>
                  A través de nuestros casos de éxito, hemos observado beneficios comunes en las 
                  empresas que han confiado en nosotros para su formación bonificada: mejora en 
                  la eficiencia operativa, aumento de la satisfacción del cliente, reducción de 
                  errores y costes, y fortalecimiento de la cultura de aprendizaje continuo.
                </p>
                
                <div className="mt-4">
                  <Link href="/contacto" className="common-btn me-3">
                    <span>Comenzar Proyecto</span>
                  </Link>
                  <Link href="/formacion-bonificada" className="common-btn outline">
                    <span>Más Información</span>
                  </Link>
                </div>
              </div>
            </Col>
            
            <Col lg={4}>
              <div className="sidebar-area">
                <div className="sidebar-widget shadow p-4 mb-4">
                  <h4 className="sidebar-title">Casos por Sector</h4>
                  <ul className="sidebar-links list-unstyled">
                    <li className="mb-2">
                      <Link href="/estudios-caso#industrial" className="text-decoration-none">
                        Sector Industrial
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link href="/estudios-caso#servicios" className="text-decoration-none">
                        Servicios Profesionales
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link href="/estudios-caso#comercio" className="text-decoration-none">
                        Comercio y Distribución
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link href="/estudios-caso#tecnologia" className="text-decoration-none">
                        Tecnología y Desarrollo
                      </Link>
                    </li>
                  </ul>
                </div>
                
                <div className="sidebar-widget shadow p-4">
                  <h4 className="sidebar-title">¿Quieres ver más casos?</h4>
                  <p className="mb-3">
                    Contacta con nosotros para recibir información sobre 
                    casos de éxito en tu sector.
                  </p>
                  <Link href="/contacto" className="common-btn outline w-100">
                    <span>Contactar</span>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
          
          <Row className="mt-5">
            <Col lg={12}>
              <div className="text-center">
                <h2 className="mb-4">Casos de Éxito Destacados</h2>
                <div className="row g-4">
                  <div className="col-md-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <h5 className="card-title">Transformación Digital</h5>
                        <p className="card-text">Formación en competencias digitales para una empresa industrial</p>
                        <Link href="/estudio-caso/transformacion-digital" className="btn btn-outline-primary">
                          Ver Caso
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <h5 className="card-title">Formación Personalizada</h5>
                        <p className="card-text">Diseño de cursos específicos para perfiles profesionales</p>
                        <Link href="/estudio-caso/formacion-personalizada" className="btn btn-outline-primary">
                          Ver Caso
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <h5 className="card-title">Mejora de Procesos</h5>
                        <p className="card-text">Optimización de operaciones mediante formación en calidad</p>
                        <Link href="/estudio-caso/mejora-procesos" className="btn btn-outline-primary">
                          Ver Caso
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default EstudiosCaso;