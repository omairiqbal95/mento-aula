// app/cursos/idiomas/page.tsx
"use client";
import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";

const Idiomas = () => {
  return (
    <>
      <div className="pt-120 pb-120">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center mb-5">
                <h1 className="display-4 fw-bold">Idiomas para Empresas</h1>
                <p className="lead">
                  Cursos de idiomas adaptados al entorno profesional, 
                  comunicación internacional y habilidades lingüísticas para el trabajo, 
                  orientados a las necesidades específicas de cada sector y perfil profesional.
                </p>
              </div>
            </Col>
          </Row>
          
          <Row className="mb-5">
            <Col lg={8}>
              <div className="blog-details-content">
                <h2>Formación en Idiomas para Empresas</h2>
                
                <p>
                  Nuestros cursos de idiomas para empresas están diseñados para desarrollar 
                  competencias lingüísticas específicas para el entorno profesional. Se enfocan 
                  en habilidades de comunicación que los trabajadores pueden aplicar directamente 
                  en su desempeño profesional, adaptadas a las necesidades específicas de cada 
                  sector y perfil profesional.
                </p>
                
                <h3>Tipos de cursos disponibles</h3>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Inglés para negocios
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Francés para empresas
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Alemán técnico y profesional
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Comunicación internacional
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Idiomas para atención al cliente
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Negociación en otros idiomas
                  </li>
                </ul>
                
                <h3>Objetivos del área formativa</h3>
                <p>
                  Nuestros cursos de idiomas para empresas tienen como objetivo mejorar la 
                  comunicación internacional, facilitar la colaboración con socios extranjeros, 
                  desarrollar habilidades lingüísticas específicas para el trabajo y fomentar 
                  la movilidad profesional. Se enfocan en prácticas que contribuyen a la 
                  internacionalización de la empresa y al desarrollo profesional de los trabajadores.
                </p>
                
                <h3>Metodología de formación</h3>
                <p>
                  La formación se imparte 100% online a través de nuestra plataforma eLearning, 
                  con contenidos interactivos, simulaciones de situaciones profesionales, ejercicios 
                  de comunicación, evaluaciones continuas y práctica de conversación. Cada curso 
                  incluye tutorización personalizada y soporte técnico para garantizar el máximo 
                  aprovechamiento del proceso formativo.
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
                  <h4 className="sidebar-title">¿Quieres formar en idiomas a tu equipo?</h4>
                  <p className="mb-3">
                    Contacta con nosotros para diseñar un plan formativo en 
                    idiomas adaptado a tu empresa.
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
                <h2 className="mb-4">Cursos Destacados en Idiomas para Empresas</h2>
                <div className="row g-4">
                  <div className="col-md-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <h5 className="card-title">Inglés para Negocios</h5>
                        <p className="card-text">Comunicación efectiva en entornos profesionales internacionales</p>
                        <Link href="/curso/ingles-negocios" className="btn btn-outline-primary">
                          Ver Curso
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <h5 className="card-title">Francés Profesional</h5>
                        <p className="card-text">Habilidades lingüísticas para entornos comerciales y profesionales</p>
                        <Link href="/curso/frances-profesional" className="btn btn-outline-primary">
                          Ver Curso
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <h5 className="card-title">Alemán Técnico</h5>
                        <p className="card-text">Vocabulario y comunicación específica para entornos técnicos</p>
                        <Link href="/curso/aleman-tecnico" className="btn btn-outline-primary">
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

export default Idiomas;