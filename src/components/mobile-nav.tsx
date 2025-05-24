"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileNavProps {
  user?: any;
}

export default function MobileNav({ user }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        className="md:hidden text-gray-700 p-2"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu-backdrop" onClick={toggleMenu} />
          <div
            className={`mobile-menu-panel ${isOpen ? "mobile-menu-open" : "mobile-menu-closed"}`}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <span className="text-lg font-bold text-blue-900">Menu</span>
              <button onClick={toggleMenu}>
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="p-4 space-y-4">
              <Link
                href="/"
                className="block py-2 text-gray-700 hover:text-blue-900 transition-colors"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                href="/services"
                className="block py-2 text-gray-700 hover:text-blue-900 transition-colors"
                onClick={toggleMenu}
              >
                Services
              </Link>
              <Link
                href="/about"
                className="block py-2 text-gray-700 hover:text-blue-900 transition-colors"
                onClick={toggleMenu}
              >
                About
              </Link>
              <Link
                href="/blog"
                className="block py-2 text-gray-700 hover:text-blue-900 transition-colors"
                onClick={toggleMenu}
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="block py-2 text-gray-700 hover:text-blue-900 transition-colors"
                onClick={toggleMenu}
              >
                Contact
              </Link>

              <div className="pt-4 border-t">
                <div className="flex items-center gap-2 text-blue-900 mb-4">
                  <Phone className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">+91 965 191 1111</span>
                </div>

                {user ? (
                  <Link href="/dashboard" onClick={toggleMenu}>
                    <Button className="w-full bg-blue-900 hover:bg-blue-800">
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <div className="space-y-2">
                    <Link href="/sign-in" onClick={toggleMenu}>
                      <Button variant="outline" className="w-full">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/sign-up" onClick={toggleMenu}>
                      <Button className="w-full bg-blue-900 hover:bg-blue-800">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
