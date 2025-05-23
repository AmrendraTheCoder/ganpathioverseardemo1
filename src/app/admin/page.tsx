"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Changed from next/navigation for pages router
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Shield } from "lucide-react";

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // Ensure component is mounted before accessing localStorage
  useEffect(() => {
    setMounted(true);
  }, []);

  // Preset admin credentials
  const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "ganpathi@2024",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (
      credentials.username === ADMIN_CREDENTIALS.username &&
      credentials.password === ADMIN_CREDENTIALS.password
    ) {
      // Only access localStorage if component is mounted
      if (mounted && typeof window !== "undefined") {
        localStorage.setItem("admin_session", "true");
        localStorage.setItem("admin_login_time", Date.now().toString());
      }

      // Set a cookie for server-side validation
      document.cookie = `admin_session=true; path=/; max-age=86400; samesite=lax`;

      // Redirect to dashboard
      router.push("/dashboard");
    } else {
      setError("Invalid credentials. Please check your username and password.");
    }

    setLoading(false);
  };

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Admin Access
              </h1>
              <p className="text-gray-600">
                Enter your credentials to access the dashboard
              </p>
            </div>

            {error && (
              <Alert className="mb-6 border-red-200 bg-red-50">
                <AlertDescription className="text-red-700">
                  {error}
                </AlertDescription>
              </Alert>
            )}

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
                  onChange={(e) =>
                    setCredentials({ ...credentials, username: e.target.value })
                  }
                  placeholder="Enter username"
                  required
                  className="h-12 px-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  placeholder="Enter password"
                  required
                  className="h-12 px-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <h3 className="font-medium text-blue-900 mb-2">
                Demo Credentials:
              </h3>
              <p className="text-sm text-blue-700">
                <strong>Username:</strong> admin
                <br />
                <strong>Password:</strong> ganpathi@2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
