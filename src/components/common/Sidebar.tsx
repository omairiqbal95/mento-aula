"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Offcanvas from "react-bootstrap/Offcanvas";
import NestedAccordion from "@/components/common/NestedAccordion";
import { defaultSidebarData } from "@/content/common/sidebar";

interface SidebarProps {
  isOpen: boolean;
  handleSidebar: () => void;
  menuClass?: string;
}

const Sidebar = ({
  isOpen,
  handleSidebar,
  menuClass = "d-xl-none",
}: SidebarProps) => {
  const pathname = usePathname();
  const placement = "end";

  const getLogoHref = () => {
    const currentSegment = pathname.split('/')[1];
    const hasValidRoute = defaultSidebarData.menus[0].items?.some(item =>
      item.href === `/${currentSegment}`
    );

    return hasValidRoute ? `/${currentSegment}` : '/';
  };

  return (
    <Offcanvas
      show={isOpen}
      onHide={handleSidebar}
      placement={placement}
      className="side-panel"
    >
      <Offcanvas.Header className="sidebar-header">
        <div className="offset-logo">
          <Link href={getLogoHref()}>
            <Image
              src={defaultSidebarData.logo.image}
              alt={defaultSidebarData.logo.alt}
              height={150}
              priority
            />
          </Link>
        </div>
        <button
          type="button"
          className="side-panel__closer"
          onClick={handleSidebar}
          aria-label="Close"
        >
          <i className={defaultSidebarData.closeIcon}></i>
        </button>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className={`mobile-menu fix ${menuClass}`}>
          <NestedAccordion
            items={defaultSidebarData.menus}
          />
        </div>

        <div className="side-panel__content">
          <p>{defaultSidebarData.sidePanel.description}</p>

          <ul className="custom-ul side-panel__contact">
            {defaultSidebarData.sidePanel.contacts.map((contact, index) => {
              const IconComponent = contact.icon;
              return (
                <li key={index}>
                  <div className="contact-thumb">
                    <IconComponent />
                  </div>
                  <div className="contact-content">
                    <p>{contact.title}</p>
                    {contact.href ? (
                      <a href={contact.href}>{contact.value}</a>
                    ) : (
                      <span>{contact.value}</span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>

          <p className="side-panel__copyright">
            <span>{defaultSidebarData.sidePanel.copyright.brand}</span>
            {defaultSidebarData.sidePanel.copyright.text}
          </p>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Sidebar;
