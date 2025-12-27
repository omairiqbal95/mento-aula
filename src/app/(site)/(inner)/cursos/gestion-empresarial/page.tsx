// app/cursos/gestion-empresarial/page.tsx
"use client";
import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";

const GestionEmpresarial = () => {
  return (
    <>
      
      <div className="pt-120 pb-120">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center mb-5">
                <h1 className="display-4 fw-bold">Gestión Empresarial y Recursos Humanos</h1>
                <p className="lead">
                  Formación en liderazgo, gestión de equipos, desarrollo organizacional, 
                  reclutamiento y retención de talento para mejorar la eficiencia de tu empresa.
                </p>
              </div>
            </Col>
          </Row>
          
          <Row className="mb-5">
            <Col lg={8}>
              <div className="blog-details-content">
                <h2>Formación en Gestión Empresarial</h2>
                
                <p>
                  Nuestros cursos de gestión empresarial y recursos humanos están diseñados para 
                  desarrollar las competencias necesarias para liderar equipos, gestionar procesos 
                  organizacionales y mejorar la eficiencia operativa. Se enfocan en habilidades 
                  prácticas que los trabajadores pueden aplicar directamente en su desempeño profesional.
                </p>
                
                <h3>Tipos de cursos disponibles</h3>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Liderazgo y gestión de equipos
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Gestión del talento humano
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Reclutamiento y selección de personal
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Desarrollo organizacional
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Gestión del cambio organizacional
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Evaluación del desempeño
                  </li>
                </ul>
                
                <h3>Objetivos del área formativa</h3>
                <p>
                  Nuestros cursos de gestión empresarial y recursos humanos tienen como objetivo 
                  mejorar las habilidades de liderazgo, fomentar la eficiencia en la gestión de 
                  recursos humanos y desarrollar competencias para la toma de decisiones estratégicas. 
                  Se enfocan en prácticas que contribuyen al crecimiento y desarrollo sostenible 
                  de la organización.
                </p>
                
                <h3>Metodología de formación</h3>
                <p>
                  La formación se imparte 100% online a través de nuestra plataforma eLearning, 
                  con contenidos interactivos, estudios de caso, ejercicios prácticos y evaluaciones 
                  continuas. Cada curso incluye tutorización personalizada y soporte técnico para 
                  garantizar el máximo aprovechamiento del proceso formativo.
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
                      <Link href="/cursos/comercial-ventas" className="text-decoration-none">
                        Comercial y Ventas
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link href="/cursos/atencion-cliente" className="text-decoration-none">
                        Atención al Cliente
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link href="/cursos/calidad-procesos" className="text-decoration-none">
                        Calidad y Procesos
                      </Link>
                    </li>
                  </ul>
                </div>
                
                <div className="sidebar-widget shadow p-4">
                  <h4 className="sidebar-title">¿Quieres formar a tu equipo?</h4>
                  <p className="mb-3">
                    Contacta con nosotros para diseñar un plan formativo en 
                    gestión empresarial adaptado a tu empresa.
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
                <h2 className="mb-4">Cursos Destacados en Gestión Empresarial</h2>
                <div className="row g-4">
                  <div className="col-md-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <h5 className="card-title">Liderazgo Efectivo</h5>
                        <p className="card-text">Habilidades para liderar equipos y gestionar el cambio organizacional</p>
                        <Link href="/curso/liderazgo-efectivo" className="btn btn-outline-primary">
                          Ver Curso
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <h5 className="card-title">Gestión de Recursos Humanos</h5>
                        <p className="card-text">Estrategias para reclutamiento, selección y retención de talento</p>
                        <Link href="/curso/gestion-rh" className="btn btn-outline-primary">
                          Ver Curso
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <h5 className="card-title">Desarrollo Organizacional</h5>
                        <p className="card-text">Mejora de la eficiencia y adaptación al cambio en la empresa</p>
                        <Link href="/curso/desarrollo-organizacional" className="btn btn-outline-primary">
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

export default GestionEmpresarial;