import Link from "next/link";
import { createClient } from "../../supabase/server";
import { Button } from "./ui/button";
import { User, UserCircle, Phone, Menu } from "lucide-react";
import UserProfile from "./user-profile";
import MobileNav from "./mobile-nav";
import Image from "next/image";

export default async function Navbar() {
  const supabase = createClient();

  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  return (
    <nav className="w-full border-b border-gray-200 bg-white py-4 fixed top-0 left-0 right-0 z-50 shadow-sm navbar-blur">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" prefetch className="flex items-center">
          <span className="text-2xl font-bold text-blue-900">
            Ganpathi <span className="text-yellow-500">Overseas</span>
          </span>
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          <Link
            href="/"
            className="font-medium text-gray-700 hover:text-blue-900 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/services"
            className="font-medium text-gray-700 hover:text-blue-900 transition-colors"
          >
            Services
          </Link>
          <Link
            href="/about"
            className="font-medium text-gray-700 hover:text-blue-900 transition-colors"
          >
            About
          </Link>
          <Link
            href="/blog"
            className="font-medium text-gray-700 hover:text-blue-900 transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className="font-medium text-gray-700 hover:text-blue-900 transition-colors"
          >
            Contact
          </Link>
        </div>

        <div className="flex gap-4 items-center">
          <div className="hidden lg:flex items-center gap-2 text-blue-900 mr-4">
            <Phone className="h-5 w-5 text-yellow-500" />
            <a
              href="tel:+911234567890"
              className="font-medium hover:text-blue-700 transition-colors"
            >
              +91 123 456 7890
            </a>
          </div>

          <div className="hidden md:flex gap-4 items-center">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="px-4 py-2 text-sm font-medium"
                >
                  <Button className="bg-blue-900 hover:bg-blue-800">
                    Dashboard
                  </Button>
                </Link>
                <UserProfile />
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-900 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-900 rounded-md hover:bg-blue-800 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <MobileNav user={user} />
        </div>
      </div>
    </nav>
  );
}
