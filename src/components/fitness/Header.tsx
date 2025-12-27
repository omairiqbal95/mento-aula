"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { headerContent } from "@/content/fitness/home/header";
import MegaMenuItem from "./MegaMenuItem";
import Sidebar from "@/components/common/Sidebar";
import { useSticky } from "@/hooks/useSticky";

const Header = () => {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const isSticky = useSticky({ threshold: 100 });

  const toggleOffcanvas = () => {
    setIsOffcanvasOpen(!isOffcanvasOpen);
  };

  return (
    <>
      <header>
        {/* Menu */}
        <div className={`menu-area menu-fit ${isSticky ? "sticky" : ""}`}>
          <div className="container container-fitness">
            <div className="row align-items-center position-relative">
              <div className="col-lg-12 hamburger-menu position-relative">
                <div className="nav-wrap d-flex justify-content-between align-items-center">
                  <div className="menu-logo-wrap">
                    <Link href="/">
                      <Image src={headerContent.logo} alt="logo" />
                    </Link>
                  </div>

                  <div className="nav-wrap nav-wrap--extend d-none d-lg-flex justify-content-between align-items-center">
                    <div className="mainmenu text-right d-none d-lg-block">
                      <ul className="home-menu">
                        <li className="has-child-menu has-child-menu-mega-menu active">
                          <Link href="#" onClick={(e) => e.preventDefault()}>
                            Home
                          </Link>
                          <div className="sub-nav">
                            <div className="nav-item-wrapper">
                              {headerContent.homePages.map((page, index) => (
                                <MegaMenuItem key={index} page={page} />
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
                          <Link href="#" onClick={(e) => e.preventDefault()}>
                            Pages
                          </Link>
                          <ul>
                            <li className="has-child-menu">
                              <Link
                                href="#"
                                onClick={(e) => e.preventDefault()}
                              >
                                Service
                              </Link>
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
                              <Link
                                href="#"
                                onClick={(e) => e.preventDefault()}
                              >
                                Portfolio
                              </Link>
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
                              <Link
                                href="#"
                                onClick={(e) => e.preventDefault()}
                              >
                                Team
                              </Link>
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
                          <Link href="#" onClick={(e) => e.preventDefault()}>
                            Blog
                          </Link>
                          <ul>
                            {headerContent.navigation.blog.map(
                              (blog, index) => (
                                <li key={index}>
                                  <Link href={blog.href}>{blog.name}</Link>
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
                          className="common-btn__variation10"
                          href="/contact"
                        >
                          {headerContent.buttons.cta}
                        </Link>
                      </div>
                    </div>
                    <div className="menu-btn-wrap menu-btn-wrap__desktop">
                      <div className="menu-btn-hidden ">
                        <Link
                          className="common-btn__variation10"
                          href="/contact"
                        >
                          {headerContent.buttons.cta}
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <div className="d-flex d-lg-none align-items-center">
                    {/* Mobile hamburger button */}
                    <button
                      className="side-panel__activator me-2"
                      onClick={toggleOffcanvas}
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
        {/* Menu end */}
      </header>

      <Sidebar isOpen={isOffcanvasOpen} handleSidebar={toggleOffcanvas} />
    </>
  );
};

export default Header;
