"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { headerContent } from "@/content/legal-advisor/home/header";
import { useSticky } from "@/hooks/useSticky";
import MegaMenu from "./header/MegaMenu";
import Navigation from "./header/Navigation";
import Sidebar from "@/components/common/Sidebar";

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
        <div className={`menu-area menu-area--fixed ${isSticky ? 'sticky' : ''}`}>
          <div className="container">
            <div className="row align-items-center position-relative">
              <div className="col-lg-12 hamburger-menu position-relative">
                <div className="nav-wrap d-flex justify-content-between align-items-center">
                  <div className="menu-logo-wrap">
                    <Link href="/legal-advisor">
                      <Image src={headerContent.logo} alt="legal-advisor" />
                    </Link>
                  </div>
                  <div className="mainmenu d-none d-lg-block">
                    <ul className="home-menu">
                      <MegaMenu />
                      <Navigation />
                    </ul>
                    <div className="menu-btn-wrap menu-btn-wrap__mobile">
                      <Link
                        className="common-btn__variation4 common-btn__variation4--extend common-btn__variation4--header"
                        href={headerContent.buttons.consultationHref}
                      >
                        {headerContent.buttons.consultation}
                      </Link>
                    </div>
                  </div>
                  <div className="nav-wrap nav-wrap--extend d-flex justify-content-between align-items-center">
                    <div className="menu-btn-wrap menu-btn-wrap__desktop">
                      <div className="menu-btn-hidden d-flex">
                        <Link
                          className="common-btn__variation4 common-btn__variation4--extend common-btn__variation4--header"
                          href={headerContent.buttons.consultationHref}
                        >
                          {headerContent.buttons.consultation}
                        </Link>
                        <button
                          className="side-panel__activator"
                          onClick={toggleOffcanvas}
                          aria-label="Toggle navigation"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#mobileMenu"
                          aria-controls="mobileMenu"
                        >
                          <span className="bg-white"></span>
                          <span className="bg-white"></span>
                          <span className="bg-white"></span>
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
    </>
  );
};

export default Header;
