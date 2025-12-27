"use client";

import { useState, useEffect } from 'react';

interface UseStickyOptions {
  threshold?: number;
  rootMargin?: string;
}

export const useSticky = (options: UseStickyOptions = {}) => {
  const { threshold = 100 } = options;
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          setIsSticky(scrollTop >= threshold);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return isSticky;
};
