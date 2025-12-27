// app/gestion-fundae/page.tsx
"use client";
import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";

const GestionFundae = () => {
  return (
    <>
      
      <div className="pt-120 pb-120">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center mb-5">
                <h1 className="display-4 fw-bold">Gestión Integral FUNDAE</h1>
                <p className="lead">
                  Nos encargamos de todo el proceso de formación bonificada para que la empresa 
                  solo se centre en mejorar el rendimiento y la competitividad de su equipo.
                </p>
              </div>
            </Col>
          </Row>
          
          <Row className="mb-5">
            <Col lg={8}>
              <div className="blog-details-content">
                <h2>Gestión Completa del Proceso Formativo</h2>
                
                <p>
                  En Mentoaula ofrecemos un servicio completo de gestión de la formación bonificada 
                  FUNDAE. Nos encargamos de todas las fases del proceso, desde el análisis de necesidades 
                  hasta la justificación final, asegurando el cumplimiento normativo y la máxima 
                  eficacia del proceso formativo.
                </p>
                
                <h3>Qué incluye nuestro servicio FUNDAE</h3>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Análisis del crédito formativo disponible
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Diseño del plan formativo online
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Gestión administrativa y documental
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Comunicaciones oficiales de inicio y finalización
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Seguimiento técnico de la formación
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Justificación técnica y económica
                  </li>
                </ul>
                
                <h3>Proceso de gestión FUNDAE</h3>
                <p>
                  Nuestro proceso de gestión se divide en varias fases claramente definidas: 
                  análisis de necesidades formativas, diseño del plan formativo, comunicación 
                  de inicio a FUNDAE, impartición de la formación, seguimiento del proceso, 
                  evaluación y justificación final. Cada empresa cuenta con un asesor especializado 
                  durante todo el proceso.
                </p>
                
                <h3>Beneficios de nuestra gestión</h3>
                <p>
                  Al confiar la gestión de tu formación bonificada a Mentoaula, obtienes tranquilidad, 
                  cumplimiento normativo, ahorro de tiempo y recursos, y resultados tangibles en el 
                  rendimiento de tu equipo. Nos encargamos de todo el proceso para que tú te 
                  concentres en lo que realmente importa: mejorar tu negocio.
                </p>
                
                <div className="mt-4">
                  <Link href="/contacto" className="common-btn me-3">
                    <span>Solicitar Gestión FUNDAE</span>
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
                  <h4 className="sidebar-title">Fases del Proceso</h4>
                  <ul className="sidebar-links list-unstyled">
                    <li className="mb-2">
                      <Link href="/como-trabajamos#analisis" className="text-decoration-none">
                        Análisis de Necesidades
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link href="/como-trabajamos#diseño" className="text-decoration-none">
                        Diseño del Plan Formativo
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link href="/como-trabajamos#gestion" className="text-decoration-none">
                        Gestión Administrativa
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link href="/como-trabajamos#imparticion" className="text-decoration-none">
                        Impartición de la Formación
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link href="/como-trabajamos#justificacion" className="text-decoration-none">
                        Justificación Final
                      </Link>
                    </li>
                  </ul>
                </div>
                
                <div className="sidebar-widget shadow p-4">
                  <h4 className="sidebar-title">¿Quieres gestionar tu formación?</h4>
                  <p className="mb-3">
                    Contacta con nosotros para comenzar con la gestión de tu 
                    formación bonificada FUNDAE.
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
                <h2 className="mb-4">Nuestro Proceso de Gestión FUNDAE</h2>
                <div className="row g-4">
                  <div className="col-md-4">
                    <div className="card h-100 border-0 text-center">
                      <div className="card-body">
                        <div className="icon-circle bg-primary text-white mx-auto mb-3">
                          <i className="bi bi-search"></i>
                        </div>
                        <h5>Análisis</h5>
                        <p>Identificación de necesidades formativas de la empresa</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <div className="card h-100 border-0 text-center">
                      <div className="card-body">
                        <div className="icon-circle bg-primary text-white mx-auto mb-3">
                          <i className="bi bi-file-earmark-text"></i>
                        </div>
                        <h5>Planificación</h5>
                        <p>Diseño del plan formativo y documentación</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <div className="card h-100 border-0 text-center">
                      <div className="card-body">
                        <div className="icon-circle bg-primary text-white mx-auto mb-3">
                          <i className="bi bi-check-circle"></i>
                        </div>
                        <h5>Justificación</h5>
                        <p>Presentación de documentación a FUNDAE</p>
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

export default GestionFundae;