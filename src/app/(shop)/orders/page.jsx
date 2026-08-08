"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MyOrdersPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/account/orders");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-10 bg-secondary text-primary">
      <p className="text-sm font-semibold">Redirecting to Customer Orders Portal...</p>
    </div>
  );
}
