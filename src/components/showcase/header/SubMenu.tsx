import React from "react";
import Link from "next/link";
import { SubNavItem } from "@/types/showcase/header";

interface SubMenuProps {
  items: SubNavItem[];
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
