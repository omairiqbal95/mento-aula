"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
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
            isSticky ? "sticky" : ""
          }`}
        >
          <div className="container container-3xl header-border-bottom">
            <div className="row align-items-center position-relative">
              <div className="col-lg-12 hamburger-menu position-relative">
                <div className="nav-wrap d-flex justify-content-between align-items-center">
                  <div className="menu-logo-wrap flex-none">
                    <Link href="/">
                      <Image src={headerContent.logo} alt="logo" />
                    </Link>
                  </div>
                  <div className="mainmenu text-right d-none d-lg-block">
                    <ul className="home-menu">
                      <li className="has-child-menu has-child-menu-mega-menu active">
                        <Link href="#" onClick={(e) => e.preventDefault()}>Home</Link>
                        <div className="sub-nav">
                          <div className="nav-item-wrapper">
                            {headerContent.homePages.map((page, index) => (
                              <div
                                key={index}
                                className={`nav-item text-center position-relative ${
                                  page.isActive ? "active" : ""
                                }`}
                              >
                                <div className="nav-item-img overflow-hidden position-relative">
                                  <Image
                                    className="w-100"
                                    src={page.image}
                                    alt={`mega-menu-${page.name
                                      .toLowerCase()
                                      .replace(" ", "-")}`}
                                  />
                                </div>
                                <h6 className="h6">{page.name}</h6>
                                <Link
                                  className="position-absolute h-100 w-100 start-0 top-0 z-index-one"
                                  href={page.href}
                                ></Link>
                              </div>
                            ))}
                          </div>
                        </div>
                        <ul>
                          {headerContent.homePages.map((page, index) => (
                            <li key={index}>
                              <Link href={page.href}>{page.name}</Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                      <li className="has-child-menu">
                        <Link href="#" onClick={(e) => e.preventDefault()}>Pages</Link>
                        <ul>
                          <li className="has-child-menu">
                            <Link href="#" onClick={(e) => e.preventDefault()}>Service</Link>
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
                            <Link href="#" onClick={(e) => e.preventDefault()}>Portfolio</Link>
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
                          <li className="has-child-menu">
                            <Link href="#" onClick={(e) => e.preventDefault()}>Team</Link>
                            <ul>
                              {headerContent.navigation.team.map(
                                (team, index) => (
                                  <li key={index}>
                                    <Link href={team.href}>{team.name}</Link>
                                  </li>
                                )
                              )}
                            </ul>
                          </li>
                          {headerContent.navigation.directLinks
                            .slice(2)
                            .map((link, index) => (
                              <li key={index}>
                                <Link href={link.href}>{link.name}</Link>
                              </li>
                            ))}
                        </ul>
                      </li>
                      <li className="has-child-menu">
                        <Link href="#" onClick={(e) => e.preventDefault()}>Blog</Link>
                        <ul>
                          {headerContent.navigation.blog.map((blog, index) => (
                            <li key={index}>
                              <Link href={blog.href}>{blog.name}</Link>
                            </li>
                          ))}
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
                        href="/contact"
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
                          href="/contact"
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
