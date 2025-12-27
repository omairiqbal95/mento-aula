// app/cursos/atencion-cliente/page.tsx
"use client";
import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";

const AtencionCliente = () => {
  return (
    <>
      <div className="pt-120 pb-120">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center mb-5">
                <h1 className="display-4 fw-bold">Atención al Cliente</h1>
                <p className="lead">
                  Mejora de la atención al cliente, resolución de conflictos, 
                  experiencia de usuario y servicio de calidad para fidelizar a tus clientes.
                </p>
              </div>
            </Col>
          </Row>
          
          <Row className="mb-5">
            <Col lg={8}>
              <div className="blog-details-content">
                <h2>Formación en Atención al Cliente</h2>
                
                <p>
                  Nuestros cursos de atención al cliente están diseñados para desarrollar habilidades 
                  clave en la interacción con clientes, la resolución de conflictos y la creación de 
                  experiencias positivas. Se enfocan en técnicas prácticas que los trabajadores pueden 
                  aplicar directamente en su desempeño profesional para mejorar la relación con los clientes.
                </p>
                
                <h3>Tipos de cursos disponibles</h3>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Técnicas de atención al cliente
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Gestión de quejas y reclamaciones
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Comunicación efectiva con clientes
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Fidelización de clientes
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Experiencia de usuario (UX)
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Atención al cliente multicanal
                  </li>
                </ul>
                
                <h3>Objetivos del área formativa</h3>
                <p>
                  Nuestros cursos de atención al cliente tienen como objetivo mejorar la calidad 
                  del servicio, aumentar la satisfacción del cliente, desarrollar habilidades de 
                  resolución de conflictos y fomentar la fidelización. Se enfocan en prácticas que 
                  contribuyen a la retención de clientes y al crecimiento del negocio.
                </p>
                
                <h3>Metodología de formación</h3>
                <p>
                  La formación se imparte 100% online a través de nuestra plataforma eLearning, 
                  con contenidos interactivos, simulaciones de atención al cliente, casos prácticos, 
                  ejercicios de comunicación y evaluaciones continuas. Cada curso incluye tutorización 
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
                      <Link href="/cursos/comercial-ventas" className="text-decoration-none">
                        Comercial y Ventas
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
                  <h4 className="sidebar-title">¿Quieres mejorar la atención a tus clientes?</h4>
                  <p className="mb-3">
                    Contacta con nosotros para diseñar un plan formativo en 
                    atención al cliente adaptado a tu empresa.
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
                <h2 className="mb-4">Cursos Destacados en Atención al Cliente</h2>
                <div className="row g-4">
                  <div className="col-md-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <h5 className="card-title">Técnicas de Atención Efectiva</h5>
                        <p className="card-text">Métodos para ofrecer un servicio de calidad excepcional</p>
                        <Link href="/curso/tecnicas-atencion" className="btn btn-outline-primary">
                          Ver Curso
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <h5 className="card-title">Gestión de Conflictos</h5>
                        <p className="card-text">Estrategias para resolver reclamaciones y quejas</p>
                        <Link href="/curso/gestion-conflictos" className="btn btn-outline-primary">
                          Ver Curso
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <h5 className="card-title">Experiencia de Cliente</h5>
                        <p className="card-text">Creación de experiencias memorables y fidelizadoras</p>
                        <Link href="/curso/experiencia-cliente" className="btn btn-outline-primary">
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

export default AtencionCliente;