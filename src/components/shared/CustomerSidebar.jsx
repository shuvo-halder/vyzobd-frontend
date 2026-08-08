"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHome,
  FiShoppingBag,
  FiUser,
  FiMapPin,
  FiHeart,
  FiSliders,
  FiMenu,
  FiX,
  FiLogOut,
  FiArrowLeft,
} from "react-icons/fi";
import { useAuth } from "@/hooks/useAuth";

const CUSTOMER_NAV_LINKS = [
  { name: "Overview", href: "/account", icon: FiHome },
  { name: "My Orders", href: "/account/orders", icon: FiShoppingBag },
  { name: "Profile & Security", href: "/account/profile", icon: FiUser },
  { name: "Address Book", href: "/account/addresses", icon: FiMapPin },
  { name: "Wishlist", href: "/account/wishlist", icon: FiHeart },
  { name: "Account Settings", href: "/account/settings", icon: FiSliders },
];

function CustomerSidebarContent({ pathname, handleLogout, user }) {
  return (
    <div className="flex flex-col h-full bg-white border-r border-primary/10">
      {/* Brand & Back to Shop */}
      <div className="p-6 border-b border-primary/10 space-y-3">
        <Link
          href="/"
          className="text-xs font-semibold uppercase tracking-wider text-primary/60 hover:text-accent transition-colors flex items-center gap-2"
        >
          <FiArrowLeft className="w-3.5 h-3.5" />
          Back to Storefront
        </Link>
        <div className="pt-1">
          <h2 className="text-lg font-bold text-primary tracking-tight">My Account</h2>
          <p className="text-xs text-primary/60 truncate mt-0.5">{user?.email || "Customer Portal"}</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5">
        <span className="block px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-primary/40 mb-3">
          Account Menu
        </span>

        {CUSTOMER_NAV_LINKS.map((link) => {
          const Icon = link.icon;
          const isActive =
            pathname === link.href ||
            (link.href !== "/account" && pathname?.startsWith(link.href));

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 group ${
                isActive
                  ? "bg-primary text-white shadow-sm font-semibold"
                  : "text-primary/70 hover:bg-secondary hover:text-primary font-medium"
              }`}
            >
              <Icon
                className={`w-4 h-4 ${
                  isActive ? "text-white" : "text-primary/50 group-hover:text-primary transition-colors"
                }`}
              />
              <span className="text-sm">{link.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer / User Profile Summary & Logout */}
      <div className="p-4 border-t border-primary/10 bg-secondary/20">
        <div className="mb-3 px-2">
          <p className="text-xs font-bold text-primary truncate">{user?.name || "Customer"}</p>
          <span className="inline-block text-[10px] uppercase font-bold tracking-widest text-accent mt-0.5">
            Verified Customer
          </span>
        </div>
        <button
          onClick={handleLogout}
          type="button"
          className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-primary/70 bg-white border border-primary/10 rounded-md hover:bg-accent hover:text-white hover:border-accent transition-all group cursor-pointer"
        >
          <FiLogOut className="w-4 h-4 text-primary/50 group-hover:text-white transition-colors" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}

export default function CustomerSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { logout, user } = useAuth();

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle body scroll locking
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        className="lg:hidden fixed top-4 left-4 z-40 p-2.5 bg-white border border-primary/10 rounded-md text-primary shadow-sm hover:bg-secondary transition-colors"
        aria-label="Open Account Menu"
      >
        <FiMenu className="w-5 h-5" />
      </button>

      {/* Desktop Fixed Left Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 h-screen fixed top-0 left-0 z-30">
        <CustomerSidebarContent pathname={pathname} handleLogout={handleLogout} user={user} />
      </aside>

      {/* Mobile Drawer */}
      <div className="lg:hidden">
        <div
          className={`fixed inset-0 bg-primary/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
            isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsOpen(false)}
        />

        <aside
          className={`fixed top-0 left-0 h-screen w-[280px] z-50 transform transition-transform duration-300 ease-in-out shadow-2xl ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            onClick={() => setIsOpen(false)}
            type="button"
            className="absolute top-4 right-4 p-2 text-primary/50 hover:text-primary transition-colors"
            aria-label="Close Menu"
          >
            <FiX className="w-5 h-5" />
          </button>

          <CustomerSidebarContent pathname={pathname} handleLogout={handleLogout} user={user} />
        </aside>
      </div>
    </>
  );
}
