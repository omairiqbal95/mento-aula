import React from 'react';
import Link from 'next/link';
import { SubMenuItem } from '@/types/financial-advisor/header';

interface SubMenuProps {
  items: SubMenuItem[];
}

const SubMenu: React.FC<SubMenuProps> = ({ items }) => {
  return (
    <ul className="sub-menu">
      {items.map((item) => (
        <li key={item.id}>
          <Link href={item.href}>{item.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default SubMenu;
