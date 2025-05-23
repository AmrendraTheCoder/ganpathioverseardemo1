"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;

      setIsScrolled(scrollTop > 50);
      setScrollProgress(scrollPercent * 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Top Bar - Slides away on scroll */}
      <div
        className={`bg-gradient-to-r from-blue-900 to-blue-800 text-white py-3 text-sm transition-all duration-300 ${isScrolled ? "h-0 py-0 overflow-hidden" : "h-auto"} hidden md:block`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              <span>+91 123 456 7890</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              <span>info@ganpathioverseas.com</span>
            </div>
          </div>
          <div className="text-blue-200">
            Mon - Fri: 9AM - 6PM | Sat: 10AM - 4PM
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Main Navbar */}
      <nav
        className={`sticky top-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100"
            : "bg-white/90 backdrop-blur-sm shadow-sm"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16 md:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div
                className={`transition-all duration-300 ${isScrolled ? "w-10 h-10" : "w-12 h-12"} bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center group-hover:scale-105 shadow-md`}
              >
                <span className="text-white font-bold text-xl">G</span>
              </div>
              <div className="hidden sm:block">
                <h1
                  className={`transition-all duration-300 ${isScrolled ? "text-lg" : "text-xl"} font-bold text-gray-900 group-hover:text-blue-600`}
                >
                  Ganpathi Overseas
                </h1>
                <p className="text-xs text-gray-500 -mt-1">
                  Printing Excellence
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 group ${
                    isActiveLink(item.href)
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute bottom-0 left-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-8 group-hover:left-1/2 group-hover:-translate-x-1/2 transition-all duration-300 ${
                      isActiveLink(item.href) ? "w-8 -translate-x-1/2" : ""
                    }`}
                  ></span>
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <Button
                asChild
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                <Link href="/quote">Get Quote</Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="border border-blue-200 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium transition-all duration-200"
              >
                <Link href="/admin">Admin</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "max-h-screen opacity-100 visible"
              : "max-h-0 opacity-0 invisible overflow-hidden"
          }`}
        >
          <div className="bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-lg">
            <div className="container mx-auto px-4 py-6">
              <div className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium ${
                      isActiveLink(item.href) ? "text-blue-600 bg-blue-50" : ""
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white justify-center"
                  >
                    <Link href="/quote" onClick={() => setIsMenuOpen(false)}>
                      Get Quote
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-blue-200 text-blue-600 justify-center"
                  >
                    <Link href="/admin" onClick={() => setIsMenuOpen(false)}>
                      Admin Access
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
