"use client";

import { Component, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home, Bug, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  isAnimating: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, isAnimating: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, isAnimating: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  handleRefresh = () => {
    this.setState({ isAnimating: true });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            {/* Floating Orbs */}
            <div
              className="absolute top-20 left-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-bounce"
              style={{ animationDelay: "0s", animationDuration: "3s" }}
            ></div>
            <div
              className="absolute top-40 right-32 w-24 h-24 bg-pink-500/20 rounded-full blur-xl animate-bounce"
              style={{ animationDelay: "1s", animationDuration: "4s" }}
            ></div>
            <div
              className="absolute bottom-32 left-1/3 w-40 h-40 bg-blue-500/20 rounded-full blur-xl animate-bounce"
              style={{ animationDelay: "2s", animationDuration: "5s" }}
            ></div>
            <div
              className="absolute bottom-20 right-20 w-28 h-28 bg-cyan-500/20 rounded-full blur-xl animate-bounce"
              style={{ animationDelay: "0.5s", animationDuration: "3.5s" }}
            ></div>

            {/* Floating Icons */}
            <div
              className="absolute top-1/4 left-1/4 animate-spin"
              style={{ animationDuration: "10s" }}
            >
              <Bug className="w-8 h-8 text-red-400/30" />
            </div>
            <div className="absolute top-1/3 right-1/4 animate-pulse">
              <Zap className="w-6 h-6 text-yellow-400/30" />
            </div>

            {/* Glitch Effect Lines */}
            <div className="absolute inset-0 opacity-20">
              <div className="h-px bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse absolute top-1/4 w-full"></div>
              <div
                className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse absolute top-1/2 w-full"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse absolute top-3/4 w-full"
                style={{ animationDelay: "2s" }}
              ></div>
            </div>

            {/* Particle Effect */}
            <div className="absolute inset-0">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white/30 rounded-full animate-ping"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${2 + Math.random() * 3}s`,
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
            <div
              className={`max-w-lg w-full transform transition-all duration-1000 ${
                this.state.isAnimating
                  ? "scale-110 rotate-2"
                  : "scale-100 rotate-0"
              }`}
            >
              {/* Error Card */}
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 text-center overflow-hidden">
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>

                {/* Glowing Border */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 animate-pulse"></div>
                <div className="absolute inset-[1px] rounded-3xl bg-white/10 backdrop-blur-xl"></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Animated Icon */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping"></div>
                    <div className="relative bg-gradient-to-r from-red-500 to-pink-500 p-4 rounded-full mx-auto w-fit animate-bounce">
                      <AlertTriangle className="h-12 w-12 text-white animate-pulse" />
                    </div>
                  </div>

                  {/* Title with Gradient */}
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-pink-200 to-purple-200 bg-clip-text text-transparent mb-4 animate-pulse">
                    Oops! Something Went Wrong
                  </h2>

                  {/* Subtitle */}
                  <p className="text-white/80 mb-8 text-lg leading-relaxed">
                    Don't worry! Even the best systems have hiccups.
                    <br />
                    <span className="text-pink-300 animate-pulse">
                      ✨ Let's get you back on track! ✨
                    </span>
                  </p>

                  {/* Error Details (if available) */}
                  {this.state.error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                      <p className="text-red-300 text-sm font-mono break-all">
                        {this.state.error.message}
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={this.handleRefresh}
                      disabled={this.state.isAnimating}
                      className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 rounded-xl px-8 py-3 font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25"
                    >
                      <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                      <div className="relative flex items-center space-x-2">
                        <RefreshCw
                          className={`w-5 h-5 ${this.state.isAnimating ? "animate-spin" : ""}`}
                        />
                        <span>
                          {this.state.isAnimating
                            ? "Refreshing..."
                            : "Try Again"}
                        </span>
                      </div>
                    </Button>

                    <Button
                      onClick={() => (window.location.href = "/")}
                      variant="outline"
                      className="group relative overflow-hidden bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50 rounded-xl px-8 py-3 font-semibold transform transition-all duration-300 hover:scale-105"
                    >
                      <div className="relative flex items-center space-x-2">
                        <Home className="w-5 h-5" />
                        <span>Go Home</span>
                      </div>
                    </Button>
                  </div>

                  {/* Fun Message */}
                  <p
                    className="mt-6 text-white/60 text-sm animate-bounce"
                    style={{ animationDelay: "2s" }}
                  >
                    🚀 We're working hard to fix this!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Custom Styles */}
          <style jsx>{`
            @keyframes shimmer {
              0% {
                transform: translateX(-100%);
              }
              100% {
                transform: translateX(100%);
              }
            }
            .animate-shimmer {
              animation: shimmer 3s infinite;
            }
          `}</style>
        </div>
      );
    }

    return this.props.children;
  }
}
