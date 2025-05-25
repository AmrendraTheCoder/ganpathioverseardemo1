"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Correct import for App Router
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Shield, Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // Ensure component is mounted before accessing localStorage
  useEffect(() => {
    setMounted(true);

    // Check if already logged in
    if (typeof window !== "undefined") {
      const adminSession = localStorage.getItem("admin_session");
      const loginTime = localStorage.getItem("admin_login_time");

      if (adminSession === "true" && loginTime) {
        const now = Date.now();
        const sessionAge = now - parseInt(loginTime);
        const twentyFourHours = 24 * 60 * 60 * 1000;

        // If session is still valid (less than 24 hours)
        if (sessionAge < twentyFourHours) {
          router.push("/dashboard");
          return;
        } else {
          // Clear expired session
          localStorage.removeItem("admin_session");
          localStorage.removeItem("admin_login_time");
        }
      }
    }
  }, [router]);

  // Preset admin credentials
  const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "ganpathi@2024",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Simulate loading delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (
        credentials.username === ADMIN_CREDENTIALS.username &&
        credentials.password === ADMIN_CREDENTIALS.password
      ) {
        // Store session in localStorage
        if (mounted && typeof window !== "undefined") {
          localStorage.setItem("admin_session", "true");
          localStorage.setItem("admin_login_time", Date.now().toString());
          localStorage.setItem("admin_username", credentials.username);
        }

        // Set a cookie for server-side validation
        document.cookie = `admin_session=true; path=/; max-age=86400; samesite=lax`;

        // Redirect to dashboard
        router.push("/dashboard");
      } else {
        setError(
          "Invalid credentials. Please check your username and password."
        );
      }
    } catch (error) {
      setError("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange =
    (field: "username" | "password") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCredentials({ ...credentials, [field]: e.target.value });
      // Clear error when user starts typing
      if (error) setError("");
    };

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-12 pt-32">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-600">
                Enter your credentials to access the control panel
              </p>
            </div>

            {/* Error Alert */}
            {error && (
              <Alert className="mb-6 border-red-200 bg-red-50 animate-in slide-in-from-top-2">
                <AlertDescription className="text-red-700 text-sm">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className="text-sm font-medium text-gray-700"
                >
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={credentials.username}
                  onChange={handleInputChange("username")}
                  placeholder="Enter your username"
                  required
                  disabled={loading}
                  className="h-12 px-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={credentials.password}
                    onChange={handleInputChange("password")}
                    placeholder="Enter your password"
                    required
                    disabled={loading}
                    className="h-12 px-4 pr-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-gray-500" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-500" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={
                  loading || !credentials.username || !credentials.password
                }
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5 mr-2" />
                    Access Dashboard
                  </>
                )}
              </Button>
            </form>

            {/* Security Notice */}
            <div className="mt-6 p-3 bg-gray-50 rounded-lg border">
              <p className="text-xs text-gray-600 text-center">
                🔒 Your session will automatically expire after 24 hours for
                security
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
