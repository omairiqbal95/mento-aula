// app/cursos/comercial-ventas/page.tsx
"use client";
import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";

const ComercialVentas = () => {
  return (
    <>
      <div className="pt-120 pb-120">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center mb-5">
                <h1 className="display-4 fw-bold">Comercial, Ventas y Marketing</h1>
                <p className="lead">
                  Estrategias de venta, técnicas comerciales, marketing digital, 
                  fidelización de clientes y desarrollo de habilidades comerciales para mejorar 
                  los resultados de tu equipo comercial.
                </p>
              </div>
            </Col>
          </Row>
          
          <Row className="mb-5">
            <Col lg={8}>
              <div className="blog-details-content">
                <h2>Formación en Comercial, Ventas y Marketing</h2>
                
                <p>
                  Nuestros cursos de comercial, ventas y marketing están diseñados para desarrollar 
                  habilidades clave en la generación de negocio, la fidelización de clientes y 
                  la implementación de estrategias de marketing efectivas. Se enfocan en técnicas 
                  prácticas que los trabajadores pueden aplicar directamente en su desempeño comercial.
                </p>
                
                <h3>Tipos de cursos disponibles</h3>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Técnicas de venta y negociación
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Marketing digital y redes sociales
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Fidelización de clientes y atención al cliente
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Gestión de equipos comerciales
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Estrategia comercial y posicionamiento
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Herramientas CRM y automatización de ventas
                  </li>
                </ul>
                
                <h3>Objetivos del área formativa</h3>
                <p>
                  Nuestros cursos de comercial, ventas y marketing tienen como objetivo mejorar 
                  las habilidades de venta, desarrollar estrategias de marketing efectivas, 
                  fomentar la fidelización de clientes y aumentar la productividad del equipo comercial. 
                  Se enfocan en prácticas que contribuyen al crecimiento de la facturación y 
                  la rentabilidad de la empresa.
                </p>
                
                <h3>Metodología de formación</h3>
                <p>
                  La formación se imparte 100% online a través de nuestra plataforma eLearning, 
                  con contenidos interactivos, estudios de caso reales, simulaciones comerciales, 
                  ejercicios prácticos y evaluaciones continuas. Cada curso incluye tutorización 
                  personalizada y soporte técnico para garantizar el máximo aprovechamiento del 
                  proceso formativo.
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
                  <h4 className="sidebar-title">¿Quieres formar a tu equipo comercial?</h4>
                  <p className="mb-3">
                    Contacta con nosotros para diseñar un plan formativo en 
                    comercial, ventas y marketing adaptado a tu empresa.
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
                <h2 className="mb-4">Cursos Destacados en Comercial, Ventas y Marketing</h2>
                <div className="row g-4">
                  <div className="col-md-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <h5 className="card-title">Técnicas de Venta Efectiva</h5>
                        <p className="card-text">Estrategias para cerrar ventas y superar objeciones</p>
                        <Link href="/curso/tecnicas-venta" className="btn btn-outline-primary">
                          Ver Curso
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <h5 className="card-title">Marketing Digital</h5>
                        <p className="card-text">Estrategias de promoción en canales digitales</p>
                        <Link href="/curso/marketing-digital" className="btn btn-outline-primary">
                          Ver Curso
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <h5 className="card-title">CRM y Gestión de Clientes</h5>
                        <p className="card-text">Herramientas para la gestión efectiva de relaciones</p>
                        <Link href="/curso/crm-gestion-clientes" className="btn btn-outline-primary">
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

export default ComercialVentas;