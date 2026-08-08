"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiX, FiChevronDown, FiUser, FiLogOut, FiLayout } from "react-icons/fi";
import logoImg from "../../../../public/logos/logo.svg";
import SearchBar from "./SearchBar";
import { NAV_ITEMS } from "@/config/navigation";

export default function MobileDrawer({ isOpen, onClose, user, logout, isAdmin }) {
  const pathname = usePathname();
  const [categoriesExpanded, setCategoriesExpanded] = useState(false);
  const closeBtnRef = useRef(null);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Move focus to close button
      setTimeout(() => {
        closeBtnRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over Panel */}
      <div className="fixed inset-y-0 left-0 w-[85vw] max-w-[320px] bg-secondary shadow-2xl flex flex-col z-50 transform transition-transform duration-300 ease-in-out border-r border-primary/10">
        {/* Drawer Header */}
        <div className="p-4 border-b border-primary/10 flex items-center justify-between bg-white">
          <Link href="/" onClick={onClose} className="flex items-center">
            <Image
              src={logoImg}
              width={100}
              height={50}
              alt="VyzoBD Store Logo"
              priority
              className="h-9 w-auto object-contain"
            />
          </Link>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Close navigation menu"
            className="p-2 text-primary hover:text-accent transition-colors rounded-full focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Search Bar Container */}
        <div className="p-4 border-b border-primary/10 bg-secondary/30">
          <SearchBar isMobile={true} onSearchSubmit={onClose} />
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto py-2">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;

            if (item.hasChildren) {
              return (
                <div key={item.id} className="border-b border-primary/10">
                  <button
                    onClick={() => setCategoriesExpanded((prev) => !prev)}
                    aria-expanded={categoriesExpanded}
                    className="w-full flex items-center justify-between px-6 py-4 text-sm font-semibold uppercase tracking-wider text-primary hover:text-accent transition-colors cursor-pointer"
                  >
                    <span>{item.label}</span>
                    <FiChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        categoriesExpanded ? "rotate-180 text-accent" : ""
                      }`}
                    />
                  </button>

                  {/* Accordion Children */}
                  {categoriesExpanded && (
                    <div className="bg-primary/5 py-2 px-6 space-y-2 border-t border-primary/5">
                      {item.children?.map((child) => (
                        <Link
                          key={child.id}
                          href={child.href}
                          onClick={onClose}
                          className="block py-2 text-xs font-medium text-primary/80 hover:text-accent transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={onClose}
                className={`block px-6 py-4 text-sm font-semibold uppercase tracking-wider border-b border-primary/10 transition-colors ${
                  isActive
                    ? "text-accent bg-primary/5 border-l-4 border-l-accent"
                    : "text-primary hover:text-accent hover:bg-primary/5"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Customer Account Section at Bottom */}
        <div className="border-t border-primary/10 bg-white p-4">
          {user ? (
            <div className="space-y-3">
              <div className="text-xs uppercase tracking-wider text-primary/60 font-semibold border-b border-primary/10 pb-2">
                Logged in as <span className="font-bold text-primary">{user?.name}</span>
              </div>
              <Link
                href="/account"
                onClick={onClose}
                className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-primary hover:text-accent transition-colors py-1.5"
              >
                <FiUser className="w-4 h-4 text-accent" />
                <span>My Account Hub</span>
              </Link>
              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={onClose}
                  className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-primary hover:text-accent transition-colors py-1.5"
                >
                  <FiLayout className="w-4 h-4 text-accent" />
                  <span>Admin Dashboard</span>
                </Link>
              )}
              <Link
                href="/account/orders"
                onClick={onClose}
                className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-primary hover:text-accent transition-colors py-1.5"
              >
                <FiUser className="w-4 h-4 text-accent" />
                <span>My Orders</span>
              </Link>
              <button
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="w-full flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-red-600 hover:text-red-700 transition-colors py-1.5 pt-2 border-t border-primary/5 cursor-pointer"
              >
                <FiLogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              onClick={onClose}
              className="flex items-center justify-center gap-2 bg-primary text-white py-3 px-4 rounded-md text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors"
            >
              <FiUser className="w-4 h-4" />
              <span>Login / Register</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
