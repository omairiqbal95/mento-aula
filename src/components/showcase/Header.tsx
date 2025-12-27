"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSticky } from "@/hooks/useSticky";
import { headerContent } from "@/content/showcase/home/header";
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
        <div className={`menu-area menu-area--fixed menu-area__showcase${isSticky ? ' sticky' : ''}`}>
          <div className="container-fluid">
            <div className="row align-items-center position-relative">
              <div className="col-lg-12 hamburger-menu position-relative">
                <div className="nav-wrap d-flex justify-content-between align-items-center">
                  <div className="menu-logo-wrap">
                    <Link href={headerContent.logo.href}>
                      <Image 
                        src={headerContent.logo.src} 
                        alt={headerContent.logo.alt}
                        priority
                      />
                    </Link>
                  </div>
                  <Navigation 
                    items={headerContent.navigation}
                  />
                  <div className="nav-wrap nav-wrap--extend d-flex justify-content-between align-items-center">
                    <div className="menu-btn-wrap menu-btn-wrap__desktop">
                      <div className="menu-btn-hidden">
                        <Link 
                          className={headerContent.buttons.desktop.className} 
                          href={headerContent.buttons.desktop.href}
                        >
                          {headerContent.buttons.desktop.text}
                        </Link>
                        <button 
                          className={headerContent.hamburgerButton.className}
                          onClick={toggleOffcanvas}
                          aria-label="Open menu"
                        >
                          {Array.from({ length: headerContent.hamburgerButton.spans }).map((_, index) => (
                            <span key={index} className="bg-white"></span>
                          ))}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Sidebar isOpen={isOffcanvasOpen} handleSidebar={toggleOffcanvas} />
    </>
  );
};

export default Header;