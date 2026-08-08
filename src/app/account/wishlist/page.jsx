"use client";

import React from "react";
import Link from "next/link";
import { FiHeart, FiShoppingBag, FiArrowRight } from "react-icons/fi";

export default function CustomerWishlistPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <span className="inline-block text-accent text-xs font-bold uppercase tracking-[0.2em] mb-1">
          Account Portal
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">
          Saved Wishlist
        </h1>
        <p className="text-xs sm:text-sm text-primary/60 mt-1">
          Keep track of your favorite products and saved items.
        </p>
      </div>

      <div className="bg-white p-8 sm:p-12 rounded-xl border border-primary/10 shadow-sm text-center max-w-md mx-auto">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-rose-50 border border-rose-100 text-rose-500 mb-4">
          <FiHeart className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-bold mb-2">Wishlist Synchronization</h2>
        <p className="text-xs text-primary/60 mb-6">
          Wishlist items will sync across your devices once the Wishlist API contract is provided.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-primary text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-md hover:bg-accent transition-all shadow-sm"
        >
          <FiShoppingBag className="w-4 h-4" />
          Explore Storefront
        </Link>
      </div>
    </div>
  );
}
