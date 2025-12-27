import React from "react";
import Link from "next/link";
import { PortfolioLink } from "@/types/inner-pages/team-details";

interface PortfolioSectionProps {
  title: string;
  portfolioLinks: PortfolioLink[];
}

const PortfolioSection: React.FC<PortfolioSectionProps> = ({ title, portfolioLinks }) => {
  return (
    <div className="portfolio">
      <h5 className="h5">{title}</h5>
      <ul className="custom-ul portfolio-lists">
        {portfolioLinks.map((link) => (
          <li key={link.id}>
            <Link href={link.href}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PortfolioSection;
