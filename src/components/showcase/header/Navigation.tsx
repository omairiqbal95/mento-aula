import React from "react";
import Link from "next/link";
import { MenuItem } from "@/types/showcase/header";
import MegaMenu from "./MegaMenu";
import SubMenu from "./SubMenu";

interface NavigationProps {
  items: MenuItem[];
}

const Navigation: React.FC<NavigationProps> = ({ items }) => {
  return (
    <div className="mainmenu d-none d-lg-block">
      <ul className="home-menu">
        {items.map((item) => (
          <li
            key={item.id}
            className={
              item.isMegaMenu
                ? "has-child-menu has-child-menu-mega-menu"
                : item.subMenuItems || item.sections
                ? "has-child-menu"
                : ""
            }
          >
            {item.href ? (
              <Link href={item.href}>{item.title}</Link>
            ) : (
              <Link href="#" onClick={(e) => e.preventDefault()}>{item.title}</Link>
            )}

            {item.isMegaMenu && item.megaMenuItems && (
              <MegaMenu items={item.megaMenuItems} />
            )}

            {item.sections && !item.isMegaMenu && (
              <ul>
                {item.sections.map((section) => (
                  <li key={section.id} className="has-child-menu">
                    <Link href="#" onClick={(e) => e.preventDefault()}>{section.title}</Link>
                    <SubMenu items={section.items} />
                  </li>
                ))}
                {item.items &&
                  item.items.map((subItem) => (
                    <li key={subItem.id}>
                      <Link href={subItem.href}>{subItem.title}</Link>
                    </li>
                  ))}
              </ul>
            )}

            {item.subMenuItems && !item.sections && !item.isMegaMenu && (
              <SubMenu items={item.subMenuItems} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navigation;
