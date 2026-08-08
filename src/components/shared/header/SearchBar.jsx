"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import { CATEGORY_PLACEHOLDERS } from "@/config/navigation";

export default function SearchBar({ isMobile = false, onSearchSubmit }) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim() && !selectedCategory) return;

    const params = new URLSearchParams();
    if (query.trim()) {
      params.set("search", query.trim());
    }
    if (selectedCategory) {
      params.set("category", selectedCategory);
    }

    const searchUrl = `/products?${params.toString()}`;
    router.push(searchUrl);

    if (onSearchSubmit) {
      onSearchSubmit();
    }
  };

  if (isMobile) {
    return (
      <form onSubmit={handleSearch} className="relative w-full">
        <div className="relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products..."
            className="w-full pl-4 pr-10 py-2.5 bg-secondary text-primary text-sm rounded-lg border border-primary/20 focus:outline-none focus:border-accent transition-colors"
            aria-label="Search for products"
          />
          <button
            type="submit"
            className="absolute right-2 p-1.5 text-primary/60 hover:text-accent transition-colors cursor-pointer"
            aria-label="Submit search"
          >
            <FiSearch className="w-5 h-5" />
          </button>
        </div>
      </form>
    );
  }

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center w-full max-w-2xl bg-white border border-primary/20 rounded-md overflow-hidden shadow-xs hover:border-primary/40 focus-within:border-accent transition-colors"
    >
      {/* Category Dropdown Selector */}
      <div className="relative flex-shrink-0 border-r border-primary/15 bg-secondary/30">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="appearance-none bg-transparent pl-3 pr-7 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary cursor-pointer focus:outline-none"
          aria-label="Filter by category"
        >
          {CATEGORY_PLACEHOLDERS.map((cat) => (
            <option key={cat.id} value={cat.value} className="bg-white text-primary">
              {cat.name}
            </option>
          ))}
        </select>
        <FiChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary/60 pointer-events-none" />
      </div>

      {/* Main Search Input */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for products..."
        className="w-full px-3.5 py-1.5 text-xs text-primary placeholder:text-primary/40 focus:outline-none bg-transparent"
        aria-label="Search for products"
      />

      {/* Search Submit Button */}
      <button
        type="submit"
        className="flex-shrink-0 bg-accent text-white px-5 py-1.5 text-xs font-bold uppercase tracking-widest hover:bg-accent/90 transition-colors flex items-center gap-1.5 cursor-pointer"
        aria-label="Submit search"
      >
        <FiSearch className="w-3.5 h-3.5" />
        <span className="hidden lg:inline">Search</span>
      </button>
    </form>
  );
}
