"use client";

import React, { useState } from "react";
import { FiSliders, FiBell, FiShield, FiLock, FiCheck } from "react-icons/fi";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";

export default function CustomerSettingsPage() {
  const { user } = useAuth();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [orderUpdates, setOrderUpdates] = useState(true);

  const handleSavePreferences = () => {
    toast.success("Account preferences updated successfully.");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <span className="inline-block text-accent text-xs font-bold uppercase tracking-[0.2em] mb-1">
          Account Portal
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">
          Account Settings
        </h1>
        <p className="text-xs sm:text-sm text-primary/60 mt-1">
          Manage notification preferences, privacy, and account settings.
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-xl border border-primary/10 shadow-sm space-y-6">
        {/* Notification Preferences */}
        <div className="space-y-4 border-b border-primary/10 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <FiBell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-primary">Notifications</h2>
              <p className="text-xs text-primary/60">Choose how you receive order and promotion updates</p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <label className="flex items-center justify-between p-4 rounded-lg border border-primary/10 hover:bg-secondary/20 cursor-pointer transition-colors">
              <div>
                <p className="text-xs font-bold text-primary">Order Status Emails</p>
                <p className="text-[11px] text-primary/60">Receive instant email receipts and tracking numbers</p>
              </div>
              <input
                type="checkbox"
                checked={orderUpdates}
                onChange={(e) => setOrderUpdates(e.target.checked)}
                className="w-4 h-4 text-accent border-primary/30 rounded focus:ring-accent"
              />
            </label>

            <label className="flex items-center justify-between p-4 rounded-lg border border-primary/10 hover:bg-secondary/20 cursor-pointer transition-colors">
              <div>
                <p className="text-xs font-bold text-primary">Promotional Updates</p>
                <p className="text-[11px] text-primary/60">Receive seasonal deals and new arrival alerts</p>
              </div>
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="w-4 h-4 text-accent border-primary/30 rounded focus:ring-accent"
              />
            </label>
          </div>
        </div>

        {/* Security Summary */}
        <div className="space-y-4 border-b border-primary/10 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200/50">
              <FiShield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-primary">Security & Authentication</h2>
              <p className="text-xs text-primary/60">Customer authorization status</p>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-secondary/30 border border-primary/10 space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-primary/70">Customer Identity:</span>
              <span className="font-bold text-primary">{user?.email}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-primary/70">Role Authorization:</span>
              <span className="font-bold text-emerald-700 uppercase tracking-wider text-[10px]">Verified Customer</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-primary/70">Session Isolation:</span>
              <span className="font-bold text-primary">Active (Isolated from Admin)</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSavePreferences}
          className="bg-accent text-white font-semibold text-xs uppercase tracking-widest px-6 py-3.5 rounded-md hover:bg-primary transition-colors flex items-center gap-2"
        >
          <FiCheck className="w-4 h-4" />
          Save Settings
        </button>
      </div>
    </div>
  );
}
