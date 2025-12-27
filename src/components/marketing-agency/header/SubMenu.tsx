import React from "react";
import Link from "next/link";
import { SubMenuItem } from "@/types/marketing-agency/header";

interface SubMenuProps {
  items: SubMenuItem[];
}

const SubMenu: React.FC<SubMenuProps> = ({ items }) => {
  return (
    <ul>
      {items.map((subItem) => (
        <li key={subItem.id}>
          <Link href={subItem.href}>{subItem.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default SubMenu;
