"use client";

import Link from "next/link";
import { Calendar, Scale, AlertTriangle } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Terms of Service
            </h1>
            <p className="text-xl text-blue-200 mb-6">
              Legal terms and conditions governing the use of our printing
              services
            </p>
            <div className="flex items-center justify-center space-x-2 text-blue-200">
              <Calendar className="w-5 h-5" />
              <span>Last updated: January 15, 2025</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="flex items-start space-x-4 mb-6">
              <Scale className="w-8 h-8 text-blue-600 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Welcome to Ganpathi Overseas. These Terms of Service govern
                  your use of our printing services, website, and any related
                  services provided by Ganpathi Overseas.
                </p>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                  <div className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-1 mr-2" />
                    <p className="text-yellow-800 font-medium">
                      These Terms constitute a legally binding agreement between
                      you and Ganpathi Overseas. Please read them carefully.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
