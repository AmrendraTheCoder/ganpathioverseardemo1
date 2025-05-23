"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const adminSession = localStorage.getItem("admin_session");
      const loginTime = localStorage.getItem("admin_login_time");

      if (adminSession && loginTime) {
        // Check if session is still valid (24 hours)
        const now = Date.now();
        const sessionAge = now - parseInt(loginTime);
        const maxAge = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

        if (sessionAge < maxAge) {
          setIsAuthenticated(true);
        } else {
          // Session expired
          localStorage.removeItem("admin_session");
          localStorage.removeItem("admin_login_time");
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push("/admin");
    }
  }, [isAuthenticated, router]);

  // Loading state
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center animate-pulse">
            <span className="text-white font-bold text-2xl">G</span>
          </div>
          <div className="flex items-center space-x-2">
            <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
            <p className="text-gray-600 font-medium">
              Checking authentication...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Not authenticated - will redirect
  if (isAuthenticated === false) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Access Restricted
          </h2>
          <p className="text-gray-600 mb-6">
            Please sign in to access the admin dashboard.
          </p>
          <button
            onClick={() => router.push("/admin")}
            className="inline-flex items-center px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Authenticated - render dashboard
  return <div className="min-h-screen bg-gray-50">{children}</div>;
}
