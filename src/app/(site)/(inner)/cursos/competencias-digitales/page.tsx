// app/cursos/competencias-digitales/page.tsx
"use client";
import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";

const CompetenciasDigitales = () => {
  return (
    <>
      
      <div className="pt-120 pb-120">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center mb-5">
                <h1 className="display-4 fw-bold">Competencias Digitales y Ofimática</h1>
                <p className="lead">
                  Cursos especializados en herramientas digitales, software de oficina, 
                  gestión de datos y competencias tecnológicas esenciales para el entorno laboral actual.
                </p>
              </div>
            </Col>
          </Row>
          
          <Row className="mb-5">
            <Col lg={8}>
              <div className="blog-details-content">
                <h2>Formación en Competencias Digitales</h2>
                
                <p>
                  En el entorno laboral actual, las competencias digitales son fundamentales para 
                  el desempeño profesional efectivo. Nuestros cursos están diseñados para desarrollar 
                  habilidades en herramientas digitales, software de oficina y gestión de datos, 
                  adaptados a las necesidades específicas de cada sector y perfil profesional.
                </p>
                
                <h3>Tipos de cursos disponibles</h3>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Office 365 y Microsoft Office (Word, Excel, PowerPoint, Outlook)
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Google Workspace (Docs, Sheets, Slides, Drive)
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Gestión de datos y hojas de cálculo avanzadas
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Herramientas de colaboración y comunicación digital
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Seguridad informática y protección de datos
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Fundamentos de marketing digital
                  </li>
                </ul>
                
                <h3>Objetivos del área formativa</h3>
                <p>
                  Nuestros cursos de competencias digitales y ofimática tienen como objetivo mejorar 
                  la eficiencia en el uso de herramientas digitales, aumentar la productividad y 
                  facilitar la adaptación a los entornos laborales modernos. Se enfocan en habilidades 
                  prácticas que los trabajadores pueden aplicar directamente en su desempeño profesional.
                </p>
                
                <h3>Metodología de formación</h3>
                <p>
                  La formación se imparte 100% online a través de nuestra plataforma eLearning, 
                  con contenidos interactivos, ejercicios prácticos y evaluaciones continuas. 
                  Cada curso incluye tutorización personalizada y soporte técnico para garantizar 
                  el máximo aprovechamiento del proceso formativo.
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
                    competencias digitales adaptado a tu empresa.
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
                <h2 className="mb-4">Cursos Destacados en Competencias Digitales</h2>
                <div className="row g-4">
                  <div className="col-md-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <h5 className="card-title">Excel Avanzado</h5>
                        <p className="card-text">Fórmulas complejas, tablas dinámicas y automatización de procesos</p>
                        <Link href="/curso/excel-avanzado" className="btn btn-outline-primary">
                          Ver Curso
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <h5 className="card-title">PowerPoint Profesional</h5>
                        <p className="card-text">Diseño de presentaciones impactantes y herramientas avanzadas</p>
                        <Link href="/curso/powerpoint-profesional" className="btn btn-outline-primary">
                          Ver Curso
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <h5 className="card-title">Google Workspace</h5>
                        <p className="card-text">Herramientas colaborativas para la productividad en equipo</p>
                        <Link href="/curso/google-workspace" className="btn btn-outline-primary">
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

export default CompetenciasDigitales;