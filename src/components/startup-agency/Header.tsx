"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { headerContent } from '@/content/startup-agency/home/header';
import { useSticky } from '@/hooks/useSticky';
import Navigation from './header/Navigation';
import Sidebar from '@/components/common/Sidebar';

const Header = () => {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const isSticky = useSticky({ threshold: 100 });

  const toggleOffcanvas = () => setIsOffcanvasOpen(!isOffcanvasOpen);

  return (
    <header>
      <div className={`menu-area ${isSticky ? 'sticky' : ''}`}>
        <div className="container container-3xl header-border-bottom">
          <div className="row align-items-center position-relative">
            <div className="col-lg-12 hamburger-menu position-relative">
              <div className="nav-wrap d-flex justify-content-between align-items-center">
                <div className="menu-logo-wrap">
                  <Link href="/">
                    <Image
                      src={headerContent.logo}
                      alt="logo"
                      width={0}
                      height={0}
                      style={{ width: 'auto', height: 'auto' }}
                    />
                  </Link>
                </div>
                <div className="nav-wrap d-flex justify-content-end align-items-center">
                  <div className="mainmenu text-right">
                    <Navigation items={headerContent.navigation} />
                  </div>
                  <div className="menu-btn-wrap menu-btn-wrap__desktop">
                    <div className="menu-btn-hidden d-none d-lg-block">
                      <Link 
                        className="common-btn" 
                        href={headerContent.contactButton.href}
                      >
                        {headerContent.contactButton.text}
                      </Link>
                    </div>
                  </div>
                  
                  {/* Mobile Menu Button */}
                  <button
                    className="side-panel__activator d-lg-none"
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
      </div>
      
      {/* Mobile Sidebar */}
      <Sidebar isOpen={isOffcanvasOpen} handleSidebar={toggleOffcanvas} />
    </header>
  );
};

export default Header;
