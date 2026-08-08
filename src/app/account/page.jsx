"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiShoppingBag,
  FiUser,
  FiMapPin,
  FiClock,
  FiCheckCircle,
  FiArrowRight,
  FiTruck,
  FiShield,
} from "react-icons/fi";
import { useAuth } from "@/hooks/useAuth";
import { orderService } from "@/services/order.service";

export default function CustomerDashboardPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);

  useEffect(() => {
    async function fetchCustomerOrders() {
      try {
        const { data } = await orderService.getMyOrders();
        setOrders(data.orders || []);
      } catch (error) {
        console.error("Failed to load customer orders for dashboard:", error);
      } finally {
        setIsLoadingOrders(false);
      }
    }

    fetchCustomerOrders();
  }, []);

  // Compute real metrics from verified API data
  const totalOrders = orders.length;
  const totalSpent = orders.reduce((acc, order) => acc + (order.total || 0), 0);
  const pendingOrders = orders.filter((o) => {
    const status = (o.orderStatus || "").toLowerCase();
    return status === "pending" || status === "processing" || status === "shipped";
  }).length;
  const recentOrders = orders.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white rounded-xl border border-primary/10 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-accent/10 text-accent border border-accent/20">
            <FiShield className="w-3.5 h-3.5" />
            Verified Customer Hub
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">
            Welcome back, {user?.name || "Customer"}!
          </h1>
          <p className="text-sm text-primary/60">
            Manage your account settings, review order status, and track your shopping history.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-primary text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-lg hover:bg-accent transition-colors shadow-sm"
          >
            <FiShoppingBag className="w-4 h-4" />
            Browse Shop
          </Link>
        </div>
      </div>

      {/* Customer Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {/* Total Orders */}
        <div className="bg-white rounded-xl border border-primary/10 p-6 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-primary/5 text-primary flex items-center justify-center flex-shrink-0">
            <FiShoppingBag className="w-6 h-6 text-primary/70" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-primary/60">
              Total Orders
            </p>
            <h3 className="text-2xl font-extrabold text-primary mt-0.5">
              {isLoadingOrders ? "..." : totalOrders}
            </h3>
          </div>
        </div>

        {/* Pending Deliveries */}
        <div className="bg-white rounded-xl border border-primary/10 p-6 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0 border border-amber-200/50">
            <FiTruck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-primary/60">
              In Transit / Pending
            </p>
            <h3 className="text-2xl font-extrabold text-primary mt-0.5">
              {isLoadingOrders ? "..." : pendingOrders}
            </h3>
          </div>
        </div>

        {/* Total Lifetime Spent */}
        <div className="bg-white rounded-xl border border-primary/10 p-6 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 border border-emerald-200/50">
            <FiCheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-primary/60">
              Total Spent
            </p>
            <h3 className="text-2xl font-extrabold text-primary mt-0.5">
              {isLoadingOrders ? "..." : `৳${totalSpent.toFixed(2)}`}
            </h3>
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/account/orders"
          className="bg-white rounded-xl border border-primary/10 p-6 shadow-sm hover:border-accent/40 transition-all group flex flex-col justify-between space-y-4"
        >
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center group-hover:scale-110 transition-transform">
              <FiShoppingBag className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-primary">Order History</h3>
            <p className="text-xs text-primary/60 leading-relaxed">
              Track active shipments, download order receipts, and view detailed purchase logs.
            </p>
          </div>
          <span className="text-xs font-bold text-accent uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">
            View Orders <FiArrowRight className="w-4 h-4" />
          </span>
        </Link>

        <Link
          href="/account/profile"
          className="bg-white rounded-xl border border-primary/10 p-6 shadow-sm hover:border-accent/40 transition-all group flex flex-col justify-between space-y-4"
        >
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
              <FiUser className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-primary">Personal Details</h3>
            <p className="text-xs text-primary/60 leading-relaxed">
              Update your contact information, phone number, and account security credentials.
            </p>
          </div>
          <span className="text-xs font-bold text-accent uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">
            Edit Profile <FiArrowRight className="w-4 h-4" />
          </span>
        </Link>

        <Link
          href="/account/addresses"
          className="bg-white rounded-xl border border-primary/10 p-6 shadow-sm hover:border-accent/40 transition-all group flex flex-col justify-between space-y-4"
        >
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
              <FiMapPin className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-primary">Saved Addresses</h3>
            <p className="text-xs text-primary/60 leading-relaxed">
              Manage default shipping and billing addresses for seamless checkout.
            </p>
          </div>
          <span className="text-xs font-bold text-accent uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">
            Manage Addresses <FiArrowRight className="w-4 h-4" />
          </span>
        </Link>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-xl border border-primary/10 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-primary/10 pb-4">
          <div>
            <h2 className="text-xl font-bold text-primary tracking-tight">Recent Activity</h2>
            <p className="text-xs text-primary/60 mt-0.5">Your most recent purchases</p>
          </div>
          <Link
            href="/account/orders"
            className="text-xs font-bold text-accent uppercase tracking-wider hover:underline flex items-center gap-1"
          >
            View All <FiArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {isLoadingOrders ? (
          <div className="space-y-3">
            {[1, 2].map((n) => (
              <div key={n} className="h-16 bg-secondary/50 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : recentOrders.length === 0 ? (
          <div className="text-center py-8 bg-secondary/20 rounded-lg border border-dashed border-primary/20">
            <FiClock className="w-8 h-8 text-primary/40 mx-auto mb-2" />
            <p className="text-sm font-semibold text-primary/70">No recent orders found</p>
            <p className="text-xs text-primary/50 mt-1 mb-4">When you place orders, they will appear here.</p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-accent text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-md hover:bg-primary transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order._id}
                className="p-4 rounded-lg border border-primary/10 bg-secondary/10 flex flex-wrap items-center justify-between gap-4 hover:border-primary/20 transition-colors"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="relative w-12 h-12 bg-white rounded border border-primary/10 flex-shrink-0 overflow-hidden flex items-center justify-center">
                    {order.items?.[0]?.image || order.items?.[0]?.product?.images?.[0] ? (
                      <Image
                        src={order.items[0].image || order.items[0].product.images[0]}
                        alt="Order item"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <FiShoppingBag className="w-5 h-5 text-primary/40" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-mono font-bold text-primary truncate">#{order._id}</p>
                    <p className="text-xs text-primary/60 mt-0.5">
                      {new Date(order.createdAt).toLocaleDateString()} • {order.items?.length || 0} item(s)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-primary">৳{order.total?.toFixed(2)}</span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/5 text-primary border border-primary/10">
                    {order.orderStatus || "Processing"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
