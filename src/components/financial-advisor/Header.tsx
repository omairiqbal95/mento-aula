'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSticky } from '@/hooks/useSticky';
import { headerContent } from '@/content/financial-advisor/home/header';
import SearchPopup from './SearchPopup';
import Navigation from './header/Navigation';
import Sidebar from '@/components/common/Sidebar';

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

  const handleSearch = (_query: string) => {
    // TODO: Implement search functionality
  };

  return (
    <>
      <SearchPopup
        isActive={isSearchActive}
        onClose={closeSearch}
        onSearch={handleSearch}
      />
      <header>
        <div className={`menu-area menu-area__fin menu-area--fixed-dark${isSticky ? ' sticky' : ''}`}>
          <div className="container container-2xl">
            <div className="row align-items-center position-relative">
              <div className="col-lg-12 hamburger-menu position-relative">
                <div className="nav-wrap d-flex justify-content-between align-items-center">
                  <div className="menu-logo-wrap">
                    <Link href={headerContent.logo.href}>
                      <Image 
                        src={headerContent.logo.image} 
                        alt={headerContent.logo.alt}
                      />
                    </Link>
                  </div>
                  
                  <Navigation items={headerContent.navigation} />
                  
                  <div className="menu-right-wrap d-flex align-items-center gap-4">
                    <div className="menu-right-item">
                      <button
                        type="button"
                        className="search-btn bg-transparent"
                        onClick={openSearch}
                        aria-label="Open search"
                      >
                        <i className="fa-solid fa-magnifying-glass" />
                      </button>
                    </div>
                    <div className="menu-right-item d-grid place-content-center">
                      <button
                        type="button"
                        className="side-panel__activator"
                        onClick={toggleOffcanvas}
                        aria-label="Toggle menu"
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
      </header>
      <Sidebar isOpen={isOffcanvasOpen} handleSidebar={toggleOffcanvas} />
    </>
  );
};

export default Header;