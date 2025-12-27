import React from 'react';
import Link from 'next/link';
import { SubMenuProps, SubMenuItem } from '@/types/startup-agency/header';

const SubMenu: React.FC<SubMenuProps> = ({ items }) => {
  const renderSubMenu = (submenuItems: SubMenuItem[]) => {
    return submenuItems.map((item, index) => (
      <li key={index} className={item.hasSubmenu ? 'has-child-menu' : ''}>
        {item.href ? (
          <Link href={item.href}>{item.title}</Link>
        ) : (
          <Link href="#" onClick={(e) => e.preventDefault()}>
            {item.title}
          </Link>
        )}
        {item.hasSubmenu && item.submenu && (
          <ul>{renderSubMenu(item.submenu)}</ul>
        )}
      </li>
    ));
  };

  return <ul>{renderSubMenu(items)}</ul>;
};

export default SubMenu;
