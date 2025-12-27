"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { headerContent } from "@/content/consultant-agency/home/header";
import { useSticky } from "@/hooks/useSticky";
import MegaMenu from "./header/MegaMenu";
import Navigation from "./header/Navigation";
import SearchPopup from "./SearchPopup";
import Sidebar from "@/components/common/Sidebar";

const Header = () => {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const isSticky = useSticky({ threshold: 100 });

  const toggleOffcanvas = () => {
    setIsOffcanvasOpen(!isOffcanvasOpen);
  };

  const openSearch = () => {
    setIsSearchActive(true);
  };

  const closeSearch = () => {
    setIsSearchActive(false);
  };


  return (
    <>
      <SearchPopup
        isActive={isSearchActive}
        onClose={closeSearch}
      />
      <header>
        {/* Menu */}
        <div className={`menu-area menu-area__ca border-grid-lr ${isSticky ? 'sticky' : ''}`}>
          <div className="container container-4xl border-grid-px">
            <div className="row align-items-center position-relative">
              <div className="col-lg-12 hamburger-menu mean-container">
                <div className="position-relative">
                  <div className="nav-wrap d-flex justify-content-between align-items-center">
                    <div className="menu-logo-wrap">
                      <Link href="/consultant-agency">
                        <Image src={headerContent.logo} alt="/" />
                      </Link>
                    </div>
                    <div className="nav-wrap nav-wrap--extend d-flex justify-content-between align-items-center">
                      <div className="mainmenu text-right d-none d-lg-block">
                        <ul className="home-menu">
                          <MegaMenu />
                          <Navigation />
                        </ul>
                        <div className="menu-btn-wrap menu-btn-wrap__mobile">
                          <Link
                            className="common-btn__variation2"
                            href="/contact"
                          >
                            {headerContent.buttons.consultation}
                          </Link>
                        </div>
                      </div>
                      <div className="menu-btn-wrap menu-btn-wrap__desktop d-none d-lg-flex">
                        <button
                          className="search__btn d-flex align-items-center gap-2 border-0 bg-transparent"
                          onClick={openSearch}
                        >
                          <i className="bi bi-search"></i>
                          <span>{headerContent.buttons.search}</span>
                        </button>
                        <div className="menu-btn-hidden">
                          <Link
                            className="common-btn__variation2"
                            href="/contact"
                          >
                            {headerContent.buttons.consultation}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    className="menu-reveal d-lg-none"
                    onClick={toggleOffcanvas}
                    aria-label="Toggle navigation"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#mobileMenu"
                    aria-controls="mobileMenu"
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
        {/* Menu end */}
      </header>

      <Sidebar isOpen={isOffcanvasOpen} handleSidebar={toggleOffcanvas} />
    </>
  );
};

export default Header;
