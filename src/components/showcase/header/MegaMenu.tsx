import React from "react";
import Link from "next/link";
import Image from "next/image";
import { NavItem } from "@/types/showcase/header";

interface MegaMenuProps {
  items: NavItem[];
}

const MegaMenu: React.FC<MegaMenuProps> = ({ items }) => {
  return (
    <div className="sub-nav">
      <div className="nav-item-wrapper">
        {items.map((item) => (
          <div 
            key={item.id} 
            className={`nav-item text-center position-relative${item.isActive ? ' active' : ''}`}
          >
            <div className="nav-item-img overflow-hidden position-relative">
              {item.image && (
                <Image
                  className="w-100"
                  src={item.image}
                  alt={`mega-menu-${item.id}`}
                />
              )}
            </div>
            <h6 className="h6">{item.title}</h6>
            <Link
              className="position-absolute h-100 w-100 start-0 top-0 z-index-one"
              href={item.href}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MegaMenu;
