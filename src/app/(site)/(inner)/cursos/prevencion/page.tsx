// app/cursos/prevencion/page.tsx
"use client";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";

const Prevencion = () => {
  return (
    <>
      
      <div className="pt-120 pb-120">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center mb-5">
                <h1 className="display-4 fw-bold">Prevención y Normativa</h1>
                <p className="lead">
                  Prevención de riesgos laborales, normativa aplicable, 
                  seguridad en el trabajo y cumplimiento legal para garantizar 
                  un entorno laboral seguro y conforme a la legislación vigente.
                </p>
              </div>
            </Col>
          </Row>
          
          <Row className="mb-5">
            <Col lg={8}>
              <div className="blog-details-content">
                <h2>Formación en Prevención y Normativa</h2>
                
                <p>
                  Nuestros cursos de prevención y normativa están diseñados para desarrollar 
                  competencias en la prevención de riesgos laborales, el conocimiento de la 
                  normativa aplicable y la implementación de medidas de seguridad en el entorno 
                  laboral. Se enfocan en prácticas que los trabajadores pueden aplicar directamente 
                  para garantizar un entorno de trabajo seguro y conforme a la legislación vigente.
                </p>
                
                <h3>Tipos de cursos disponibles</h3>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Prevención de riesgos laborales
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Seguridad en el trabajo
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Normativa de prevención aplicable
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Evaluación de riesgos
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Planes de emergencia y evacuación
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Cumplimiento legal y auditorías
                  </li>
                </ul>
                
                <h3>Objetivos del área formativa</h3>
                <p>
                  Nuestros cursos de prevención y normativa tienen como objetivo garantizar la 
                  seguridad en el entorno laboral, cumplir con la normativa de prevención de 
                  riesgos laborales, desarrollar habilidades en la evaluación de riesgos y fomentar 
                  una cultura de prevención. Se enfocan en prácticas que contribuyen a la reducción 
                  de accidentes laborales y al cumplimiento legal de la empresa.
                </p>
                
                <h3>Metodología de formación</h3>
                <p>
                  La formación se imparte 100% online a través de nuestra plataforma eLearning, 
                  con contenidos interactivos, simulaciones de situaciones de riesgo, estudios de 
                  caso reales, ejercicios prácticos y evaluaciones continuas. Cada curso incluye 
                  tutorización personalizada y soporte técnico para garantizar el máximo aprovechamiento 
                  del proceso formativo.
                </p>
                
                <div className="mt-4">
                  <Link href="/contacto" className="common-btn me-3">
                    <span>Solicitar Información</span>
                  </Link>
                  <Link href="/catalogo-cursos" className="common-btn outline">
                    <span>Ver Otros Cursos</span>
                  </Link>
                </div>
              </div>
            </Col>
            
            <Col lg={4}>
              <div className="sidebar-area">
                <div className="sidebar-widget shadow p-4 mb-4">
                  <h4 className="sidebar-title">Cursos Relacionados</h4>
                  <ul className="sidebar-links list-unstyled">
                    <li className="mb-2">
                      <Link href="/cursos/competencias-digitales" className="text-decoration-none">
                        Competencias Digitales
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link href="/cursos/gestion-empresarial" className="text-decoration-none">
                        Gestión Empresarial
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link href="/cursos/comercial-ventas" className="text-decoration-none">
                        Comercial y Ventas
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link href="/cursos/atencion-cliente" className="text-decoration-none">
                        Atención al Cliente
                      </Link>
                    </li>
                  </ul>
                </div>
                
                <div className="sidebar-widget shadow p-4">
                  <h4 className="sidebar-title">¿Quieres garantizar la seguridad en tu empresa?</h4>
                  <p className="mb-3">
                    Contacta con nosotros para diseñar un plan formativo en 
                    prevención y normativa adaptado a tu empresa.
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
                <h2 className="mb-4">Cursos Destacados en Prevención y Normativa</h2>
                <div className="row g-4">
                  <div className="col-md-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <h5 className="card-title">Prevención de Riesgos Laborales</h5>
                        <p className="card-text">Conocimientos esenciales para garantizar la seguridad en el trabajo</p>
                        <Link href="/curso/prevencion-riesgos" className="btn btn-outline-primary">
                          Ver Curso
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <h5 className="card-title">Evaluación de Riesgos</h5>
                        <p className="card-text">Métodos para identificar y evaluar peligros en el entorno laboral</p>
                        <Link href="/curso/evaluacion-riesgos" className="btn btn-outline-primary">
                          Ver Curso
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <h5 className="card-title">Normativa de Prevención</h5>
                        <p className="card-text">Conocimiento de la legislación aplicable y obligaciones legales</p>
                        <Link href="/curso/normativa-prevencion" className="btn btn-outline-primary">
                          Ver Curso
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

export default Prevencion;