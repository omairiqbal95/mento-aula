import React from "react";
import Image from "next/image";
import Link from "next/link";
import Arrow from "@/icons/Arrow";
import type { PortfolioItemData } from "@/types/inner-pages/portfolio-default";

const PortfolioDefaultItem: React.FC<{ item: PortfolioItemData }> = ({ item }) => {
  const year = new Date().getFullYear();
  return (
    <div className="work-sa__item">
      <Link href={item.href} className="work-sa__item-figure">
        <Image src={item.image} alt="work" />
      </Link>
      <div className="work-sa__item-body">
        <div className="work-sa__item-content">
          <h6 className="h6">
            <Link href={item.href}>{item.title}</Link>
          </h6>
          <p>{item.categories}</p>
        </div>
        <Link href={item.href} className="arrow" aria-label={`Go to details (${year})`}>
          <Arrow />
          <span className="visually-hidden">{year}</span>
        </Link>
      </div>
    </div>
  );
};

export default PortfolioDefaultItem;
