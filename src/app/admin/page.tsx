"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Loader2,
  Shield,
  Eye,
  EyeOff,
  Lock,
  User,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);

    if (typeof window !== "undefined") {
      const adminSession = localStorage.getItem("admin_session");
      const loginTime = localStorage.getItem("admin_login_time");

      if (adminSession === "true" && loginTime) {
        const now = Date.now();
        const sessionAge = now - parseInt(loginTime);
        const twentyFourHours = 24 * 60 * 60 * 1000;

        if (sessionAge < twentyFourHours) {
          router.push("/dashboard");
          return;
        } else {
          localStorage.removeItem("admin_session");
          localStorage.removeItem("admin_login_time");
        }
      }
    }
  }, [router]);

  const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "ganpathi@2024",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (
        credentials.username === ADMIN_CREDENTIALS.username &&
        credentials.password === ADMIN_CREDENTIALS.password
      ) {
        setLoginSuccess(true);

        if (mounted && typeof window !== "undefined") {
          localStorage.setItem("admin_session", "true");
          localStorage.setItem("admin_login_time", Date.now().toString());
          localStorage.setItem("admin_username", credentials.username);
        }

        document.cookie = `admin_session=true; path=/; max-age=86400; samesite=lax`;

        // Show success state briefly before redirect
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
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
      if (error) setError("");
    };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-white/20 border-t-white"></div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse opacity-20"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>

        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-white/20 rotate-45 animate-bounce delay-700"></div>
        <div className="absolute bottom-32 left-1/3 w-3 h-3 bg-blue-400/30 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-1/3 right-20 w-5 h-5 bg-purple-400/30 rotate-12 animate-bounce delay-300"></div>
      </div>

      <Navbar />

      <div className="flex items-center justify-center px-4 py-12 pt-32 relative z-10">
        <div className="w-full max-w-md">
          {/* Main Login Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 relative">
            {/* Glassmorphism overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>

            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="relative mx-auto mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl transform rotate-3 hover:rotate-6 transition-transform duration-300">
                    <Shield className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h1 className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  Admin Portal
                </h1>
                <p className="text-blue-100/80 text-lg">
                  Secure access to your dashboard
                </p>
              </div>

              {/* Success State */}
              {loginSuccess && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-400/30 rounded-2xl backdrop-blur-sm animate-in slide-in-from-top-2">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <p className="text-green-100 font-medium">
                      Login successful! Redirecting...
                    </p>
                  </div>
                </div>
              )}

              {/* Error Alert */}
              {error && (
                <Alert className="mb-6 bg-red-500/20 border border-red-400/30 backdrop-blur-sm animate-in slide-in-from-top-2">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <AlertDescription className="text-red-100 ml-2">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="username"
                    className="text-sm font-medium text-blue-100"
                  >
                    Username
                  </Label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300 group-focus-within:text-blue-200 transition-colors" />
                    <Input
                      id="username"
                      type="text"
                      value={credentials.username}
                      onChange={handleInputChange("username")}
                      placeholder="Enter your username"
                      required
                      disabled={loading}
                      className="h-14 pl-12 pr-4 bg-white/40 border border-white/50 text-white placeholder-white/90 rounded-xl focus:bg-white/50 focus:border-blue-400/70 focus:ring-2 focus:ring-blue-400/30 transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-blue-100"
                  >
                    Password
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300 group-focus-within:text-blue-200 transition-colors" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={credentials.password}
                      onChange={handleInputChange("password")}
                      placeholder="Enter your password"
                      required
                      disabled={loading}
                      className="h-14 pl-12 pr-14 bg-white/40 border border-white/50 text-white placeholder-white/90 rounded-xl focus:bg-white/50 focus:border-blue-400/70 focus:ring-2 focus:ring-blue-400/30 transition-all duration-200"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-white/10 text-blue-300 hover:text-blue-200"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={loading}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={
                    loading ||
                    !credentials.username ||
                    !credentials.password ||
                    loginSuccess
                  }
                  className="w-full h-14 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 hover:from-blue-600 hover:via-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {loginSuccess ? (
                    <>
                      <CheckCircle className="w-6 h-6 animate-pulse mr-3" />
                      Success! Redirecting...
                    </>
                  ) : loading ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin mr-3" />
                      Authenticating...
                    </>
                  ) : (
                    <>
                      <Shield className="w-6 h-6 mr-3" />
                      Access Dashboard
                    </>
                  )}
                </Button>
              </form>

              {/* Security Features */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-center space-x-6 text-blue-200/60 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>SSL Secured</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300"></div>
                    <span>24h Session</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-700"></div>
                    <span>Encrypted</span>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-blue-300 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-blue-100 font-medium mb-1">
                        Security Notice
                      </p>
                      <p className="text-xs text-blue-200/70 leading-relaxed">
                        Your session is protected with advanced encryption and
                        will automatically expire after 24 hours for maximum
                        security.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info Card */}
          <div className="mt-6 text-center">
            <p className="text-blue-200/60 text-sm">
              Protected by{" "}
              <span className="text-blue-300 font-medium">
                Ganpathi Overseas
              </span>{" "}
              Security
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
