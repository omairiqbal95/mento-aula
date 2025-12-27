"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  headerContent,
  MenuItem,
  SubMenuItem,
} from "@/content/healthcare/home/header";
import SearchPopup from "./SearchPopup";
import Link from "next/link";
import { useSticky } from "@/hooks/useSticky";
import Sidebar from "../common/Sidebar";

const Header = () => {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const isSticky = useSticky({ threshold: 100 });

  const toggleOffcanvas = () => {
    setIsOffcanvasOpen(!isOffcanvasOpen);
  };

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
  };

  const renderSubMenu = (submenu: (MenuItem | SubMenuItem)[]) => {
    return submenu.map((item, index) => (
      <li key={index} className={item.hasSubmenu ? "has-child-menu" : ""}>
        <Link
          href={item.href || "#"}
          onClick={(e) => !item.href && e.preventDefault()}
        >
          {item.title}
        </Link>
        {item.hasSubmenu && item.submenu && (
          <ul>{renderSubMenu(item.submenu)}</ul>
        )}
      </li>
    ));
  };

  return (
    <>
      <header>
        <div className={`menu-area healthcare ${isSticky ? "sticky" : ""}`}>
          <div className="container container-4xl">
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
                        style={{ width: "auto", height: "auto" }}
                      />
                    </Link>
                  </div>
                  <div className="mainmenu text-right d-none d-lg-block">
                    <ul className="home-menu">
                      {headerContent.navigation.map((item, index) => (
                        <li
                          key={index}
                          className={
                            item.isMegaMenu
                              ? "has-child-menu has-child-menu-mega-menu"
                              : item.hasSubmenu
                              ? "has-child-menu"
                              : ""
                          }
                        >
                          <Link
                            href={item.href || "#"}
                            onClick={(e) => !item.href && e.preventDefault()}
                          >
                            {item.title}
                          </Link>

                          {/* Mega Menu */}
                          {item.isMegaMenu && item.megaMenuItems && (
                            <div className="sub-nav">
                              <div className="nav-item-wrapper">
                                {item.megaMenuItems.map((megaItem) => (
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
                                        alt={`mega-menu-${megaItem.title
                                          .toLowerCase()
                                          .replace(/\s+/g, "-")}`}
                                        width={0}
                                        height={0}
                                        style={{
                                          width: "100%",
                                          height: "auto",
                                        }}
                                      />
                                    </div>
                                    <h6 className="h6">{megaItem.title}</h6>
                                    <Link
                                      className="position-absolute h-100 w-100 start-0 top-0 z-index-one"
                                      href={megaItem.href}
                                    ></Link>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Regular Submenu */}
                          {item.hasSubmenu && item.submenu && (
                            <ul>{renderSubMenu(item.submenu)}</ul>
                          )}

                          {/* Mobile Mega Menu List */}
                          {item.isMegaMenu && item.megaMenuItems && (
                            <ul>
                              {item.megaMenuItems.map((megaItem) => (
                                <li key={megaItem.id}>
                                  <Link href={megaItem.href}>
                                    {megaItem.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                    <div className="menu-btn-wrap menu-btn-wrap__mobile">
                      <Link
                        className="common-btn__variation8"
                        href={headerContent.appointmentButton.href}
                      >
                        {headerContent.appointmentButton.text}
                        <div className="icon-container">
                          <i
                            className={headerContent.appointmentButton.icon}
                          ></i>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="nav-wrap nav-wrap--extend d-flex justify-content-between align-items-center">
                    <div className="menu-btn-wrap menu-btn-wrap__desktop d-flex me-0">
                      <div className="menu-btn-hidden d-flex">
                        <Link
                          className="common-btn__variation8 d-none d-lg-inline-flex"
                          href={headerContent.appointmentButton.href}
                        >
                          {headerContent.appointmentButton.text}
                          <div className="icon-container">
                            <i
                              className={headerContent.appointmentButton.icon}
                            ></i>
                          </div>
                        </Link>
                        <button
                          className="side-panel__activator me-2"
                          onClick={toggleOffcanvas}
                        >
                          <span></span>
                          <span></span>
                          <span></span>
                        </button>
                      </div>
                      <button
                        className="search__btn search__btn-v2 align-items-center"
                        onClick={toggleSearch}
                      >
                        <i className="fa-solid fa-magnifying-glass"></i>
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
      <SearchPopup isActive={isSearchActive} onClose={toggleSearch} />
    </>
  );
};

export default Header;
