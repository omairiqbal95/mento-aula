"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  navigationMenu,
  logoImage,
  ctaButton,
  type SubMenuGroup,
  type SubMenuItem,
} from "@/content/architectural-agency/header";
import { useSticky } from "@/hooks/useSticky";
import Sidebar from "../common/Sidebar";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isSticky = useSticky({ threshold: 100 });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const isSubMenuGroup = (item: unknown): item is SubMenuGroup => {
    return (
      typeof item === 'object' && 
      item !== null && 
      'hasChildren' in item && 
      'subMenu' in item &&
      typeof (item as Record<string, unknown>).hasChildren === 'boolean' &&
      (item as Record<string, unknown>).hasChildren === true
    );
  };

  const isSubMenuItem = (item: unknown): item is SubMenuItem => {
    return typeof item === 'object' && item !== null && 'link' in item;
  };

  return (
    <header>
      {/* Menu */}
      <div
        className={`menu-area menu-area--fixed menu-area--fixed-light ${
          isSticky ? "sticky" : ""
        }`}
      >
        <div className="container container-4xl">
          <div className="row align-items-center position-relative">
            <div className="col-lg-12 hamburger-menu position-relative">
              <div className="nav-wrap d-flex justify-content-between align-items-center">
                <div className="menu-logo-wrap flex-none">
                  <Link href="/">
                    <Image src={logoImage} alt="Logo" width={150} height={50} />
                  </Link>
                </div>
                <div className="mainmenu text-right d-none d-lg-block">
                  <ul className="home-menu">
                    {navigationMenu.map((menuItem) => (
                      <li
                        key={menuItem.id}
                        className={`${
                          menuItem.hasChildren ? "has-child-menu" : ""
                        } ${
                          menuItem.hasMegaMenu ? "has-child-menu-mega-menu" : ""
                        } ${menuItem.isActive ? "active" : ""}`}
                      >
                        <Link href={menuItem.link}>{menuItem.title}</Link>

                        {/* Mega Menu */}
                        {menuItem.hasMegaMenu && menuItem.megaMenuItems && (
                          <div className="sub-nav">
                            <div className="nav-item-wrapper">
                              {menuItem.megaMenuItems.map((megaItem) => (
                                <div
                                  key={megaItem.id}
                                  className={`nav-item text-center position-relative ${
                                    megaItem.isActive ? "active" : ""
                                  }`}
                                >
                                  <div className="nav-item-img overflow-hidden position-relative">
                                    <Image
                                      className="w-100"
                                      src={megaItem.image}
                                      alt={megaItem.title}
                                      width={300}
                                      height={200}
                                    />
                                  </div>
                                  <h6 className="h6">{megaItem.title}</h6>
                                  <Link
                                    className="position-absolute h-100 w-100 start-0 top-0 z-index-one"
                                    href={megaItem.link}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Regular Submenu */}
                        {menuItem.hasChildren &&
                          !menuItem.hasMegaMenu &&
                          menuItem.subMenu && (
                            <ul>
                              {menuItem.subMenu.map((subItem) =>
                                isSubMenuGroup(subItem) ? (
                                  <li
                                    key={subItem.id}
                                    className="has-child-menu"
                                  >
                                    <Link href="#">{subItem.title}</Link>
                                    <ul>
                                      {subItem.subMenu.map((nestedItem) => (
                                        <li key={nestedItem.id}>
                                          <Link href={nestedItem.link}>
                                            {nestedItem.title}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </li>
                                ) : (
                                  <li key={subItem.id}>
                                    <Link href={subItem.link}>
                                      {subItem.title}
                                    </Link>
                                  </li>
                                )
                              )}
                            </ul>
                          )}

                        {/* Mobile Submenu for Mega Menu */}
                        {menuItem.hasMegaMenu && menuItem.subMenu && (
                          <ul>
                            {menuItem.subMenu.map((subItem) => 
                              isSubMenuItem(subItem) ? (
                                <li key={subItem.id}>
                                  <Link href={subItem.link}>{subItem.title}</Link>
                                </li>
                              ) : null
                            )}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                  <div className="menu-btn-wrap menu-btn-wrap__mobile">
                    <Link
                      className="common-btn common-btn__variation5"
                      href={ctaButton.link}
                    >
                      {ctaButton.text}
                    </Link>
                  </div>
                </div>
                <div className="nav-wrap nav-wrap--extend d-flex justify-content-between align-items-center">
                  <div className="menu-btn-wrap menu-btn-wrap__desktop">
                    <div className="menu-btn-hidden">
                      <Link
                        className="common-btn common-btn__variation5 "
                        href={ctaButton.link}
                      >
                        {ctaButton.text}
                      </Link>
                      <button
                        className="side-panel__activator"
                        onClick={toggleMobileMenu}
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
      <Sidebar isOpen={isMobileMenuOpen} handleSidebar={toggleMobileMenu} />
    </header>
  );
};

export default Header;
