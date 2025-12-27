import React from 'react';
import Link from 'next/link';
import { NavigationProps } from '@/types/startup-agency/header';
import MegaMenu from './MegaMenu';
import SubMenu from './SubMenu';

const Navigation: React.FC<NavigationProps> = ({ items }) => {
  return (
    <ul className="home-menu">
      {items.map((item, index) => (
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
          {item.href ? (
            <Link href={item.href}>{item.title}</Link>
          ) : (
            <Link href="#" onClick={(e) => e.preventDefault()}>
              {item.title}
            </Link>
          )}

          {/* Mega Menu */}
          {item.isMegaMenu && item.megaMenuItems && (
            <MegaMenu items={item.megaMenuItems} />
          )}

          {/* Regular Submenu */}
          {item.hasSubmenu && item.submenu && (
            <SubMenu items={item.submenu} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default Navigation;
