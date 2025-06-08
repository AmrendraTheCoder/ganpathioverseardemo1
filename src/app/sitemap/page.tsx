"use client";

import Link from "next/link";
import {
  MapPin,
  FileText,
  Users,
  Phone,
  Mail,
  Globe,
  ExternalLink,
} from "lucide-react";

export default function Sitemap() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Sitemap</h1>
            <p className="text-xl text-blue-200 mb-6">
              Complete navigation guide to all pages on our website
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Main Pages */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center text-blue-600">
                <Globe className="w-5 h-5 mr-2" />
                Main Pages
              </h2>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/"
                    className="text-gray-700 hover:text-blue-600 transition-colors flex items-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-gray-700 hover:text-blue-600 transition-colors flex items-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-gray-700 hover:text-blue-600 transition-colors flex items-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Our Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-700 hover:text-blue-600 transition-colors flex items-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/quote"
                    className="text-gray-700 hover:text-blue-600 transition-colors flex items-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Get Quote
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center text-blue-600">
                <FileText className="w-5 h-5 mr-2" />
                Services
              </h2>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/services/offset-printing"
                    className="text-gray-700 hover:text-blue-600 transition-colors flex items-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Offset Printing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/digital-printing"
                    className="text-gray-700 hover:text-blue-600 transition-colors flex items-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Digital Printing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/uv-printing"
                    className="text-gray-700 hover:text-blue-600 transition-colors flex items-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    UV Printing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/large-format"
                    className="text-gray-700 hover:text-blue-600 transition-colors flex items-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Large Format Printing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/packaging"
                    className="text-gray-700 hover:text-blue-600 transition-colors flex items-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Packaging Solutions
                  </Link>
                </li>
              </ul>
            </div>

            {/* Blog & Resources */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center text-blue-600">
                <Users className="w-5 h-5 mr-2" />
                Blog & Resources
              </h2>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/blog"
                    className="text-gray-700 hover:text-blue-600 transition-colors flex items-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Blog Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/printing-techniques"
                    className="text-gray-700 hover:text-blue-600 transition-colors flex items-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Printing Techniques
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/design-tips"
                    className="text-gray-700 hover:text-blue-600 transition-colors flex items-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Design Tips
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/industry-news"
                    className="text-gray-700 hover:text-blue-600 transition-colors flex items-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Industry News
                  </Link>
                </li>
              </ul>
            </div>

            {/* Account & Authentication */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center text-blue-600">
                <Users className="w-5 h-5 mr-2" />
                Account
              </h2>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/sign-in"
                    className="text-gray-700 hover:text-blue-600 transition-colors flex items-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sign-up"
                    className="text-gray-700 hover:text-blue-600 transition-colors flex items-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard"
                    className="text-gray-700 hover:text-blue-600 transition-colors flex items-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/forgot-password"
                    className="text-gray-700 hover:text-blue-600 transition-colors flex items-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Forgot Password
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal & Support */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center text-blue-600">
                <FileText className="w-5 h-5 mr-2" />
                Legal & Support
              </h2>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-700 hover:text-blue-600 transition-colors flex items-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-gray-700 hover:text-blue-600 transition-colors flex items-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sitemap"
                    className="text-gray-700 hover:text-blue-600 transition-colors flex items-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Sitemap
                  </Link>
                </li>
                <li>
                  <Link
                    href="/coming-soon"
                    className="text-gray-700 hover:text-blue-600 transition-colors flex items-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Coming Soon
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center text-blue-600">
                <Phone className="w-5 h-5 mr-2" />
                Contact Info
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-blue-600 mt-1" />
                  <div>
                    <p className="text-gray-700 text-sm">
                      9 Lakshampuri, Indira Nagar
                      <br />
                      Near Boothnath Metro Station
                      <br />
                      Lucknow, UP 226016
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <a
                    href="tel:+919651911111"
                    className="text-gray-700 hover:text-blue-600 transition-colors text-sm"
                  >
                    +91 965 191 1111
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <a
                    href="mailto:info@ganpathioverseas.com"
                    className="text-gray-700 hover:text-blue-600 transition-colors text-sm"
                  >
                    info@ganpathioverseas.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              Need Help Finding Something?
            </h3>
            <p className="text-blue-800 mb-4">
              Can't find what you're looking for? Our team is here to help you
              navigate our services and find the perfect printing solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center"
              >
                Contact Us
              </Link>
              <a
                href="tel:+919651911111"
                className="bg-white text-blue-600 border border-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors text-center"
              >
                Call Now
              </a>
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
