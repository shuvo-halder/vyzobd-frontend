"use client";

import CustomerSidebar from "@/components/shared/CustomerSidebar";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FiLoader } from "react-icons/fi";

export default function AccountLayout({ children }) {
  const { loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary flex flex-col items-center justify-center p-6 text-primary">
        <div className="flex items-center gap-3 bg-white p-6 rounded-xl border border-primary/10 shadow-sm">
          <FiLoader className="w-6 h-6 animate-spin text-accent" />
          <div>
            <h3 className="text-sm font-bold tracking-tight">Verifying Customer Session</h3>
            <p className="text-xs text-primary/60">Loading your account portal...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-secondary text-primary">
      {/* Customer Panel Navigation Sidebar */}
      <CustomerSidebar />

      {/* Main Content Area (Offset for Desktop Sidebar) */}
      <main className="lg:pl-64 transition-all duration-300 min-h-screen">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-10 pt-20 lg:pt-10">
          {children}
        </div>
      </main>
    </div>
  );
}
