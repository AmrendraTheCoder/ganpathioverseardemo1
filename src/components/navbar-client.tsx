"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import {
  User,
  UserCircle,
  Phone,
  Menu,
  X,
  ChevronDown,
  Mail,
  MapPin,
  Search,
  Bell,
  Settings,
  LogOut,
  MessageSquare,
} from "lucide-react";
import UserProfile from "./user-profile";
import MobileNav from "./mobile-nav";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

export default function NavbarClient({ user }: { user: any }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications] = useState(3); // Mock notification count
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      setShowSearch(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-blue-900 text-white py-2 text-sm hidden lg:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              <a href="tel:+911234567890" className="hover:text-blue-200">
                +91 123 456 7890
              </a>
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              <a
                href="mailto:info@ganpathioverseas.com"
                className="hover:text-blue-200"
              >
                info@ganpathioverseas.com
              </a>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              <span>Lucknow, Uttar Pradesh</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span>Follow us:</span>
            <div className="flex space-x-2">
              <a href="#" className="hover:text-blue-200">
                FB
              </a>
              <a href="#" className="hover:text-blue-200">
                IG
              </a>
              <a href="#" className="hover:text-blue-200">
                LI
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200"
            : "bg-white/90 backdrop-blur-sm"
        } ${pathname.startsWith("/blog/") ? "lg:top-0" : "lg:top-10"}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" prefetch className="flex items-center">
              <span className="text-2xl font-bold">
                <span className="text-blue-900">Ganpathi</span>{" "}
                <span className="text-yellow-500">Overseas</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-8 items-center">
              <Link
                href="/"
                className={`font-medium transition-colors px-3 py-2 rounded-lg ${
                  pathname === "/"
                    ? "text-blue-900 bg-blue-50"
                    : "text-gray-700 hover:text-blue-900 hover:bg-blue-50"
                }`}
              >
                Home
              </Link>

              {/* Services Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={`flex items-center space-x-1 font-medium transition-colors ${
                      pathname === "/services" ||
                      pathname.startsWith("/services")
                        ? "text-blue-900 bg-blue-50"
                        : "text-gray-700 hover:text-blue-900 hover:bg-blue-50"
                    }`}
                  >
                    <span>Services</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href="/services#offset" className="w-full">
                      Offset Printing
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/services#uv" className="w-full">
                      UV Printing
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/services#digital" className="w-full">
                      Digital Printing
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/services#large-format" className="w-full">
                      Large Format
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/services#book-publishing" className="w-full">
                      Book Publishing
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/services#packaging" className="w-full">
                      Packaging Solutions
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link
                href="/about"
                className={`font-medium transition-colors px-3 py-2 rounded-lg ${
                  pathname === "/about"
                    ? "text-blue-900 bg-blue-50"
                    : "text-gray-700 hover:text-blue-900 hover:bg-blue-50"
                }`}
              >
                About
              </Link>
              <Link
                href="/blog"
                className={`font-medium transition-colors px-3 py-2 rounded-lg ${
                  pathname === "/blog" || pathname.startsWith("/blog")
                    ? "text-blue-900 bg-blue-50"
                    : "text-gray-700 hover:text-blue-900 hover:bg-blue-50"
                }`}
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className={`font-medium transition-colors px-3 py-2 rounded-lg ${
                  pathname === "/contact"
                    ? "text-blue-900 bg-blue-50"
                    : "text-gray-700 hover:text-blue-900 hover:bg-blue-50"
                }`}
              >
                Contact
              </Link>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              {/* Search Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSearch(!showSearch)}
                className="hidden sm:flex"
              >
                <Search className="w-5 h-5" />
              </Button>

              {/* Quick Contact */}
              <div className="hidden lg:flex items-center space-x-2 px-3 py-2 bg-blue-50 rounded-lg">
                <Phone className="w-4 h-4 text-blue-600" />
                <a
                  href="tel:+911234567890"
                  className="text-sm font-medium text-blue-900 hover:text-blue-700"
                >
                  Quick Call
                </a>
              </div>

              {/* User Section */}
              {user ? (
                <div className="flex items-center space-x-3">
                  {/* Notifications */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="relative">
                        <Bell className="w-5 h-5" />
                        {notifications > 0 && (
                          <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs bg-red-500">
                            {notifications}
                          </Badge>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                      <div className="p-4 border-b">
                        <h4 className="font-semibold">Notifications</h4>
                      </div>
                      <div className="p-2">
                        <div className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                          <div className="flex items-start space-x-3">
                            <MessageSquare className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium">
                                New inquiry received
                              </p>
                              <p className="text-xs text-gray-500">
                                2 minutes ago
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-2 border-t">
                        <Button variant="ghost" className="w-full text-sm">
                          View all notifications
                        </Button>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* User Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="flex items-center space-x-2"
                      >
                        <UserCircle className="w-6 h-6" />
                        <span className="hidden md:inline text-sm font-medium">
                          {user.email?.split("@")[0] || "User"}
                        </span>
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <div className="p-2 border-b">
                        <p className="text-sm font-medium">{user.email}</p>
                        <p className="text-xs text-gray-500">Administrator</p>
                      </div>
                      <DropdownMenuItem asChild>
                        <Link
                          href="/dashboard"
                          className="flex items-center w-full"
                        >
                          <Settings className="w-4 h-4 mr-2" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-3">
                  <Link
                    href="/sign-in"
                    className="text-sm font-medium text-gray-700 hover:text-blue-900 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link href="/sign-up">
                    <Button className="bg-blue-900 hover:bg-blue-800 text-sm">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <div className="md:hidden">
                <MobileNav user={user} />
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="border-t border-gray-200 bg-white/95 backdrop-blur-xl">
            <div className="container mx-auto px-4 py-4">
              <form
                onSubmit={handleSearch}
                className="flex items-center space-x-4"
              >
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search articles, services, or topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full"
                    autoFocus
                  />
                </div>
                <Button type="submit" className="bg-blue-900 hover:bg-blue-800">
                  Search
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowSearch(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer */}
      <div
        className={`${pathname.startsWith("/blog/") ? "h-16" : "h-26 lg:h-36"}`}
      />
    </>
  );
}
