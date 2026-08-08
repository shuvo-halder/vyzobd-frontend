"use client";

import React from "react";
import Link from "next/link";
import { FiMapPin, FiPlus, FiCheck } from "react-icons/fi";
import { useAuth } from "@/hooks/useAuth";

export default function CustomerAddressesPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <span className="inline-block text-accent text-xs font-bold uppercase tracking-[0.2em] mb-1">
          Account Portal
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">
          Address Book
        </h1>
        <p className="text-xs sm:text-sm text-primary/60 mt-1">
          Manage your saved shipping and billing addresses for fast checkout.
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-amber-900 text-xs flex items-center justify-between gap-4">
        <div>
          <span className="font-bold">Backend API Note: </span>
          Multiple shipping address management will be active as soon as backend address book endpoints are enabled. Currently using default profile contact information.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Default Shipping Address Card */}
        <div className="bg-white p-6 rounded-xl border-2 border-primary/20 shadow-sm relative space-y-4">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-primary text-white">
              <FiCheck className="w-3.5 h-3.5" />
              Primary Address
            </span>
            <FiMapPin className="w-5 h-5 text-accent" />
          </div>

          <div className="space-y-1 text-xs text-primary/80 leading-relaxed">
            <p className="font-bold text-sm text-primary">{user?.name || "Customer"}</p>
            <p>{user?.email || "No email"}</p>
            <p>Phone: {user?.phone || "Not provided"}</p>
            <p className="pt-2 text-primary/60 italic">Default Shipping Address configured during checkout</p>
          </div>
        </div>

        {/* Add New Address Action Card */}
        <div className="bg-secondary/30 p-6 rounded-xl border border-dashed border-primary/20 flex flex-col items-center justify-center text-center space-y-3 min-h-[200px]">
          <div className="w-12 h-12 rounded-full bg-white border border-primary/10 flex items-center justify-center text-primary/50">
            <FiPlus className="w-6 h-6" />
          </div>
          <p className="text-xs font-bold text-primary">Add Secondary Address</p>
          <p className="text-[11px] text-primary/60 max-w-xs">
            Save work or secondary addresses for quick order delivery.
          </p>
          <button
            type="button"
            disabled
            className="text-xs font-bold uppercase tracking-wider text-primary/40 bg-white border border-primary/10 px-4 py-2 rounded-md cursor-not-allowed opacity-60"
          >
            Pending API Endpoint
          </button>
        </div>
      </div>
    </div>
  );
}
