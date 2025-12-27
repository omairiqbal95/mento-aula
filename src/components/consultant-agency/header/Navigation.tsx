import React from "react";
import Link from "next/link";
import { headerContent } from "@/content/consultant-agency/home/header";
import SubMenu from "./SubMenu";

const Navigation = () => {
  return (
    <>
      <li className="has-child-menu">
        <Link href="#" onClick={(e) => e.preventDefault()}>Pages</Link>
        <ul>
          <li className="has-child-menu">
            <Link href="#" onClick={(e) => e.preventDefault()}>Services</Link>
            <SubMenu items={headerContent.navigation.services} />
          </li>
          <li className="has-child-menu">
            <Link href="#" onClick={(e) => e.preventDefault()}>Portfolio</Link>
            <SubMenu items={headerContent.navigation.portfolio} />
          </li>
          <li className="has-child-menu">
            <Link href="#" onClick={(e) => e.preventDefault()}>Team</Link>
            <SubMenu items={headerContent.navigation.team} />
          </li>
          {headerContent.navigation.directLinks.slice(2).map((link, index) => (
            <li key={index}>
              <Link href={link.href}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </li>
      <li className="has-child-menu">
        <Link href="#" onClick={(e) => e.preventDefault()}>Blog</Link>
        <SubMenu items={headerContent.navigation.blog} />
      </li>
      {headerContent.navigation.directLinks.slice(0, 2).map((link, index) => (
        <li key={index}>
          <Link href={link.href}>{link.name}</Link>
        </li>
      ))}
    </>
  );
};

export default Navigation;
