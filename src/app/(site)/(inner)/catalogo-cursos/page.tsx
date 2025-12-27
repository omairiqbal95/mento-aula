// app/catalogo-cursos/page.tsx
"use client";
import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";

const CatalogoCursos = () => {
  return (
    <>
      
      <div className="pt-120 pb-120">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center mb-5">
                <h1 className="display-4 fw-bold">Catálogo de Cursos</h1>
                <p className="lead">
                  Disponemos de un amplio catálogo de cursos online para empresas, orientado a 
                  cubrir las necesidades actuales del mercado laboral.
                </p>
              </div>
            </Col>
          </Row>
          
          <Row>
            <Col lg={12}>
              <div className="mb-5">
                <h2>Áreas Formativas</h2>
                <p>
                  Nuestro catálogo incluye cursos en diversas áreas formativas, todos ellos 
                  adaptados a las necesidades de las empresas y personalizables según tus objetivos.
                </p>
              </div>
            </Col>
          </Row>
          
          <Row className="g-4 mb-5">
            <Col lg={4} md={6}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h3 className="card-title">Competencias Digitales y Ofimática</h3>
                  <p className="card-text">
                    Cursos especializados en herramientas digitales, software de oficina, 
                    gestión de datos y competencias tecnológicas esenciales para el entorno laboral actual.
                  </p>
                  <Link href="/cursos/competencias-digitales" className="btn btn-outline-primary">
                    Ver Cursos
                  </Link>
                </div>
              </div>
            </Col>
            
            <Col lg={4} md={6}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h3 className="card-title">Gestión Empresarial y Recursos Humanos</h3>
                  <p className="card-text">
                    Formación en liderazgo, gestión de equipos, desarrollo organizacional, 
                    reclutamiento y retención de talento.
                  </p>
                  <Link href="/cursos/gestion-empresarial" className="btn btn-outline-primary">
                    Ver Cursos
                  </Link>
                </div>
              </div>
            </Col>
            
            <Col lg={4} md={6}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h3 className="card-title">Comercial, Ventas y Marketing</h3>
                  <p className="card-text">
                    Estrategias de venta, técnicas comerciales, marketing digital, 
                    fidelización de clientes y desarrollo de habilidades comerciales.
                  </p>
                  <Link href="/cursos/comercial-ventas" className="btn btn-outline-primary">
                    Ver Cursos
                  </Link>
                </div>
              </div>
            </Col>
            
            <Col lg={4} md={6}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h3 className="card-title">Atención al Cliente</h3>
                  <p className="card-text">
                    Mejora de la atención al cliente, resolución de conflictos, 
                    experiencia de usuario y servicio de calidad.
                  </p>
                  <Link href="/cursos/atencion-cliente" className="btn btn-outline-primary">
                    Ver Cursos
                  </Link>
                </div>
              </div>
            </Col>
            
            <Col lg={4} md={6}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h3 className="card-title">Calidad y Mejora de Procesos</h3>
                  <p className="card-text">
                    Metodologías de mejora continua, gestión de calidad, 
                    optimización de procesos y excelencia operativa.
                  </p>
                  <Link href="/cursos/calidad-procesos" className="btn btn-outline-primary">
                    Ver Cursos
                  </Link>
                </div>
              </div>
            </Col>
            
            <Col lg={4} md={6}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h3 className="card-title">Prevención y Normativa</h3>
                  <p className="card-text">
                    Prevención de riesgos laborales, normativa aplicable, 
                    seguridad en el trabajo y cumplimiento legal.
                  </p>
                  <Link href="/cursos/prevencion" className="btn btn-outline-primary">
                    Ver Cursos
                  </Link>
                </div>
              </div>
            </Col>
            
            <Col lg={4} md={6}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h3 className="card-title">Idiomas para Empresas</h3>
                  <p className="card-text">
                    Cursos de idiomas adaptados al entorno profesional, 
                    comunicación internacional y habilidades lingüísticas para el trabajo.
                  </p>
                  <Link href="/cursos/idiomas" className="btn btn-outline-primary">
                    Ver Cursos
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
          
          <Row className="mt-5">
            <Col lg={8}>
              <div className="blog-details-content">
                <h2>Formación Adaptada a Tus Necesidades</h2>
                <p>
                  Todos los cursos pueden adaptarse o personalizarse según los objetivos de cada 
                  organización. Trabajamos con empresas de todos los sectores para ofrecer formación 
                  relevante y práctica que genere resultados tangibles.
                </p>
                
                <h3>¿Necesitas formación personalizada?</h3>
                <p>
                  Además de nuestro catálogo estándar, también desarrollamos formación online a medida, 
                  diseñada específicamente para cada empresa según sus necesidades y objetivos específicos.
                </p>
                
                <div className="mt-4">
                  <Link href="/formacion-personalizada" className="common-btn me-3">
                    <span>Formación Personalizada</span>
                  </Link>
                  <Link href="/contacto" className="common-btn outline">
                    <span>Solicitar Información</span>
                  </Link>
                </div>
              </div>
            </Col>
            
            <Col lg={4}>
              <div className="sidebar-area">
                <div className="sidebar-widget shadow p-4 mb-4">
                  <h4 className="sidebar-title">Cursos Destacados</h4>
                  <ul className="sidebar-links list-unstyled">
                    <li className="mb-2">
                      <Link href="/curso/gestion-proyectos" className="text-decoration-none">
                        Gestión de Proyectos
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link href="/curso/habilidades-digitales" className="text-decoration-none">
                        Habilidades Digitales
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link href="/curso/liderazgo-equipo" className="text-decoration-none">
                        Liderazgo de Equipos
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link href="/curso/comunicacion-efectiva" className="text-decoration-none">
                        Comunicación Efectiva
                      </Link>
                    </li>
                  </ul>
                </div>
                
                <div className="sidebar-widget shadow p-4">
                  <h4 className="sidebar-title">¿Quieres más información?</h4>
                  <p className="mb-3">
                    Contacta con nosotros para conocer más detalles sobre 
                    nuestros cursos y cómo pueden beneficiar a tu empresa.
                  </p>
                  <Link href="/contacto" className="common-btn outline w-100">
                    <span>Contactar</span>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default CatalogoCursos;