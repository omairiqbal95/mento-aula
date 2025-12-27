// app/plataforma-elearning/page.tsx
"use client";
import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";

const PlataformaElearning = () => {
  return (
    <>
      <div className="pt-120 pb-120">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center mb-5">
                <h1 className="display-4 fw-bold">Campus Mentoaula</h1>
                <p className="lead">
                  Contamos con una plataforma eLearning propia que permite impartir formación 
                  online de forma flexible, accesible y eficiente.
                </p>
              </div>
            </Col>
          </Row>
          
          <Row className="mb-5">
            <Col lg={8}>
              <div className="blog-details-content">
                <h2>Nuestra Plataforma eLearning</h2>
                
                <p>
                  El campus Mentoaula facilita el aprendizaje autónomo, el seguimiento del progreso 
                  del alumnado y la reducción de costes logísticos. Nuestra plataforma está diseñada 
                  específicamente para la formación bonificada FUNDAE, cumpliendo con todos los 
                  requisitos normativos y ofreciendo la mejor experiencia de aprendizaje.
                </p>
                
                <h3>Ventajas del campus online</h3>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Acceso desde cualquier dispositivo
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Flexibilidad horaria total
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Control de asistencia y progreso
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Contenidos interactivos y evaluaciones
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Soporte técnico y tutorización
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Cumplimiento normativo FUNDAE
                  </li>
                </ul>
                
                <h3>Características técnicas</h3>
                <p>
                  Nuestra plataforma eLearning cumple con los más altos estándares de calidad y 
                  seguridad. Ofrece herramientas de seguimiento en tiempo real, generación automática 
                  de informes, sistema de evaluación integral y soporte técnico especializado para 
                  garantizar la mejor experiencia de aprendizaje.
                </p>
                
                <h3>Soporte y tutorización</h3>
                <p>
                  Cada curso cuenta con un tutor especializado que acompaña al alumno durante todo 
                  el proceso formativo. El sistema de tutorización permite resolver dudas, evaluar 
                  el progreso y asegurar el aprovechamiento del curso.
                </p>
                
                <div className="mt-4">
                  <Link href="/contacto" className="common-btn me-3">
                    <span>Probar Plataforma</span>
                  </Link>
                  <Link href="/catalogo-cursos" className="common-btn outline">
                    <span>Ver Cursos</span>
                  </Link>
                </div>
              </div>
            </Col>
            
            <Col lg={4}>
              <div className="sidebar-area">
                <div className="sidebar-widget shadow p-4 mb-4">
                  <h4 className="sidebar-title">Características Principales</h4>
                  <ul className="sidebar-links list-unstyled">
                    <li className="mb-2">
                      <Link href="/tutorizacion" className="text-decoration-none">
                        Tutorización Personalizada
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
                  <h4 className="sidebar-title">¿Quieres probar la plataforma?</h4>
                  <p className="mb-3">
                    Solicita acceso a nuestra plataforma eLearning para conocer 
                    todas sus funcionalidades y ventajas.
                  </p>
                  <Link href="/contacto" className="common-btn outline w-100">
                    <span>Solicitar Demo</span>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
          
          <Row className="mt-5">
            <Col lg={12}>
              <div className="text-center">
                <h2 className="mb-4">¿Cómo funciona el campus online?</h2>
                <div className="row g-4">
                  <div className="col-md-3">
                    <div className="card h-100 border-0 text-center">
                      <div className="card-body">
                        <div className="icon-circle bg-primary text-white mx-auto mb-3">
                          <i className="bi bi-person-check"></i>
                        </div>
                        <h5>Acceso</h5>
                        <p>Cada trabajador recibe sus credenciales de acceso</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-3">
                    <div className="card h-100 border-0 text-center">
                      <div className="card-body">
                        <div className="icon-circle bg-primary text-white mx-auto mb-3">
                          <i className="bi bi-play-circle"></i>
                        </div>
                        <h5>Formación</h5>
                        <p>Accede a los contenidos y realiza las actividades</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-3">
                    <div className="card h-100 border-0 text-center">
                      <div className="card-body">
                        <div className="icon-circle bg-primary text-white mx-auto mb-3">
                          <i className="bi bi-clipboard-check"></i>
                        </div>
                        <h5>Evaluación</h5>
                        <p>Realiza evaluaciones para acreditar el aprendizaje</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-3">
                    <div className="card h-100 border-0 text-center">
                      <div className="card-body">
                        <div className="icon-circle bg-primary text-white mx-auto mb-3">
                          <i className="bi bi-certificate"></i>
                        </div>
                        <h5>Certificación</h5>
                        <p>Recibe certificado de aprovechamiento del curso</p>
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

export default PlataformaElearning;