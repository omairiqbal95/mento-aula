// app/sobre-mentoaula/page.tsx
"use client";
import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";

const SobreMentoaula = () => {
  return (
    <>
      <div className="pt-120 pb-120">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center mb-5">
                <h1 className="display-4 fw-bold">Sobre Mentoaula</h1>
                <p className="lead">
                  Mentoaula, SL es una empresa especializada en formación online para empresas, 
                  enfocada en facilitar el acceso a formación de calidad mediante una gestión eficaz, 
                  cercana y personalizada.
                </p>
              </div>
            </Col>
          </Row>
          
          <Row className="mb-5">
            <Col lg={8}>
              <div className="blog-details-content">
                <h2>Quiénes Somos</h2>
                
                <p>
                  Mentoaula, SL es una empresa especializada en formación online para empresas, 
                  enfocada en facilitar el acceso a formación de calidad mediante una gestión eficaz, 
                  cercana y personalizada. Ayudamos a las empresas a formar a sus trabajadores mediante 
                  formación bonificada a través de FUNDAE, permitiendo restar el coste de la formación 
                  de los seguros sociales.
                </p>
                
                <h3>Nuestra Misión</h3>
                <p>
                  Ayudar a las empresas a desarrollar el talento de sus trabajadores mediante formación 
                  online práctica y bonificada, fácilmente gestionable y orientada a resultados.
                </p>
                
                <h3>Nuestra Visión</h3>
                <p>
                  Ser un referente en formación online para empresas por la calidad del servicio, 
                  la adaptación a las necesidades del cliente y la orientación a resultados.
                </p>
                
                <h3>Nuestros Valores</h3>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    <strong>Compromiso con la calidad</strong>: Garantizamos formación de alta calidad 
                    que genera resultados tangibles para las empresas.
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    <strong>Cercanía y trato personalizado</strong>: Ofrecemos un servicio cercano y 
                    adaptado a las necesidades específicas de cada cliente.
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    <strong>Innovación en formación online</strong>: Utilizamos las últimas tecnologías 
                    para ofrecer formación eficaz y atractiva.
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    <strong>Orientación a resultados</strong>: Nos enfocamos en generar impacto real 
                    en el rendimiento y la competitividad del equipo.
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    <strong>Mejora continua</strong>: Trabajamos constantemente para mejorar nuestros 
                    servicios y procesos.
                  </li>
                </ul>
                
                <div className="mt-4">
                  <Link href="/contacto" className="common-btn me-3">
                    <span>Contactar con Nosotros</span>
                  </Link>
                  <Link href="/como-trabajamos" className="common-btn outline">
                    <span>Cómo Trabajamos</span>
                  </Link>
                </div>
              </div>
            </Col>
            
            <Col lg={4}>
              <div className="sidebar-area">
                <div className="sidebar-widget shadow p-4 mb-4">
                  <h4 className="sidebar-title">Nuestros Servicios</h4>
                  <ul className="sidebar-links list-unstyled">
                    <li className="mb-2">
                      <Link href="/formacion-bonificada" className="text-decoration-none">
                        Formación Bonificada FUNDAE
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link href="/plataforma-elearning" className="text-decoration-none">
                        Plataforma eLearning
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link href="/gestion-fundae" className="text-decoration-none">
                        Gestión FUNDAE
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link href="/formacion-personalizada" className="text-decoration-none">
                        Formación Personalizada
                      </Link>
                    </li>
                  </ul>
                </div>
                
                <div className="sidebar-widget shadow p-4">
                  <h4 className="sidebar-title">¿Quieres conocer más?</h4>
                  <p className="mb-3">
                    Contacta con nosotros para conocer más sobre nuestros 
                    servicios y cómo podemos ayudar a tu empresa.
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
                <h2 className="mb-4">Nuestros Servicios Especializados</h2>
                <div className="row g-4">
                  <div className="col-md-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <div className="icon-circle bg-primary text-white mx-auto mb-3">
                          <i className="bi bi-people"></i>
                        </div>
                        <h5 className="card-title">Formación Bonificada</h5>
                        <p className="card-text">Gestión integral del proceso FUNDAE para formación sin coste</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <div className="icon-circle bg-primary text-white mx-auto mb-3">
                          <i className="bi bi-laptop"></i>
                        </div>
                        <h5 className="card-title">Plataforma eLearning</h5>
                        <p className="card-text">Campus online con herramientas de seguimiento y evaluación</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <div className="icon-circle bg-primary text-white mx-auto mb-3">
                          <i className="bi bi-graph-up"></i>
                        </div>
                        <h5 className="card-title">Consultoría Formativa</h5>
                        <p className="card-text">Análisis de necesidades y diseño de planes formativos</p>
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

export default SobreMentoaula;