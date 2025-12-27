"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { headerContent } from "@/content/common/header";
import Sidebar from "../common/Sidebar";
import { useSticky } from "@/hooks/useSticky";

const Header = () => {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const isSticky = useSticky({ threshold: 100 });

  const toggleOffcanvas = () => {
    setIsOffcanvasOpen(!isOffcanvasOpen);
  };

  return (
    <div>
      <header>
        {/* Menu */}
        <div
          className={`menu-area menu-area--fixed-light ${
            isSticky ? "" : ""
          }`}
        >
          <div className="container container-3xl header-border-bottom">
            <div className="row align-items-center position-relative">
              <div className="col-lg-12 hamburger-menu position-relative">
                <div className="nav-wrap d-flex justify-content-between align-items-center">
                  <div className="menu-logo-wrap flex-none">
                    <Link href="/">
                      <Image src={headerContent.logo} alt="logo" height={200}/>
                    </Link>
                  </div>
                  <div className="mainmenu text-right d-none d-lg-block">
                    <ul className="home-menu">
                      <li className="">
                        <Link href="/">Inicio</Link>
                      </li>
                      <li className="has-child-menu">
                        <Link href="#" onClick={(e) => e.preventDefault()}>Servicios</Link>
                        <ul>
                          {headerContent.navigation.services.map(
                            (service, index) => (
                              <li key={index}>
                                <Link href={service.href}>
                                  {service.name}
                                </Link>
                              </li>
                            )
                          )}
                        </ul>
                      </li>
                      <li className="has-child-menu">
                        <Link href="#" onClick={(e) => e.preventDefault()}>Cursos</Link>
                        <ul>
                          <li className="has-child-menu">
                            <Link href="#" onClick={(e) => e.preventDefault()}>Catálogo</Link>
                            <ul>
                              <li><Link href="/catalogo-cursos">Todos los Cursos</Link></li>
                              <li><Link href="/cursos/competencias-digitales">Competencias Digitales</Link></li>
                              <li><Link href="/cursos/gestion-empresarial">Gestión Empresarial</Link></li>
                              <li><Link href="/cursos/comercial-ventas">Comercial y Ventas</Link></li>
                              <li><Link href="/cursos/atencion-cliente">Atención al Cliente</Link></li>
                              <li><Link href="/cursos/calidad-procesos">Calidad y Procesos</Link></li>
                              <li><Link href="/cursos/prevencion">Prevención y Normativa</Link></li>
                              <li><Link href="/cursos/idiomas">Idiomas para Empresas</Link></li>
                            </ul>
                          </li>
                          <li><Link href="/formacion-personalizada">Formación Personalizada</Link></li>
                        </ul>
                      </li>
                      <li className="has-child-menu">
                        <Link href="#" onClick={(e) => e.preventDefault()}>Plataforma</Link>
                        <ul>
                          {headerContent.navigation.portfolio.map(
                            (portfolio, index) => (
                              <li key={index}>
                                <Link href={portfolio.href}>
                                  {portfolio.name}
                                </Link>
                              </li>
                            )
                          )}
                        </ul>
                      </li>
                      {headerContent.navigation.directLinks
                        .slice(0, 2)
                        .map((link, index) => (
                          <li key={index}>
                            <Link href={link.href}>{link.name}</Link>
                          </li>
                        ))}
                    </ul>
                    <div className="menu-btn-wrap menu-btn-wrap__mobile">
                      <Link
                        className="common-btn common-btn--fixed"
                        href="/contacto"
                      >
                        {headerContent.buttons.letsTalk}
                      </Link>
                    </div>
                  </div>
                  <div className="nav-wrap d-flex justify-content-end align-items-center">
                    <div className="menu-btn-wrap menu-btn-wrap__desktop">
                      <div className="menu-btn-hidden d-flex align-items-center">
                        <Link
                          className="common-btn common-btn--fixed d-none d-lg-inline-flex"
                          href="/contacto"
                        >
                          {headerContent.buttons.letsTalk}
                        </Link>
                        <button
                          className="side-panel__activator"
                          onClick={toggleOffcanvas}
                          aria-label="Toggle navigation"
                        >
                          <span></span>
                          <span></span>
                          <span></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Menu end */}
      </header>
      <Sidebar isOpen={isOffcanvasOpen} handleSidebar={toggleOffcanvas} />
    </div>
  );
};

export default Header;