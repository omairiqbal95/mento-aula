// app/formacion-personalizada/page.tsx
"use client";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";

const FormacionPersonalizada = () => {
  return (
    <>
      
      <div className="pt-120 pb-120">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center mb-5">
                <h1 className="display-4 fw-bold">Formación Personalizada</h1>
                <p className="lead">
                  Diseñamos acciones formativas estándar o totalmente personalizadas, adaptándonos 
                  al sector, a los perfiles profesionales y a los horarios de cada empresa.
                </p>
              </div>
            </Col>
          </Row>
          
          <Row className="mb-5">
            <Col lg={8}>
              <div className="blog-details-content">
                <h2>Formación Adaptada a Tus Necesidades</h2>
                
                <p>
                  En Mentoaula ofrecemos formación personalizada que se adapta completamente a las 
                  necesidades específicas de tu empresa. Diseñamos planes formativos que responden a 
                  los objetivos de tu organización, al sector en el que operas y a los perfiles 
                  profesionales de tus trabajadores.
                </p>
                
                <h3>Beneficios de la formación personalizada</h3>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Contenidos adaptados a tu sector específico
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Ajuste a los perfiles profesionales de tu equipo
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Horarios adaptados a tu organización
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Formación práctica orientada al puesto de trabajo
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Mayor efectividad y retorno de inversión
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Cumplimiento de objetivos formativos específicos
                  </li>
                </ul>
                
                <h3>Proceso de diseño de formación personalizada</h3>
                <p>
                  Nuestro proceso comienza con un análisis detallado de las necesidades formativas de 
                  tu empresa. Identificamos las competencias clave, los perfiles profesionales y los 
                  objetivos de desarrollo. A partir de esta información, diseñamos contenidos 
                  específicos que se alinean con tu estrategia de negocio.
                </p>
                
                <h3>Tipos de formación personalizada</h3>
                <p>
                  Ofrecemos diferentes modalidades de formación personalizada: desde cursos adaptados 
                  de nuestro catálogo estándar hasta programas completamente nuevos diseñados desde 
                  cero. También desarrollamos formación en competencias específicas de tu sector, 
                  habilidades de liderazgo, herramientas internas o procesos específicos de tu empresa.
                </p>
                
                <div className="mt-4">
                  <Link href="/contacto" className="common-btn me-3">
                    <span>Solicitar Formación Personalizada</span>
                  </Link>
                  <Link href="/catalogo-cursos" className="common-btn outline">
                    <span>Ver Catálogo Estándar</span>
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
                      <Link href="/formacion-bonificada" className="text-decoration-none">
                        Formación Bonificada
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
                    <li className="mb-2">
                      <Link href="/catalogo-cursos" className="text-decoration-none">
                        Catálogo de Cursos
                      </Link>
                    </li>
                  </ul>
                </div>
                
                <div className="sidebar-widget shadow p-4">
                  <h4 className="sidebar-title">¿Quieres formación a medida?</h4>
                  <p className="mb-3">
                    Contacta con nosotros para diseñar un plan formativo personalizado 
                    que se adapte exactamente a las necesidades de tu empresa.
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

export default FormacionPersonalizada;