"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import heroImg1 from "../../../public/hero/heroImg1.jpg";

// Curated high-end, high-contrast lifestyle and e-commerce product imagery
const SLIDES = [
  {
    id: 1,
    tag: "Next-Gen Audio",
    title: "Uncompromising Sound",
    subtitle:
      "Experience high-fidelity wireless audio with adaptive active noise cancellation and masterfully tuned acoustics.",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80",
    ctaText: "Explore Sound",
    ctaLink: "/products",
  },
  {
    id: 2,
    tag: "Smart Living",
    title: "Precision Smartwear",
    subtitle:
      "Track your vitals, receive instant notifications, and elevate your aesthetic with premium casing and advanced features.",
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1200&q=80",
    ctaText: "Discover Watches",
    ctaLink: "/products",
  },
  {
    id: 3,
    tag: "Exclusive Access",
    title: "The Visionary Sale",
    subtitle:
      "Limited-time pricing on our most awarded acoustic engineering and premium home audio ecosystems.",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=80",
    ctaText: "Shop The Sale",
    ctaLink: "/products",
  },
];

const PROMO_BANNERS = [
  {
    id: 1,
    badge: "Trending",
    title: "True Wireless Elite",
    linkText: "Shop Wireless",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80",
    href: "/products",
  },
  {
    id: 2,
    badge: "New Release",
    title: "Gaming Acoustics",
    linkText: "Explore Gear",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80",
    href: "/products",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Swipe interaction state
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const carouselRef = useRef(null);

  // Next and prev functions
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  }, []);

  // Motion preference detection
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleMotionChange);
    return () => mediaQuery.removeEventListener("change", handleMotionChange);
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (e.key === "ArrowLeft") {
      prevSlide();
    } else if (e.key === "ArrowRight") {
      nextSlide();
    }
  }, [nextSlide, prevSlide]);

  // Autoplay functionality: pauses when tab is inactive or on user hover
  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      if (!document.hidden) {
        nextSlide();
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [nextSlide, isHovered]);

  // Touch handlers for swipe
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <section className="bg-secondary/40 py-2 sm:py-6 lg:py-8" id="storefront-hero">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex flex-row gap-2 sm:gap-3 md:gap-4">
          
          {/* LEFT COLUMN: Large Main Hero Carousel (74-77% width depending on breakpoint) */}
          <div
            ref={carouselRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-roledescription="carousel"
            aria-label="Homepage Main Slides"
            className="w-[74%] sm:w-[75%] md:w-[76%] lg:w-[76%] xl:w-[77%] h-[160px] sm:h-[220px] md:h-[320px] lg:h-[450px] xl:h-[500px] relative rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden bg-primary shadow-xs group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
          >
            {SLIDES.map((slide, index) => {
              const isActive = index === currentSlide;

              return (
                <div
                  key={slide.id}
                  aria-hidden={!isActive}
                  className={`absolute inset-0 ${
                    prefersReducedMotion ? "" : "transition-opacity duration-1000 ease-in-out"
                  } ${isActive ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                >
                  {/* Background Image with optimized zoom transition */}
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      src={slide.image || heroImg1}
                      alt={slide.title}
                      fill
                      priority={index === 0}
                      referrerPolicy="no-referrer"
                      className={`object-cover object-center ${
                        prefersReducedMotion ? "" : "transition-transform duration-[8000ms] ease-out"
                      } ${isActive && !prefersReducedMotion ? "scale-100" : "scale-105"}`}
                      sizes="(max-width: 1024px) 75vw, 75vw"
                    />
                    {/* Balanced dark gradient overlay for optimal visual text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent md:bg-gradient-to-r md:from-black/85 md:via-black/30 md:to-transparent" />
                  </div>

                  {/* Content Overlay */}
                  <div className="relative z-20 h-full flex flex-col justify-center px-4 sm:px-8 md:px-12 lg:px-16 max-w-xl md:max-w-2xl">
                    {/* Tagline */}
                    <div className="overflow-hidden mb-0.5 sm:mb-1 md:mb-2 lg:mb-3">
                      <span
                        className={`block text-accent font-semibold text-[8px] sm:text-[10px] md:text-xs uppercase tracking-[0.2em] transform ${
                          prefersReducedMotion ? "" : "transition-all duration-700 ease-out delay-100"
                        } ${isActive ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
                      >
                        {slide.tag}
                      </span>
                    </div>

                    {/* Main Title */}
                    <div className="overflow-hidden mb-1 sm:mb-2 md:mb-3 lg:mb-4">
                      <h1
                        className={`text-xs sm:text-lg md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white tracking-tight leading-tight transform ${
                          prefersReducedMotion ? "" : "transition-all duration-700 ease-out delay-250"
                        } ${isActive ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
                      >
                        {slide.title}
                      </h1>
                    </div>

                    {/* Subtitle */}
                    <div className="overflow-hidden mb-2 sm:mb-4 md:mb-6 lg:mb-8 hidden xs:block">
                      <p
                        className={`text-[9px] sm:text-[11px] md:text-sm lg:text-base text-secondary/90 font-light leading-relaxed max-w-md line-clamp-1 sm:line-clamp-2 md:line-clamp-none transform ${
                          prefersReducedMotion ? "" : "transition-all duration-700 ease-out delay-400"
                        } ${isActive ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
                      >
                        {slide.subtitle}
                      </p>
                    </div>

                    {/* CTA Button */}
                    <div
                      className={`transform ${
                        prefersReducedMotion ? "" : "transition-all duration-700 ease-out delay-550"
                      } ${isActive ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                    >
                      <Link
                        href={slide.ctaLink}
                        className="group inline-flex items-center justify-center gap-1.5 sm:gap-2.5 bg-accent hover:bg-white hover:text-primary text-white text-[8px] sm:text-xs md:text-sm font-bold uppercase tracking-wider py-1.5 px-3 sm:py-2.5 sm:px-5 md:py-3.5 md:px-7 rounded-md sm:rounded-lg transition-all duration-300 shadow-sm"
                      >
                        <span>{slide.ctaText}</span>
                        <ArrowRight className="w-2.5 h-2.5 sm:w-4 sm:h-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Pagination Controls - Elegant Left Corner Dash Dots */}
            <div className="absolute z-30 bottom-2 left-4 sm:bottom-4 sm:left-6 md:left-10 flex space-x-1.5" role="tablist" aria-label="Carousel Slides">
              {SLIDES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  aria-selected={index === currentSlide}
                  role="tab"
                  aria-label={`Go to slide ${index + 1}`}
                  className="group py-1 relative flex items-center justify-center cursor-pointer focus:outline-hidden"
                >
                  <div
                    className={`transition-all duration-500 ease-out h-0.5 sm:h-1 rounded-full ${
                      index === currentSlide ? "w-5 sm:w-8 bg-accent" : "w-1.5 sm:w-3 bg-white/40 group-hover:bg-white/70"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Navigation Arrow Controls - Glassmorphic Right Corner Placement */}
            <div className="absolute z-30 bottom-2 right-4 sm:bottom-4 sm:right-6 md:right-10 flex gap-1 sm:gap-2">
              <button
                onClick={prevSlide}
                aria-label="Previous Slide"
                className="p-1 sm:p-2 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/15 text-white transition-all transform hover:scale-105 active:scale-95 cursor-pointer focus:outline-hidden"
              >
                <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next Slide"
                className="p-1 sm:p-2 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/15 text-white transition-all transform hover:scale-105 active:scale-95 cursor-pointer focus:outline-hidden"
              >
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Stacked Promotional Banners (23-26% width depending on breakpoint) */}
          <div className="w-[26%] sm:w-[25%] md:w-[24%] lg:w-[24%] xl:w-[23%] h-[160px] sm:h-[220px] md:h-[320px] lg:h-[450px] xl:h-[500px] flex flex-col gap-2 sm:gap-3 md:gap-4">
            {PROMO_BANNERS.map((banner) => (
              <Link
                key={banner.id}
                href={banner.href}
                className="flex-1 min-h-0 relative block overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl group shadow-xs focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
              >
                {/* Background Banner Image */}
                <Image
                  src={banner.image}
                  alt={banner.title}
                  fill
                  referrerPolicy="no-referrer"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 25vw, 25vw"
                />
                {/* Sleek Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent transition-opacity duration-300 group-hover:via-black/55" />
                
                {/* Info Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-2.5 sm:p-4 md:p-6 z-10">
                  <span className="inline-block bg-accent/95 text-white font-bold text-[6px] sm:text-[9px] md:text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-full w-max mb-1 sm:mb-1.5 md:mb-2 shadow-xs">
                    {banner.badge}
                  </span>
                  <h3 className="text-[10px] sm:text-xs md:text-base lg:text-lg xl:text-xl font-extrabold text-white leading-tight mb-0.5 sm:mb-1 md:mb-1.5 line-clamp-1 sm:line-clamp-2 md:line-clamp-none">
                    {banner.title}
                  </h3>
                  <p className="text-[8px] sm:text-[10px] md:text-xs text-secondary/80 font-medium flex items-center gap-1 sm:gap-1.5 group-hover:text-white transition-colors">
                    <span>{banner.linkText}</span>
                    <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 transform transition-transform duration-300 group-hover:translate-x-1" />
                  </p>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
