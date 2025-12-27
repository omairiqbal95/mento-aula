"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HeaderContent } from '@/types/consultant-agency/header';

interface OffcanvasPanelProps {
  content: HeaderContent;
  isOpen: boolean;
  activeDropdown: string | null;
  onClose: () => void;
  onToggleDropdown: (dropdown: string) => void;
}

const OffcanvasPanel = ({ 
  content, 
  isOpen, 
  activeDropdown, 
  onClose, 
  onToggleDropdown 
}: OffcanvasPanelProps) => {
  return (
    <>
      {/* Offcanvas Overlay */}
      {isOpen && (
        <div 
          className="offcanvas-overlay position-fixed w-100 h-100 top-0 start-0"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1040 }}
          onClick={onClose}
        />
      )}

      {/* Offcanvas Side Panel */}
      <div 
        className={`offcanvas offcanvas-end ${isOpen ? 'show' : ''}`}
        style={{ 
          visibility: isOpen ? 'visible' : 'hidden',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease-in-out',
          zIndex: 1045,
          width: '350px',
          backgroundColor: '#fff',
          boxShadow: '-2px 0 10px rgba(0,0,0,0.1)'
        }}
      >
        <div className="offcanvas-header border-bottom p-4">
          <Link href="/" className="offcanvas-title">
            <Image 
              src={content.logo} 
              alt="Unikon Logo"
            />
          </Link>
          <button 
            type="button" 
            className="btn-close" 
            onClick={onClose}
            aria-label="Close"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="offcanvas-body p-0">
          <nav className="mobile-nav">
            <ul className="list-unstyled m-0">
              {/* Home Dropdown */}
              <li className="nav-item border-bottom">
                <button 
                  className="nav-link w-100 text-start p-4 border-0 bg-transparent d-flex justify-content-between align-items-center"
                  onClick={() => onToggleDropdown('home')}
                >
                  <span>Home</span>
                  <i className={`bi bi-chevron-${activeDropdown === 'home' ? 'up' : 'down'}`}></i>
                </button>
                
                {activeDropdown === 'home' && (
                  <div className="dropdown-menu-mobile px-4 pb-3">
                    <div className="row g-3">
                      {content.homePages.map((page, index) => (
                        <div key={index} className="col-12">
                          <Link 
                            href={page.href}
                            className={`d-flex align-items-center gap-3 p-2 rounded text-decoration-none ${page.active ? 'bg-primary text-white' : 'text-dark'}`}
                            onClick={onClose}
                          >
                            <div className="nav-item-img" style={{ width: '40px', height: '30px', overflow: 'hidden', borderRadius: '4px' }}>
                              <Image 
                                src={page.image}
                                alt={page.name}
                                className="w-100 h-100 object-cover"
                              />
                            </div>
                            <span className="small">{page.name}</span>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </li>

              {/* Pages Dropdown */}
              <li className="nav-item border-bottom">
                <button 
                  className="nav-link w-100 text-start p-4 border-0 bg-transparent d-flex justify-content-between align-items-center"
                  onClick={() => onToggleDropdown('pages')}
                >
                  <span>Pages</span>
                  <i className={`bi bi-chevron-${activeDropdown === 'pages' ? 'up' : 'down'}`}></i>
                </button>
                
                {activeDropdown === 'pages' && (
                  <div className="dropdown-menu-mobile px-4 pb-3">
                    <div className="mb-3">
                      <h6 className="text-muted small mb-2">Services</h6>
                      {content.navigation.services.map((service, index) => (
                        <Link key={index} href={service.href} className="d-block py-1 text-decoration-none text-dark" onClick={onClose}>
                          {service.name}
                        </Link>
                      ))}
                    </div>
                    <div className="mb-3">
                      <h6 className="text-muted small mb-2">Portfolio</h6>
                      {content.navigation.portfolio.map((portfolio, index) => (
                        <Link key={index} href={portfolio.href} className="d-block py-1 text-decoration-none text-dark" onClick={onClose}>
                          {portfolio.name}
                        </Link>
                      ))}
                    </div>
                    <div className="mb-3">
                      <h6 className="text-muted small mb-2">Team</h6>
                      {content.navigation.team.map((team, index) => (
                        <Link key={index} href={team.href} className="d-block py-1 text-decoration-none text-dark" onClick={onClose}>
                          {team.name}
                        </Link>
                      ))}
                    </div>
                    {content.navigation.directLinks.slice(2).map((link, index) => (
                      <Link key={index} href={link.href} className="d-block py-1 text-decoration-none text-dark" onClick={onClose}>
                        {link.name}
                      </Link>
                    ))}
                  </div>
                )}
              </li>

              {/* Blog Dropdown */}
              <li className="nav-item border-bottom">
                <button 
                  className="nav-link w-100 text-start p-4 border-0 bg-transparent d-flex justify-content-between align-items-center"
                  onClick={() => onToggleDropdown('blog')}
                >
                  <span>Blog</span>
                  <i className={`bi bi-chevron-${activeDropdown === 'blog' ? 'up' : 'down'}`}></i>
                </button>
                
                {activeDropdown === 'blog' && (
                  <div className="dropdown-menu-mobile px-4 pb-3">
                    {content.navigation.blog.map((blog, index) => (
                      <Link key={index} href={blog.href} className="d-block py-2 text-decoration-none text-dark" onClick={onClose}>
                        {blog.name}
                      </Link>
                    ))}
                  </div>
                )}
              </li>

              {/* Direct Links */}
              {content.navigation.directLinks.slice(0, 2).map((link, index) => (
                <li key={index} className="nav-item border-bottom">
                  <Link 
                    href={link.href} 
                    className="nav-link d-block p-4 text-decoration-none text-dark"
                    onClick={onClose}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile CTA Button */}
            <div className="p-4">
              <Link 
                href="/contact" 
                className="btn btn-primary w-100"
                onClick={onClose}
              >
                {content.buttons.consultation}
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default OffcanvasPanel;
