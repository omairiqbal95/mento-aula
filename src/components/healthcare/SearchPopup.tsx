"use client";
import React, { useRef, useCallback } from "react";

interface SearchPopupProps {
  isActive: boolean;
  onClose: () => void;
}

const SearchPopup: React.FC<SearchPopupProps> = ({ isActive, onClose }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    onClose();
  }, [onClose]);

  const handleClear = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className={`search__popup ${isActive ? "active" : ""}`}>
      <span className="search__popup-toggle" onClick={onClose}>
        <i className="fa-solid fa-xmark"></i>
      </span>
      <div className="search__popup-wrapper">
        <form onSubmit={handleSubmit} className="search__popup-form">
          <input
            ref={inputRef}
            className="search__input"
            type="search"
            name="search"
            placeholder="search here"
          />
          <div className="search__popup-btns-wrapper">
            <span className="search-clear" onClick={handleClear}>
              <i className="fa-solid fa-x"></i>
            </span>
            <button className="common-btn__variation8--extend">Search</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchPopup;
