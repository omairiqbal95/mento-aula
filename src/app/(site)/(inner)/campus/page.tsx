// app/campus-mentoaula/page.tsx
"use client";
import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";

const CampusMentoaula = () => {
  return (
    <>
      <div className="pt-120 pb-120">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center mb-5">
                <h1 className="display-4 fw-bold">Campus Mentoaula</h1>
                <p className="lead">
                  Plataforma eLearning integral para la formación online de tu equipo, 
                  con herramientas de seguimiento, evaluación y certificación.
                </p>
              </div>
            </Col>
          </Row>
          
          <Row className="mb-5">
            <Col lg={8}>
              <div className="blog-details-content">
                <h2>La Plataforma de Formación Online</h2>
                
                <p>
                  Campus Mentoaula es nuestra plataforma eLearning integral diseñada específicamente 
                  para la formación online de empresas. Ofrece una experiencia de aprendizaje completa 
                  con herramientas de seguimiento, evaluación y certificación que cumplen con todos 
                  los requisitos de FUNDAE para la formación bonificada.
                </p>
                
                <h3>Características principales</h3>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Acceso desde cualquier dispositivo y ubicación
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Interfaz intuitiva y fácil de usar
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Seguimiento en tiempo real del progreso
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Evaluaciones interactivas y certificaciones
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Gestión administrativa y control de acceso
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Cumplimiento normativo FUNDAE
                  </li>
                </ul>
                
                <h3>Funcionalidades del campus</h3>
                <p>
                  El campus Mentoaula incluye funcionalidades avanzadas como módulos de aprendizaje 
                  personalizados, sistema de tutorización en línea, herramientas de colaboración, 
                  generación automática de informes de seguimiento y sistema de evaluación integral. 
                  Todo ello diseñado para facilitar la formación efectiva de los trabajadores.
                </p>
                
                <h3>Beneficios para las empresas</h3>
                <p>
                  Las empresas que utilizan Campus Mentoaula obtienen beneficios como la reducción 
                  de costes logísticos, flexibilidad horaria para los trabajadores, control total 
                  del proceso formativo, cumplimiento normativo automático y soporte técnico especializado.
                </p>
                
                <div className="mt-4">
                  <Link href="/contacto" className="common-btn me-3">
                    <span>Solicitar Demo</span>
                  </Link>
                  <Link href="/plataforma-elearning" className="common-btn outline">
                    <span>Más Información</span>
                  </Link>
                </div>
              </div>
            </Col>
            
            <Col lg={4}>
              <div className="sidebar-area">
                <div className="sidebar-widget shadow p-4 mb-4">
                  <h4 className="sidebar-title">Características del Campus</h4>
                  <ul className="sidebar-links list-unstyled">
                    <li className="mb-2">
                      <Link href="/tutorizacion" className="text-decoration-none">
                        Tutorización Online
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link href="/evaluacion" className="text-decoration-none">
                        Evaluación Continua
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link href="/seguimiento" className="text-decoration-none">
                        Seguimiento del Progreso
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link href="/certificacion" className="text-decoration-none">
                        Certificación Oficial
                      </Link>
                    </li>
                  </ul>
                </div>
                
                <div className="sidebar-widget shadow p-4">
                  <h4 className="sidebar-title">¿Quieres probar el campus?</h4>
                  <p className="mb-3">
                    Solicita acceso al campus Mentoaula para conocer todas 
                    sus funcionalidades y ventajas.
                  </p>
                  <Link href="/contacto" className="common-btn outline w-100">
                    <span>Solicitar Acceso</span>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
          
          <Row className="mt-5">
            <Col lg={12}>
              <div className="text-center">
                <h2 className="mb-4">Características del Campus Mentoaula</h2>
                <div className="row g-4">
                  <div className="col-md-3">
                    <div className="card h-100 border-0 text-center">
                      <div className="card-body">
                        <div className="icon-circle bg-primary text-white mx-auto mb-3">
                          <i className="bi bi-laptop"></i>
                        </div>
                        <h5>Acceso Online</h5>
                        <p>Desde cualquier dispositivo y lugar</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-3">
                    <div className="card h-100 border-0 text-center">
                      <div className="card-body">
                        <div className="icon-circle bg-primary text-white mx-auto mb-3">
                          <i className="bi bi-clock"></i>
                        </div>
                        <h5>Flexibilidad</h5>
                        <p>Horarios adaptables a cada trabajador</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-3">
                    <div className="card h-100 border-0 text-center">
                      <div className="card-body">
                        <div className="icon-circle bg-primary text-white mx-auto mb-3">
                          <i className="bi bi-graph-up"></i>
                        </div>
                        <h5>Seguimiento</h5>
                        <p>Control del progreso en tiempo real</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-3">
                    <div className="card h-100 border-0 text-center">
                      <div className="card-body">
                        <div className="icon-circle bg-primary text-white mx-auto mb-3">
                          <i className="bi bi-award"></i>
                        </div>
                        <h5>Certificación</h5>
                        <p>Titulaciones oficiales de aprovechamiento</p>
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

export default CampusMentoaula;