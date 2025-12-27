// app/cursos/calidad-procesos/page.tsx
"use client";
import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";

const CalidadProcesos = () => {
  return (
    <>
      <div className="pt-120 pb-120">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center mb-5">
                <h1 className="display-4 fw-bold">Calidad y Mejora de Procesos</h1>
                <p className="lead">
                  Metodologías de mejora continua, gestión de calidad, 
                  optimización de procesos y excelencia operativa para mejorar 
                  la eficiencia de tu empresa.
                </p>
              </div>
            </Col>
          </Row>
          
          <Row className="mb-5">
            <Col lg={8}>
              <div className="blog-details-content">
                <h2>Formación en Calidad y Mejora de Procesos</h2>
                
                <p>
                  Nuestros cursos de calidad y mejora de procesos están diseñados para desarrollar 
                  competencias en la gestión de calidad, la implementación de metodologías de mejora 
                  continua y la optimización de procesos operativos. Se enfocan en técnicas prácticas 
                  que los trabajadores pueden aplicar directamente en su desempeño profesional para 
                  mejorar la eficiencia y la excelencia operativa.
                </p>
                
                <h3>Tipos de cursos disponibles</h3>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Gestión de calidad ISO 9001
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Metodologías de mejora continua (Lean, Six Sigma)
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Optimización de procesos operativos
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Análisis de procesos y mapeo de valor
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Excelencia operativa
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Indicadores de desempeño y KPIs
                  </li>
                </ul>
                
                <h3>Objetivos del área formativa</h3>
                <p>
                  Nuestros cursos de calidad y mejora de procesos tienen como objetivo mejorar 
                  la eficiencia operativa, implementar sistemas de gestión de calidad, desarrollar 
                  habilidades en la mejora continua y fomentar la excelencia en los procesos. 
                  Se enfocan en prácticas que contribuyen a la reducción de costes, la mejora 
                  de la calidad y el aumento de la productividad.
                </p>
                
                <h3>Metodología de formación</h3>
                <p>
                  La formación se imparte 100% online a través de nuestra plataforma eLearning, 
                  con contenidos interactivos, estudios de caso reales, herramientas de análisis 
                  de procesos, ejercicios prácticos y evaluaciones continuas. Cada curso incluye 
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
                  <h4 className="sidebar-title">¿Quieres mejorar tus procesos?</h4>
                  <p className="mb-3">
                    Contacta con nosotros para diseñar un plan formativo en 
                    calidad y mejora de procesos adaptado a tu empresa.
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
                <h2 className="mb-4">Cursos Destacados en Calidad y Procesos</h2>
                <div className="row g-4">
                  <div className="col-md-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <h5 className="card-title">Gestión de Calidad ISO 9001</h5>
                        <p className="card-text">Implementación y mantenimiento de sistemas de calidad</p>
                        <Link href="/curso/gestion-calidad-iso" className="btn btn-outline-primary">
                          Ver Curso
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <h5 className="card-title">Lean Six Sigma</h5>
                        <p className="card-text">Metodologías de mejora continua y reducción de defectos</p>
                        <Link href="/curso/lean-six-sigma" className="btn btn-outline-primary">
                          Ver Curso
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <h5 className="card-title">Optimización de Procesos</h5>
                        <p className="card-text">Técnicas para mejorar la eficiencia operativa</p>
                        <Link href="/curso/optimizacion-procesos" className="btn btn-outline-primary">
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

export default CalidadProcesos;