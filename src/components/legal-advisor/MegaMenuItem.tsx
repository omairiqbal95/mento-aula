import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HomePage } from '@/types/legal-advisor/header';

interface MegaMenuItemProps {
  page: HomePage;
}

const MegaMenuItem = ({ page }: MegaMenuItemProps) => {
  return (
    <div className={`nav-item text-center position-relative ${page.active ? 'active' : ''}`}>
      <div className="nav-item-img overflow-hidden position-relative">
        <Image
          className="w-100"
          src={page.image}
          alt={page.name}
        />
      </div>
      <h6 className="h6">{page.name}</h6>
      <Link
        className="position-absolute h-100 w-100 start-0 top-0 z-index-one"
        href={page.href}
      ></Link>
    </div>
  );
};

export default MegaMenuItem;
