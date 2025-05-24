"use client"
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Home, ArrowLeft, Search, HelpCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-12">
        {/* Animated 404 */}
        <div className="relative mb-12">
          <div className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse">
            404
          </div>
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-bounce"></div>
          <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-pink-400 rounded-full animate-bounce delay-300"></div>
        </div>

        {/* Error Message */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            The page you're looking for seems to have wandered off into the
            digital void.
          </p>
          <p className="text-gray-500">
            It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Illustration */}
        <div className="mb-12">
          <div className="relative w-64 h-48 mx-auto">
            {/* Simple illustration using CSS */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl opacity-50"></div>
            <div className="absolute top-8 left-8 w-16 h-16 bg-blue-300 rounded-full opacity-70 animate-float"></div>
            <div className="absolute top-16 right-12 w-12 h-12 bg-purple-300 rounded-full opacity-60 animate-float delay-500"></div>
            <div className="absolute bottom-12 left-16 w-8 h-8 bg-pink-300 rounded-full opacity-80 animate-float delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Link
            href="/"
            className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Home className="w-5 h-5 group-hover:animate-bounce" />
            <span className="font-semibold">Return Home</span>
          </Link>

          <Link
            href="javascript:history.back()"
            className="group flex items-center gap-2 px-8 py-4 bg-white text-gray-700 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:text-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            <ArrowLeft className="w-5 h-5 group-hover:animate-pulse" />
            <span className="font-semibold">Go Back</span>
          </Link>
        </div>

        {/* Help Links */}
        <div className="text-center">
          <p className="text-gray-500 mb-4 flex items-center justify-center gap-2">
            <HelpCircle className="w-4 h-4" />
            Need help? Try these popular pages:
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link
              href="/about"
              className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/services"
              className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              Services
            </Link>
            <Link
              href="/contact"
              className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/blog"
              className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              Blog
            </Link>
          </div>
        </div>
      </div>

      <Footer />

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
