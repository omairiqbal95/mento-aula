"use client";

import { useState, FormEvent } from "react";
import SearchIcon from "@/icons/SearchIcon";

interface SearchWidgetProps {
  title: string;
  placeholder: string;
}

const SearchWidget = ({ title, placeholder }: SearchWidgetProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (searchQuery.trim()) {
      // TODO: Implement search functionality
      setSearchQuery("");
    }
  };

  return (
    <form className="widget__item widget__search" onSubmit={handleSubmit}>
      <h6 className="h6 widget__title">{title}</h6>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder={placeholder}
          aria-label="Search bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-icon">
          <SearchIcon />
        </button>
      </div>
    </form>
  );
};

export default SearchWidget;
