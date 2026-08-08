"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const getCategoryImage = (categoryName) => {
  const name = String(categoryName || "").toLowerCase();
  if (name.includes("electronic") || name.includes("gadget") || name.includes("headphone") || name.includes("audio")) {
    return "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=400&q=80";
  }
  if (name.includes("watch") || name.includes("wearable") || name.includes("smart") || name.includes("clock")) {
    return "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=400&q=80";
  }
  if (name.includes("fashion") || name.includes("apparel") || name.includes("cloth") || name.includes("pant") || name.includes("polo") || name.includes("t-shirt") || name.includes("shirt")) {
    return "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=400&q=80";
  }
  if (name.includes("home") || name.includes("kitchen") || name.includes("furnish") || name.includes("room")) {
    return "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80";
  }
  if (name.includes("beauty") || name.includes("health") || name.includes("care") || name.includes("cosmetic")) {
    return "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=400&q=80";
  }
  if (name.includes("sport") || name.includes("outdoor") || name.includes("fitness")) {
    return "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=400&q=80";
  }
  if (name.includes("game") || name.includes("gaming") || name.includes("play") || name.includes("console")) {
    return "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=400&q=80";
  }
  // Fallbacks based on seed terms or generic beautiful tech/lifestyle image
  return "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80";
};

export default function CategoryCarousel({ categories }) {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll button states (enabled / disabled)
  const checkScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      // Allow 3px tolerance for zoom/subpixel values
      setCanScrollLeft(scrollLeft > 3);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 3);
    }
  };

  // Attach scroll listeners
  useEffect(() => {
    const container = carouselRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollButtons);
      checkScrollButtons();

      const observer = new ResizeObserver(() => {
        checkScrollButtons();
      });
      observer.observe(container);

      return () => {
        container.removeEventListener("scroll", checkScrollButtons);
        observer.disconnect();
      };
    }
  }, [categories]);

  // Scroll handler
  const handleScroll = (direction) => {
    if (carouselRef.current) {
      const { clientWidth } = carouselRef.current;
      const scrollAmount = direction === "left" ? -clientWidth * 0.75 : clientWidth * 0.75;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      {/* Top Header Row */}
      <div className="flex items-end justify-between mb-8 sm:mb-10">
        <div>
          <span className="block text-accent font-semibold text-xs md:text-sm uppercase tracking-[0.2em] mb-2 sm:mb-3">
            Explore Collections
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary tracking-tight">
            Browse by Categories
          </h2>
        </div>

        {/* Navigation Arrow Controls */}
        <div className="flex gap-1.5 sm:gap-2 select-none">
          <button
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
            aria-label="Previous Categories"
            className={`p-2 rounded-full border border-primary/10 transition-all cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent ${
              canScrollLeft
                ? "bg-white text-primary hover:bg-primary/5 hover:border-primary/20 active:scale-95"
                : "bg-primary/5 text-primary/30 border-transparent cursor-not-allowed"
            }`}
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={() => handleScroll("right")}
            disabled={!canScrollRight}
            aria-label="Next Categories"
            className={`p-2 rounded-full border border-primary/10 transition-all cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent ${
              canScrollRight
                ? "bg-white text-primary hover:bg-primary/5 hover:border-primary/20 active:scale-95"
                : "bg-primary/5 text-primary/30 border-transparent cursor-not-allowed"
            }`}
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Category Card Carousel */}
      <div
        ref={carouselRef}
        className="flex flex-row overflow-x-auto scroll-smooth gap-3 sm:gap-4 md:gap-5 pb-4 scrollbar-none snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex-shrink-0 snap-start w-[calc(50%-6px)] sm:w-[calc(33.33%-11px)] md:w-[calc(25%-15px)] lg:w-[calc(20%-16px)] xl:w-[calc(16.66%-17px)]"
          >
            <Link
              href={category.href}
              className="group flex flex-col bg-white rounded-xl border border-primary/5 hover:border-accent/30 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden text-center h-full focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
            >
              {/* Image Container */}
              <div className="relative aspect-square w-full bg-secondary overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  referrerPolicy="no-referrer"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                  className="object-cover object-center transform transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
              </div>

              {/* Info Block */}
              <div className="p-3 sm:p-4 md:p-5 flex flex-col flex-1 justify-center items-center">
                <h3 className="font-bold text-xs sm:text-sm md:text-base text-primary group-hover:text-accent transition-colors line-clamp-1 max-w-full">
                  {category.name}
                </h3>
                {category.productCount !== null && (
                  <span className="text-[10px] sm:text-xs text-primary/45 font-medium mt-0.5 sm:mt-1">
                    {category.productCount} {category.productCount === 1 ? "Product" : "Products"}
                  </span>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
export { getCategoryImage };
