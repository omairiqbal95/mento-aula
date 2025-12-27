"use client";

import React, { useRef } from "react";
import { SearchPopupProps } from "@/types/financial-advisor/header";
import XMarkIcon from "@/icons/XMarkIcon";

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
        <XMarkIcon />
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
            name="search"
            placeholder="Search here..."
            autoComplete="off"
            spellCheck={false}
          />

          <div className="search__popup-btns-wrapper">
            <button
              type="submit"
              className="common-btn__variation9"
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
