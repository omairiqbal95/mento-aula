import React from "react";
import Link from "next/link";
import { headerContent } from "@/content/consultant-agency/home/header";
import MegaMenuItem from "../MegaMenuItem";

const MegaMenu = () => {
  return (
    <li className="has-child-menu has-child-menu-mega-menu">
      <Link href="#">Home</Link>
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
  );
};

export default MegaMenu;
