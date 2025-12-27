"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShowcaseInteractiveProps,
} from "@/types/showcase/showcase";

const ShowcaseInteractive: React.FC<ShowcaseInteractiveProps> = ({ items }) => {
  const [activeItem, setActiveItem] = useState<string>(
    items.find((item) => item.isActive)?.id || items[0]?.id
  );

  useEffect(() => {
    const initialActive = items.find((item) => item.isActive);
    if (initialActive) {
      setActiveItem(initialActive.id);
    }
  }, [items]);

  const handleMouseEnter = (itemId: string) => {
    setActiveItem(itemId);
  };

  return (
    <ul className="list-unstyled showcase-v2__ul">
      {items.map((item) => (
        <li key={item.id}>
          <div
            className={`showcase-v2__item${
              activeItem === item.id ? " active" : ""
            }`}
          >
            <Link
              href={item.href}
              className="showcase-v2__link"
              onClick={(e) => e.preventDefault()}
              onMouseEnter={() => handleMouseEnter(item.id)}
            >
              {item.title}
            </Link>
            <div className="showcase-v2__bg-image">
              <Image
                src={item.image}
                alt={item.title}
                priority={item.isActive}
              />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ShowcaseInteractive;
