// app/clientes/page.tsx
"use client";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";

const Clientes = () => {
  return (
    <>
      
      <div className="pt-120 pb-120 bg-light">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={8} className="text-center">
              <h1 className="display-4 fw-bold mb-4">Empresas que confían en nosotros</h1>
              <p className="lead">
                Descubre las empresas de diferentes sectores que han confiado en Mentoaula 
                para mejorar el rendimiento de sus equipos mediante formación bonificada FUNDAE.
              </p>
            </Col>
          </Row>
          
          <Row className="g-4 mb-5">
            <Col lg={4} md={6}>
              <div className="card h-100 border-0 shadow-sm bg-white">
                <div className="card-body text-center p-5">
                  <div className="client-icon bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" style={{width: '80px', height: '80px'}}>
                    <i className="bi bi-building fs-1"></i>
                  </div>
                  <h5 className="card-title">Empresa Industrial</h5>
                  <p className="card-text">Formación en prevención de riesgos laborales y mejora de procesos.</p>
                  <Link href="/estudio-caso/empresa-industrial" className="btn btn-outline-primary">
                    Ver Caso
                  </Link>
                </div>
              </div>
            </Col>
            
            <Col lg={4} md={6}>
              <div className="card h-100 border-0 shadow-sm bg-white">
                <div className="card-body text-center p-5">
                  <div className="client-icon bg-success text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" style={{width: '80px', height: '80px'}}>
                    <i className="bi bi-briefcase fs-1"></i>
                  </div>
                  <h5 className="card-title">Servicios Profesionales</h5>
                  <p className="card-text">Formación en gestión empresarial y competencias digitales.</p>
                  <Link href="/estudio-caso/servicios-profesionales" className="btn btn-outline-success">
                    Ver Caso
                  </Link>
                </div>
              </div>
            </Col>
            
            <Col lg={4} md={6}>
              <div className="card h-100 border-0 shadow-sm bg-white">
                <div className="card-body text-center p-5">
                  <div className="client-icon bg-info text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" style={{width: '80px', height: '80px'}}>
                    <i className="bi bi-cart fs-1"></i>
                  </div>
                  <h5 className="card-title">Comercio y Distribución</h5>
                  <p className="card-text">Formación en atención al cliente y técnicas de venta.</p>
                  <Link href="/estudio-caso/comercio-distribucion" className="btn btn-outline-info">
                    Ver Caso
                  </Link>
                </div>
              </div>
            </Col>
            
            <Col lg={4} md={6}>
              <div className="card h-100 border-0 shadow-sm bg-white">
                <div className="card-body text-center p-5">
                  <div className="client-icon bg-warning text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" style={{width: '80px', height: '80px'}}>
                    <i className="bi bi-laptop fs-1"></i>
                  </div>
                  <h5 className="card-title">Tecnología y Desarrollo</h5>
                  <p className="card-text">Formación en herramientas digitales y metodologías ágiles.</p>
                  <Link href="/estudio-caso/tecnologia-desarrollo" className="btn btn-outline-warning">
                    Ver Caso
                  </Link>
                </div>
              </div>
            </Col>
            
            <Col lg={4} md={6}>
              <div className="card h-100 border-0 shadow-sm bg-white">
                <div className="card-body text-center p-5">
                  <div className="client-icon bg-danger text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" style={{width: '80px', height: '80px'}}>
                    <i className="bi bi-people fs-1"></i>
                  </div>
                  <h5 className="card-title">Recursos Humanos</h5>
                  <p className="card-text">Formación en liderazgo y gestión del talento humano.</p>
                  <Link href="/estudio-caso/recursos-humanos" className="btn btn-outline-danger">
                    Ver Caso
                  </Link>
                </div>
              </div>
            </Col>
            
            <Col lg={4} md={6}>
              <div className="card h-100 border-0 shadow-sm bg-white">
                <div className="card-body text-center p-5">
                  <div className="client-icon bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" style={{width: '80px', height: '80px'}}>
                    <i className="bi bi-globe fs-1"></i>
                  </div>
                  <h5 className="card-title">Internacionalización</h5>
                  <p className="card-text">Formación en idiomas para empresas y comunicación internacional.</p>
                  <Link href="/estudio-caso/internacionalizacion" className="btn btn-outline-secondary">
                    Ver Caso
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
          
          <Row className="mt-5">
            <Col lg={12}>
              <div className="text-center">
                <h2 className="mb-4">¿Quieres formar parte de nuestros clientes?</h2>
                <p className="lead mb-5">
                  Únete a las empresas que ya confían en Mentoaula para su formación bonificada FUNDAE
                </p>
                <Link href="/contacto" className="common-btn me-3">
                  <span>Comenzar Proyecto</span>
                </Link>
                <Link href="/formacion-bonificada" className="common-btn outline">
                  <span>Saber Más</span>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Clientes;