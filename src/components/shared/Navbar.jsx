"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiChevronDown,
  FiPhoneCall,
  FiLayout,
  FiLogOut,
} from "react-icons/fi";
import logoImg from "../../../public/logos/logo.svg";

import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import toast from "react-hot-toast";
import SearchBar from "./header/SearchBar";
import MobileDrawer from "./header/MobileDrawer";
import { NAV_ITEMS } from "@/config/navigation";

export default function Navbar() {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  const { cartCount } = useCart();
  const { user, logout, isAdmin } = useAuth();

  const handleCloseDrawer = useCallback(() => {
    setIsMobileDrawerOpen(false);
  }, []);

  const handleOpenDrawer = useCallback(() => {
    setIsMobileDrawerOpen(true);
  }, []);

  // Close dropdowns and drawer on route change
  useEffect(() => {
    setIsMobileDrawerOpen(false);
    setIsDropdownOpen(false);
  }, [pathname]);

  // Close account dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsDropdownOpen(false);
      setIsMobileDrawerOpen(false);
      toast.success("Logged Out");
      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-secondary shadow-sm border-b border-primary/10">
      {/* ========================================================= */}
      {/* DESKTOP HEADER (Visible md and above)                     */}
      {/* ========================================================= */}
      <div className="hidden md:block">
        {/* Top Header Row: Logo | Search | Actions */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <div className="flex items-center justify-between gap-6">
            {/* Store Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="inline-block transition-transform duration-300 hover:scale-105">
                <Image
                  src={logoImg}
                  width={120}
                  height={60}
                  alt="VyzoBD Store Logo"
                  priority
                  className="h-11 lg:h-12 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Desktop Search Area */}
            <div className="flex-1 flex justify-center max-w-2xl px-4">
              <SearchBar />
            </div>

            {/* Header Right Actions: Account & Cart */}
            <div className="flex items-center space-x-5 flex-shrink-0">
              {/* Account Action */}
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:text-accent transition-colors focus:outline-none cursor-pointer py-1"
                    aria-label="User account menu"
                    aria-expanded={isDropdownOpen}
                  >
                    <div className="p-1.5 rounded-full bg-primary/5 text-primary">
                      <FiUser className="w-4 h-4" />
                    </div>
                    <span className="hidden lg:inline">{user?.name?.split(" ")[0]}</span>
                    <FiChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-white border border-primary/15 shadow-xl rounded-md py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="px-4 py-2 border-b border-primary/10 bg-secondary/30">
                        <p className="text-[10px] uppercase tracking-wider text-primary/60 font-semibold">Signed in as</p>
                        <p className="text-xs font-bold text-primary truncate">{user?.name}</p>
                      </div>
                      <Link
                        href="/account"
                        className="flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary hover:bg-accent hover:text-white transition-colors"
                      >
                        <FiUser className="w-4 h-4" />
                        Account Hub
                      </Link>
                      {isAdmin && (
                        <Link
                          href="/admin"
                          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary hover:bg-accent hover:text-white transition-colors"
                        >
                          <FiLayout className="w-4 h-4" />
                          Admin Dashboard
                        </Link>
                      )}
                      <Link
                        href="/account/orders"
                        className="flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary hover:bg-accent hover:text-white transition-colors"
                      >
                        My Orders
                      </Link>
                      <Link
                        href="/account/profile"
                        className="flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary hover:bg-accent hover:text-white transition-colors border-b border-primary/10"
                      >
                        Profile Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        <FiLogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:text-accent transition-colors"
                  aria-label="User Login"
                >
                  <div className="p-1.5 rounded-full bg-primary/5 text-primary">
                    <FiUser className="w-4 h-4" />
                  </div>
                  <span className="hidden lg:inline">Login / Register</span>
                </Link>
              )}

              {/* Cart Action */}
              <Link
                href="/cart"
                className="relative flex items-center gap-2 text-primary hover:text-accent transition-colors group py-1"
                aria-label={`Shopping Cart with ${cartCount} items`}
              >
                <div className="relative p-1.5 rounded-full bg-primary/5 text-primary group-hover:bg-accent/10 transition-colors">
                  <FiShoppingCart className="w-4 h-4 transform group-hover:scale-110 transition-transform" />
                  <span className="absolute -top-1 -right-1 bg-accent text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs border border-secondary">
                    {cartCount}
                  </span>
                </div>
                <div className="hidden lg:flex flex-col text-left">
                  <span className="text-[10px] uppercase font-bold text-primary/60">Shopping</span>
                  <span className="text-xs font-bold text-primary">Cart ({cartCount})</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Navigation Row */}
        <div className="bg-white border-t border-primary/10 shadow-2xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-11">
            {/* Links */}
            <nav className="flex items-center space-x-8">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;

                if (item.hasChildren) {
                  return (
                    <div key={item.id} className="relative group py-2.5">
                      <Link
                        href={item.href}
                        className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest transition-colors ${
                          isActive ? "text-accent" : "text-primary hover:text-accent"
                        }`}
                      >
                        <span>{item.label}</span>
                        <FiChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
                      </Link>

                      {/* Hover Category Dropdown Shell */}
                      <div className="absolute top-full left-0 hidden group-hover:block w-56 bg-white border border-primary/15 shadow-xl rounded-b-md py-2 z-50">
                        {item.children?.map((child) => (
                          <Link
                            key={child.id}
                            href={child.href}
                            className="block px-4 py-2 text-xs font-semibold text-primary/80 hover:text-accent hover:bg-secondary/60 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`text-xs font-bold uppercase tracking-widest transition-colors py-2.5 ${
                      isActive ? "text-accent border-b-2 border-accent" : "text-primary hover:text-accent"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Hotline / Contact Information */}
            <div className="flex items-center gap-2 text-xs font-bold text-primary/80">
              <FiPhoneCall className="w-3.5 h-3.5 text-accent" />
              <span>Hotline: <span className="text-accent">+880 1234 567890</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MOBILE HEADER BAR (Visible below md)                      */}
      {/* ========================================================= */}
      <div className="md:hidden flex items-center justify-between h-14 px-4 bg-secondary">
        {/* Hamburger Menu Toggle */}
        <button
          onClick={handleOpenDrawer}
          aria-label="Open navigation menu"
          aria-expanded={isMobileDrawerOpen}
          className="p-2 -ml-2 text-primary hover:text-accent transition-colors focus:outline-none cursor-pointer"
        >
          <FiMenu className="w-6 h-6" />
        </button>

        {/* Centered Store Logo */}
        <Link href="/" className="inline-block">
          <Image
            src={logoImg}
            width={100}
            height={50}
            alt="VyzoBD Store Logo"
            priority
            className="h-9 w-auto object-contain"
          />
        </Link>

        {/* Cart Icon Action */}
        <Link
          href="/cart"
          className="relative p-2 -mr-2 text-primary hover:text-accent transition-colors"
          aria-label={`Shopping Cart with ${cartCount} items`}
        >
          <FiShoppingCart className="w-6 h-6" />
          <span className="absolute top-1 right-1 bg-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-secondary shadow-xs">
            {cartCount}
          </span>
        </Link>
      </div>

      {/* Off-Canvas Mobile Navigation Drawer */}
      <MobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={handleCloseDrawer}
        user={user}
        logout={handleLogout}
        isAdmin={isAdmin}
      />
    </header>
  );
}
