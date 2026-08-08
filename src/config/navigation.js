// src/config/navigation.js
/**
 * TEMPORARY FRONTEND UI DATA
 * Single Source of Truth for Storefront Navigation Items.
 * Both Desktop and Mobile headers consume this configuration.
 * Architected for future integration with backend navigation.service.js API.
 */

export const NAV_ITEMS = [
  {
    id: "home",
    label: "Home",
    href: "/",
  },
  {
    id: "shop",
    label: "Shop",
    href: "/products",
  },
  {
    id: "categories",
    label: "Categories",
    href: "/products",
    hasChildren: true,
    children: [
      { id: "cat-electronics", label: "Electronics & Gadgets", href: "/products?category=electronics" },
      { id: "cat-fashion", label: "Fashion & Apparel", href: "/products?category=fashion" },
      { id: "cat-home", label: "Home & Kitchen", href: "/products?category=home" },
      { id: "cat-beauty", label: "Beauty & Personal Care", href: "/products?category=beauty" },
      { id: "cat-sports", label: "Sports & Outdoors", href: "/products?category=sports" },
    ],
  },
  {
    id: "about",
    label: "About Us",
    href: "/about",
  },
  {
    id: "contact",
    label: "Contact",
    href: "/contact",
  },
];

export const CATEGORY_PLACEHOLDERS = [
  { id: "all", name: "All Categories", value: "" },
  { id: "electronics", name: "Electronics", value: "electronics" },
  { id: "fashion", name: "Fashion", value: "fashion" },
  { id: "home", name: "Home & Kitchen", value: "home" },
  { id: "beauty", name: "Beauty & Health", value: "beauty" },
  { id: "sports", name: "Sports", value: "sports" },
];
