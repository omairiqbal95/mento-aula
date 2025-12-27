"use client";

import React, { useRef } from "react";

interface SearchPopupProps {
  isActive: boolean;
  onClose: () => void;
}

const SearchPopup = ({ isActive, onClose }: SearchPopupProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    onClose();
  };

  return (
    <div className={`search__popup${isActive ? " active" : ""}`}>
      <button
        type="button"
        className="search__popup-toggle"
        onClick={onClose}
        aria-label="Close search"
      >
        <i className="fa-solid fa-xmark" />
      </button>

      <div className="search__popup-wrapper">
        <form
          className="search__popup-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <input
            ref={inputRef}
            className="search__input"
            type="search"
            placeholder="Search here..."
            autoComplete="off"
            spellCheck={false}
          />

          <div className="search__popup-btns-wrapper">
            <button
              type="submit"
              className="common-btn__variation3"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchPopup;
