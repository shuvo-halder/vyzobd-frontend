"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProfileForm from "@/components/shared/ProfileForm";
import { userService } from "@/services/user.service";
import { FiUser, FiKey, FiLock, FiCheck, FiLoader } from "react-icons/fi";

export default function CustomerProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Password Change Form State
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordLoading, setPasswordLoading] = useState(false);

  const fetchProfile = async () => {
    try {
      const { data } = await userService.getProfile();
      setProfile(data.user);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handlePasswordChange = (e) => {
    setPasswordData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setPasswordLoading(true);

    try {
      await userService.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      toast.success("Password changed successfully");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password");
    } finally {
      setPasswordLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-48 bg-primary/10 rounded" />
        <div className="h-64 bg-white rounded-xl border border-primary/10" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Page Header */}
      <div>
        <span className="inline-block text-accent text-xs font-bold uppercase tracking-[0.2em] mb-1">
          Account Portal
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">
          Profile & Security
        </h1>
        <p className="text-xs sm:text-sm text-primary/60 mt-1">
          Manage your personal details and account security credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Personal Details Form */}
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-primary/10 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-primary/10 pb-4">
            <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
              <FiUser className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-primary">Personal Details</h2>
              <p className="text-xs text-primary/60">Update name and contact phone</p>
            </div>
          </div>

          {profile && <ProfileForm profile={profile} setProfile={setProfile} />}
        </div>

        {/* Change Password Form */}
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-primary/10 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-primary/10 pb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <FiKey className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-primary">Change Password</h2>
              <p className="text-xs text-primary/60">Update security authentication password</p>
            </div>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-5">
            {/* Current Password */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest font-semibold text-primary/70 ml-1">
                Current Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 w-4 h-4" />
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
                  placeholder="••••••••"
                  className="w-full border border-primary/20 bg-transparent py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-primary/30"
                />
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest font-semibold text-primary/70 ml-1">
                New Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 w-4 h-4" />
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  required
                  placeholder="••••••••"
                  className="w-full border border-primary/20 bg-transparent py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-primary/30"
                />
              </div>
            </div>

            {/* Confirm New Password */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest font-semibold text-primary/70 ml-1">
                Confirm New Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 w-4 h-4" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                  placeholder="••••••••"
                  className="w-full border border-primary/20 bg-transparent py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-primary/30"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={passwordLoading}
              className="w-full bg-primary font-semibold text-white text-xs uppercase tracking-widest py-4 mt-2 hover:bg-accent transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-md"
            >
              {passwordLoading ? (
                <>
                  <FiLoader className="w-4 h-4 animate-spin" />
                  Updating Password...
                </>
              ) : (
                <>
                  Update Password
                  <FiCheck className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
