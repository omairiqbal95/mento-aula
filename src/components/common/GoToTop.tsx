"use client";
import React, { useEffect, useState, useCallback } from "react";

const GoToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const goToTopBtn = (): void => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const listenToScroll = useCallback((): void => {
    const heightToHidden: number = 300;
    const winScroll: number =
      document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll > heightToHidden) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, []);

  useEffect((): (() => void) => {
    window.addEventListener("scroll", listenToScroll);
    return (): void => {
      window.removeEventListener("scroll", listenToScroll);
    };
  }, [listenToScroll]);

  const handleClick = (): void => {
    goToTopBtn();
  };

  return (
    <>
      {isVisible && (
        <div className="back-to-top-btn" onClick={handleClick}>
          <i className="bi bi-arrow-up"></i>
        </div>
      )}
    </>
  );
};

export default GoToTop;
