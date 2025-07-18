"use client";

import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
  Send,
  Award,
  Clock,
  Users,
} from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const services = [
    { name: "Offset Printing", href: "/services#offset" },
    { name: "Digital Printing", href: "/services#digital" },
    { name: "UV Printing", href: "/services#uv" },
    { name: "Large Format", href: "/services#large-format" },
    { name: "Book Publishing", href: "/services#book" },
    { name: "Packaging", href: "/services#packaging" },
  ];

  return (
    <footer className="bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10"></div>

      {/* Main Footer Content */}
      <div className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1 space-y-6">
              <div className="flex items-center space-x-3">
                <div
                  className={`transition-all duration-300 w-16 h-16 flex items-center justify-center group-hover:scale-105`}
                >
                  <svg
                    version="1.0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="550.000000pt"
                    height="686.000000pt"
                    viewBox="0 0 550.000000 686.000000"
                    preserveAspectRatio="xMidYMid meet"
                    className={`transition-all duration-300 w-16 h-16 text-white`}
                  >
                    <g
                      transform="translate(0.000000,686.000000) scale(0.100000,-0.100000)"
                      fill="currentColor"
                      stroke="none"
                    >
                      <path
                        d="M2540 5805 c0 -18 -5 -25 -20 -25 -15 0 -20 -7 -20 -25 0 -20 -5 -25
-25 -25 -23 0 -25 -4 -25 -45 0 -41 -2 -45 -25 -45 -23 0 -25 -4 -25 -45 0
-38 -3 -45 -20 -45 -15 0 -20 -7 -20 -25 0 -18 5 -25 20 -25 15 0 20 7 20 25
0 20 5 25 25 25 23 0 25 4 25 45 0 41 2 45 25 45 20 0 25 5 25 25 0 18 5 25
20 25 13 0 20 7 20 20 0 15 7 20 25 20 20 0 25 5 25 25 0 23 4 25 45 25 41 0
45 -2 45 -25 0 -20 5 -25 25 -25 18 0 25 -5 25 -20 0 -15 7 -20 25 -20 20 0
25 -5 25 -25 0 -18 5 -25 20 -25 17 0 20 -7 20 -45 0 -41 2 -45 25 -45 23 0
25 -3 25 -50 l0 -50 -255 0 c-248 0 -255 -1 -255 -20 0 -18 -7 -20 -70 -20
-68 0 -70 -1 -70 -25 0 -23 -3 -25 -50 -25 -47 0 -50 -2 -50 -25 0 -18 -5 -25
-20 -25 -13 0 -20 -7 -20 -20 0 -15 -7 -20 -25 -20 -20 0 -25 -5 -25 -25 0
-20 -5 -25 -25 -25 -20 0 -25 -5 -25 -25 0 -18 -5 -25 -20 -25 -13 0 -20 -7
-20 -20 0 -15 -7 -20 -25 -20 -23 0 -25 -3 -25 -50 0 -47 -2 -50 -25 -50 -23
0 -25 -4 -25 -45 0 -38 -3 -45 -20 -45 -18 0 -20 -7 -20 -70 0 -63 2 -70 20
-70 15 0 20 7 20 25 0 20 5 25 25 25 18 0 25 5 25 20 0 15 7 20 25 20 20 0 25
5 25 25 0 18 5 25 20 25 15 0 20 7 20 25 0 20 5 25 25 25 18 0 25 5 25 20 0
18 7 20 70 20 68 0 70 1 70 25 0 23 4 25 45 25 41 0 45 2 45 25 0 25 0 25 95
25 88 0 95 1 95 20 0 19 7 20 235 20 228 0 235 -1 235 -20 0 -19 7 -20 90 -20
89 0 90 0 90 -25 0 -23 3 -25 50 -25 47 0 50 -2 50 -25 0 -18 5 -25 20 -25 13
0 20 -7 20 -20 0 -15 7 -20 25 -20 20 0 25 -5 25 -25 0 -20 5 -25 25 -25 20 0
25 -5 25 -25 0 -18 5 -25 20 -25 17 0 20 -7 20 -45 l0 -45 50 0 50 0 0 70 c0
68 -1 70 -25 70 -23 0 -25 4 -25 45 0 41 -2 45 -25 45 -20 0 -25 5 -25 25 0
18 -5 25 -20 25 -15 0 -20 7 -20 25 0 20 -5 25 -25 25 -20 0 -25 -5 -25 -25 0
-20 -5 -25 -25 -25 -20 0 -25 5 -25 25 0 23 -4 25 -45 25 -38 0 -45 3 -45 20
0 19 -7 20 -95 20 -95 0 -95 0 -95 25 l0 25 -255 0 -255 0 0 -25 0 -25 -115 0
c-108 0 -115 -1 -115 -20 0 -17 -7 -20 -50 -20 -47 0 -50 -2 -50 -25 0 -23 -4
-25 -45 -25 -41 0 -45 -2 -45 -25 0 -23 -4 -25 -45 -25 -41 0 -45 2 -45 25 0
18 5 25 20 25 15 0 20 7 20 25 0 20 5 25 25 25 18 0 25 5 25 20 0 15 7 20 25
20 20 0 25 5 25 25 0 18 5 25 20 25 15 0 20 7 20 25 0 20 5 25 25 25 18 0 25
5 25 20 0 17 7 20 45 20 41 0 45 2 45 25 0 24 2 25 70 25 68 0 70 1 70 25 l0
25 210 0 210 0 0 -25 c0 -25 0 -25 95 -25 95 0 95 0 95 -25 0 -23 4 -25 45
-25 38 0 45 -3 45 -20 0 -17 7 -20 50 -20 47 0 50 -2 50 -25 0 -18 5 -25 20
-25 15 0 20 -7 20 -25 0 -20 5 -25 25 -25 20 0 25 5 25 25 0 20 -5 25 -25 25
-20 0 -25 5 -25 25 0 18 -5 25 -20 25 -13 0 -20 7 -20 20 0 17 -7 20 -50 20
-47 0 -50 2 -50 25 0 23 -4 25 -45 25 -41 0 -45 2 -45 25 0 23 -4 25 -45 25
l-45 0 0 90 c0 89 0 90 -25 90 -20 0 -25 5 -25 25 0 20 -5 25 -25 25 -23 0
-25 4 -25 45 0 38 -3 45 -20 45 -15 0 -20 7 -20 25 0 23 -3 25 -50 25 -47 0
-50 2 -50 25 0 24 -2 25 -70 25 -68 0 -70 -1 -70 -25z"
                      />
                      <path
                        d="M2730 4965 l0 -25 -280 0 -280 0 0 -25 c0 -23 -4 -25 -45 -25 -38 0
-45 -3 -45 -20 0 -15 -7 -20 -25 -20 -20 0 -25 -5 -25 -25 0 -20 -5 -25 -25
-25 -20 0 -25 -5 -25 -25 0 -18 -5 -25 -20 -25 -17 0 -20 -7 -20 -45 0 -41 -2
-45 -25 -45 -20 0 -25 -5 -25 -25 0 -23 -4 -25 -45 -25 -41 0 -45 2 -45 25 0
20 -5 25 -25 25 -20 0 -25 5 -25 25 0 23 -4 25 -45 25 -38 0 -45 3 -45 20 0
17 -7 20 -50 20 -47 0 -50 2 -50 25 0 24 -2 25 -70 25 -68 0 -70 1 -70 25 l0
25 -230 0 -230 0 0 -25 c0 -24 -2 -25 -70 -25 -68 0 -70 -1 -70 -25 0 -23 -3
-25 -50 -25 -43 0 -50 -3 -50 -20 0 -13 -7 -20 -20 -20 -17 0 -20 -7 -20 -50
0 -43 3 -50 20 -50 13 0 20 -7 20 -20 0 -15 7 -20 25 -20 20 0 25 -5 25 -25 0
-20 5 -25 25 -25 23 0 25 -4 25 -45 0 -38 3 -45 20 -45 17 0 20 -7 20 -50 0
-47 2 -50 25 -50 23 0 25 -4 25 -45 0 -41 2 -45 25 -45 23 0 25 -4 25 -45 0
-38 3 -45 20 -45 17 0 20 -7 20 -50 0 -47 2 -50 25 -50 24 0 25 -2 25 -70 0
-68 1 -70 25 -70 24 0 25 -2 25 -70 0 -63 2 -70 20 -70 17 0 20 -7 20 -45 0
-41 2 -45 25 -45 23 0 25 -4 25 -45 0 -41 2 -45 25 -45 20 0 25 -5 25 -25 0
-18 5 -25 20 -25 15 0 20 -7 20 -25 0 -20 5 -25 25 -25 18 0 25 -5 25 -20 0
-17 7 -20 45 -20 41 0 45 -2 45 -25 0 -23 3 -25 50 -25 47 0 50 -2 50 -25 0
-24 2 -25 70 -25 63 0 70 -2 70 -20 0 -17 7 -20 45 -20 38 0 45 3 45 20 0 15
7 20 25 20 20 0 25 5 25 25 0 18 5 25 20 25 15 0 20 7 20 25 0 20 5 25 25 25
18 0 25 5 25 20 0 15 7 20 25 20 20 0 25 5 25 25 0 18 5 25 20 25 15 0 20 7
20 25 0 20 5 25 25 25 20 0 25 -5 25 -25 0 -20 5 -25 25 -25 20 0 25 -5 25
-25 0 -18 5 -25 20 -25 13 0 20 -7 20 -20 0 -15 7 -20 25 -20 23 0 25 -3 25
-50 0 -47 2 -50 25 -50 18 0 25 -5 25 -20 0 -13 7 -20 20 -20 15 0 20 -7 20
-25 0 -20 5 -25 25 -25 23 0 25 -4 25 -45 0 -41 2 -45 25 -45 23 0 25 -3 25
-50 0 -43 3 -50 20 -50 17 0 20 -7 20 -45 0 -41 2 -45 25 -45 20 0 25 -5 25
-25 0 -20 5 -25 25 -25 23 0 25 -4 25 -45 0 -38 3 -45 20 -45 15 0 20 -7 20
-25 0 -20 5 -25 25 -25 18 0 25 -5 25 -20 0 -15 7 -20 25 -20 20 0 25 -5 25
-25 0 -18 5 -25 20 -25 15 0 20 -7 20 -25 0 -20 5 -25 25 -25 18 0 25 -5 25
-20 0 -15 7 -20 25 -20 20 0 25 -5 25 -25 0 -23 4 -25 45 -25 41 0 45 -2 45
-25 0 -23 4 -25 45 -25 38 0 45 -3 45 -20 0 -17 7 -20 50 -20 47 0 50 -2 50
-25 0 -25 1 -25 90 -25 89 0 90 0 90 -25 l0 -25 140 0 140 0 0 25 c0 25 0 25
95 25 95 0 95 0 95 25 0 24 2 25 70 25 63 0 70 2 70 20 0 17 7 20 45 20 41 0
45 2 45 25 0 23 3 25 50 25 47 0 50 2 50 25 0 18 5 25 20 25 13 0 20 7 20 20
0 15 7 20 25 20 20 0 25 5 25 25 0 20 5 25 25 25 23 0 25 4 25 45 0 38 3 45
20 45 17 0 20 7 20 50 0 47 2 50 25 50 l25 0 0 185 0 185 -25 0 c-23 0 -25 4
-25 45 0 38 -3 45 -20 45 -15 0 -20 7 -20 25 0 23 -3 25 -50 25 -47 0 -50 2
-50 25 0 23 -4 25 -45 25 -41 0 -45 -2 -45 -25 0 -20 -5 -25 -25 -25 -24 0
-25 -2 -25 -70 0 -68 1 -70 25 -70 l25 0 0 -115 0 -115 -25 0 c-23 0 -25 -3
-25 -50 0 -43 -3 -50 -20 -50 -13 0 -20 -7 -20 -20 0 -17 -7 -20 -50 -20 -47
0 -50 -2 -50 -25 0 -23 -4 -25 -45 -25 -41 0 -45 -2 -45 -25 0 -25 0 -25 -95
-25 -95 0 -95 0 -95 25 0 23 -4 25 -45 25 -41 0 -45 2 -45 25 0 23 -4 25 -45
25 -38 0 -45 3 -45 20 0 15 -7 20 -25 20 -20 0 -25 5 -25 25 0 20 -5 25 -25
25 -24 0 -25 2 -25 70 0 63 -2 70 -20 70 -19 0 -20 7 -20 210 l0 210 45 0 c41
0 45 -2 45 -25 0 -20 5 -25 25 -25 18 0 25 -5 25 -20 0 -13 7 -20 20 -20 15 0
20 -7 20 -25 0 -20 5 -25 25 -25 23 0 25 -4 25 -45 0 -41 2 -45 25 -45 23 0
25 -3 25 -50 0 -43 3 -50 20 -50 15 0 20 7 20 25 0 20 5 25 25 25 20 0 25 5
25 25 0 23 4 25 45 25 38 0 45 3 45 20 0 15 7 20 25 20 20 0 25 5 25 25 0 23
4 25 45 25 41 0 45 2 45 25 0 23 3 25 50 25 43 0 50 3 50 20 0 13 7 20 20 20
15 0 20 7 20 25 0 20 5 25 25 25 20 0 25 5 25 25 0 20 5 25 25 25 18 0 25 5
25 20 0 13 7 20 20 20 18 0 20 7 20 70 0 68 1 70 25 70 23 0 25 3 25 50 0 47
2 50 25 50 24 0 25 2 25 70 0 63 2 70 20 70 18 0 20 7 20 70 0 68 1 70 25 70
23 0 25 4 25 45 0 41 2 45 25 45 23 0 25 4 25 45 0 38 3 45 20 45 15 0 20 7
20 25 0 20 5 25 25 25 20 0 25 5 25 25 0 20 5 25 25 25 23 0 25 4 25 45 0 38
3 45 20 45 15 0 20 7 20 25 0 20 5 25 25 25 18 0 25 5 25 20 0 15 7 20 25 20
23 0 25 3 25 50 l0 50 -50 0 c-43 0 -50 3 -50 20 0 17 -7 20 -45 20 -41 0 -45
2 -45 25 0 24 -2 25 -70 25 -68 0 -70 1 -70 25 l0 25 -235 0 -235 0 0 -25 c0
-24 -2 -25 -70 -25 -68 0 -70 -1 -70 -25 0 -23 -4 -25 -45 -25 -38 0 -45 -3
-45 -20 0 -15 -7 -20 -25 -20 -20 0 -25 -5 -25 -25 0 -18 -5 -25 -20 -25 -15
0 -20 -7 -20 -25 0 -20 -5 -25 -25 -25 -20 0 -25 5 -25 25 0 20 -5 25 -25 25
-20 0 -25 5 -25 25 0 18 -5 25 -20 25 -13 0 -20 7 -20 20 0 15 -7 20 -25 20
-20 0 -25 5 -25 25 0 20 -5 25 -25 25 -20 0 -25 5 -25 25 0 18 -5 25 -20 25
-13 0 -20 7 -20 20 0 15 -7 20 -25 20 -20 0 -25 5 -25 25 0 23 -4 25 -45 25
-41 0 -45 2 -45 25 l0 25 -165 0 -165 0 0 -25z m-330 -95 c0 -19 7 -20 95 -20
95 0 95 0 95 -25 0 -20 5 -25 25 -25 20 0 25 5 25 25 0 23 4 25 45 25 38 0 45
3 45 20 0 19 7 20 185 20 178 0 185 -1 185 -20 0 -15 7 -20 25 -20 20 0 25 -5
25 -25 0 -20 5 -25 25 -25 20 0 25 -5 25 -25 0 -18 5 -25 20 -25 13 0 20 -7
20 -20 0 -15 7 -20 25 -20 20 0 25 -5 25 -25 0 -20 5 -25 25 -25 23 0 25 -4
25 -45 0 -38 3 -45 20 -45 19 0 20 -7 20 -140 0 -133 -1 -140 -20 -140 -19 0
-20 -7 -20 -190 l0 -190 -25 0 c-24 0 -25 -2 -25 -70 0 -68 -1 -70 -25 -70
-23 0 -25 -4 -25 -45 0 -38 -3 -45 -20 -45 -17 0 -20 -7 -20 -45 0 -41 -2 -45
-25 -45 -24 0 -25 -2 -25 -70 0 -68 -1 -70 -25 -70 l-25 0 0 -140 0 -140 25 0
c25 0 25 0 25 -95 0 -95 0 -95 25 -95 20 0 25 -5 25 -25 0 -18 5 -25 20 -25
13 0 20 -7 20 -20 0 -15 7 -20 25 -20 20 0 25 -5 25 -25 0 -20 5 -25 25 -25
20 0 25 -5 25 -25 0 -23 4 -25 45 -25 38 0 45 -3 45 -20 0 -19 7 -20 165 -20
158 0 165 1 165 20 0 17 7 20 45 20 41 0 45 2 45 25 0 23 4 25 45 25 41 0 45
2 45 25 0 20 5 25 25 25 18 0 25 5 25 20 0 15 7 20 25 20 24 0 25 2 25 70 0
63 2 70 20 70 18 0 20 7 20 70 0 63 -2 70 -20 70 -17 0 -20 7 -20 50 0 47 -2
50 -25 50 -18 0 -25 5 -25 20 0 18 7 20 70 20 63 0 70 -2 70 -20 0 -15 7 -20
25 -20 24 0 25 -2 25 -70 0 -63 2 -70 20 -70 19 0 20 -7 20 -95 0 -88 -1 -95
-20 -95 -17 0 -20 -7 -20 -45 0 -41 -2 -45 -25 -45 -23 0 -25 -3 -25 -50 0
-47 -2 -50 -25 -50 -18 0 -25 -5 -25 -20 0 -13 -7 -20 -20 -20 -15 0 -20 -7
-20 -25 0 -20 -5 -25 -25 -25 -20 0 -25 -5 -25 -25 0 -20 -5 -25 -25 -25 -18
0 -25 -5 -25 -20 0 -17 -7 -20 -45 -20 -41 0 -45 -2 -45 -25 0 -24 -2 -25 -70
-25 -68 0 -70 -1 -70 -25 0 -25 0 -25 -95 -25 -88 0 -95 -1 -95 -20 0 -19 -7
-20 -140 -20 -133 0 -140 1 -140 20 0 19 -7 20 -90 20 -89 0 -90 0 -90 25 0
23 -3 25 -50 25 -47 0 -50 2 -50 25 0 23 -4 25 -45 25 -38 0 -45 3 -45 20 0
15 -7 20 -25 20 -20 0 -25 5 -25 25 0 18 -5 25 -20 25 -15 0 -20 7 -20 25 0
20 -5 25 -25 25 -18 0 -25 5 -25 20 0 15 -7 20 -25 20 -20 0 -25 5 -25 25 0
18 -5 25 -20 25 -15 0 -20 7 -20 25 0 20 -5 25 -25 25 -18 0 -25 5 -25 20 0
15 -7 20 -25 20 -23 0 -25 3 -25 50 0 43 -3 50 -20 50 -13 0 -20 7 -20 20 0
15 -7 20 -25 20 -23 0 -25 3 -25 50 0 47 -2 50 -25 50 -23 0 -25 4 -25 45 0
38 -3 45 -20 45 -18 0 -20 7 -20 70 0 68 -1 70 -25 70 -23 0 -25 4 -25 45 0
41 -2 45 -25 45 -18 0 -25 -5 -25 -20 0 -13 -7 -20 -20 -20 -13 0 -20 7 -20
20 0 15 -7 20 -25 20 -20 0 -25 5 -25 25 0 20 -5 25 -25 25 -23 0 -25 4 -25
45 0 38 -3 45 -20 45 -15 0 -20 7 -20 25 0 20 -5 25 -25 25 -23 0 -25 4 -25
45 0 41 -2 45 -25 45 -23 0 -25 3 -25 50 0 43 -3 50 -20 50 -18 0 -20 7 -20
70 0 68 -1 70 -25 70 l-25 0 0 255 0 255 25 0 c23 0 25 4 25 45 0 38 3 45 20
45 17 0 20 7 20 50 0 47 2 50 25 50 18 0 25 5 25 20 0 15 7 20 25 20 20 0 25
5 25 25 0 23 4 25 45 25 41 0 45 2 45 25 0 23 4 25 45 25 38 0 45 3 45 20 0
18 7 20 70 20 63 0 70 -2 70 -20z m-980 -140 c0 -18 7 -20 70 -20 68 0 70 -1
70 -25 0 -23 3 -25 50 -25 47 0 50 -2 50 -25 0 -18 5 -25 20 -25 13 0 20 -7
20 -20 0 -15 7 -20 25 -20 20 0 25 -5 25 -25 0 -20 5 -25 25 -25 20 0 25 -5
25 -25 0 -18 5 -25 20 -25 18 0 20 -7 20 -70 0 -63 -2 -70 -20 -70 -19 0 -20
-7 -20 -90 0 -83 1 -90 20 -90 19 0 20 -7 20 -120 l0 -120 25 0 c23 0 25 -4
25 -45 0 -41 2 -45 25 -45 24 0 25 -2 25 -70 0 -63 2 -70 20 -70 15 0 20 -7
20 -25 0 -18 -5 -25 -20 -25 -13 0 -20 -7 -20 -20 0 -15 -7 -20 -25 -20 -20 0
-25 -5 -25 -25 0 -20 -5 -25 -25 -25 -20 0 -25 -5 -25 -25 0 -18 -5 -25 -20
-25 -13 0 -20 -7 -20 -20 0 -15 -7 -20 -25 -20 -20 0 -25 -5 -25 -25 0 -24 -2
-25 -70 -25 -68 0 -70 1 -70 25 0 23 -4 25 -45 25 -38 0 -45 3 -45 20 0 17 -7
20 -50 20 -47 0 -50 2 -50 25 0 18 -5 25 -20 25 -15 0 -20 7 -20 25 0 20 -5
25 -25 25 -18 0 -25 5 -25 20 0 15 -7 20 -25 20 -23 0 -25 3 -25 50 0 43 -3
50 -20 50 -17 0 -20 7 -20 45 0 41 -2 45 -25 45 -24 0 -25 2 -25 70 0 68 -1
70 -25 70 -24 0 -25 2 -25 70 0 63 -2 70 -20 70 -17 0 -20 7 -20 45 0 41 -2
45 -25 45 -23 0 -25 3 -25 50 0 47 -2 50 -25 50 -23 0 -25 4 -25 45 0 38 -3
45 -20 45 -17 0 -20 7 -20 45 0 41 -2 45 -25 45 -20 0 -25 5 -25 25 0 20 -5
25 -25 25 -20 0 -25 5 -25 25 0 18 -5 25 -20 25 -17 0 -20 7 -20 45 0 38 3 45
20 45 15 0 20 7 20 25 0 24 2 25 70 25 63 0 70 2 70 20 0 19 7 20 210 20 203
0 210 -1 210 -20z m2760 0 c0 -19 7 -20 90 -20 89 0 90 0 90 -25 0 -23 3 -25
50 -25 47 0 50 -2 50 -25 0 -20 -5 -25 -25 -25 -18 0 -25 -5 -25 -20 0 -15 -7
-20 -25 -20 -23 0 -25 -3 -25 -50 0 -43 -3 -50 -20 -50 -13 0 -20 -7 -20 -20
0 -15 -7 -20 -25 -20 -23 0 -25 -3 -25 -50 0 -47 -2 -50 -25 -50 -23 0 -25 -4
-25 -45 0 -38 -3 -45 -20 -45 -17 0 -20 -7 -20 -45 0 -41 -2 -45 -25 -45 -23
0 -25 -3 -25 -50 0 -47 -2 -50 -25 -50 -24 0 -25 -2 -25 -70 0 -63 -2 -70 -20
-70 -18 0 -20 -7 -20 -70 0 -68 -1 -70 -25 -70 -23 0 -25 -4 -25 -45 0 -41 -2
-45 -25 -45 -20 0 -25 -5 -25 -25 0 -18 -5 -25 -20 -25 -13 0 -20 -7 -20 -20
0 -15 -7 -20 -25 -20 -20 0 -25 -5 -25 -25 0 -20 -5 -25 -25 -25 -20 0 -25 -5
-25 -25 0 -23 -4 -25 -45 -25 -38 0 -45 -3 -45 -20 0 -17 -7 -20 -45 -20 -41
0 -45 -2 -45 -25 0 -20 -5 -25 -25 -25 -20 0 -25 -5 -25 -25 0 -23 -4 -25 -45
-25 -41 0 -45 2 -45 25 0 20 -5 25 -25 25 -23 0 -25 4 -25 45 0 41 -2 45 -25
45 -20 0 -25 5 -25 25 0 18 -5 25 -20 25 -17 0 -20 7 -20 45 0 41 -2 45 -25
45 -20 0 -25 5 -25 25 0 20 5 25 25 25 25 0 25 0 25 95 0 88 1 95 20 95 19 0
20 7 20 140 l0 140 25 0 25 0 0 160 0 160 25 0 c23 0 25 3 25 50 0 43 3 50 20
50 13 0 20 7 20 20 0 17 7 20 50 20 47 0 50 2 50 25 0 23 4 25 45 25 41 0 45
2 45 25 0 24 2 25 70 25 63 0 70 2 70 20 0 19 7 20 165 20 158 0 165 -1 165
-20z"
                      />
                      <path
                        d="M2500 4495 c0 -18 5 -25 20 -25 15 0 20 7 20 25 0 18 -5 25 -20 25
-15 0 -20 -7 -20 -25z"
                      />
                      <path
                        d="M2730 4495 c0 -20 5 -25 25 -25 20 0 25 5 25 25 0 20 -5 25 -25 25
-20 0 -25 -5 -25 -25z"
                      />
                      <path
                        d="M2500 4380 l0 -50 45 0 c38 0 45 -3 45 -20 0 -19 7 -20 115 -20 l115
0 0 45 0 45 -140 0 -140 0 0 25 c0 18 -5 25 -20 25 -17 0 -20 -7 -20 -50z"
                      />
                      <path
                        d="M2030 4355 c0 -20 5 -25 25 -25 18 0 25 -5 25 -20 0 -13 7 -20 20
-20 15 0 20 -7 20 -25 0 -20 5 -25 25 -25 20 0 25 -5 25 -25 0 -20 5 -25 25
-25 18 0 25 -5 25 -20 0 -17 -7 -20 -50 -20 -43 0 -50 3 -50 20 0 18 -7 20
-70 20 -63 0 -70 -2 -70 -20 0 -15 7 -20 25 -20 20 0 25 -5 25 -25 0 -20 5
-25 25 -25 20 0 25 -5 25 -25 0 -23 4 -25 45 -25 38 0 45 -3 45 -20 0 -17 7
-20 45 -20 l45 0 0 90 c0 83 -1 90 -20 90 -17 0 -20 7 -20 50 0 47 -2 50 -25
50 -18 0 -25 5 -25 20 0 15 -7 20 -25 20 -20 0 -25 5 -25 25 0 23 -4 25 -45
25 -41 0 -45 -2 -45 -25z"
                      />
                      <path
                        d="M3200 4355 c0 -20 -5 -25 -25 -25 -18 0 -25 -5 -25 -20 0 -15 -7 -20
-25 -20 -20 0 -25 -5 -25 -25 0 -18 -5 -25 -20 -25 -19 0 -20 -7 -20 -95 l0
-95 90 0 c89 0 90 0 90 25 0 20 5 25 25 25 24 0 25 2 25 70 l0 70 -45 0 -45 0
0 -45 0 -45 -50 0 c-43 0 -50 3 -50 20 0 15 7 20 25 20 23 0 25 3 25 50 0 47
2 50 25 50 18 0 25 5 25 20 0 17 7 20 45 20 41 0 45 2 45 25 0 23 -4 25 -45
25 -41 0 -45 -2 -45 -25z"
                      />
                      <path
                        d="M2540 4215 c0 -20 5 -25 25 -25 18 0 25 -5 25 -20 0 -19 7 -20 95
-20 88 0 95 1 95 20 0 13 7 20 20 20 15 0 20 7 20 25 0 18 -5 25 -20 25 -15 0
-20 -7 -20 -25 0 -25 0 -25 -95 -25 -95 0 -95 0 -95 25 0 20 -5 25 -25 25 -20
0 -25 -5 -25 -25z"
                      />
                      <path
                        d="M2640 3865 l0 -45 70 0 c68 0 70 1 70 25 0 23 -3 25 -50 25 -43 0
-50 3 -50 20 0 13 -7 20 -20 20 -17 0 -20 -7 -20 -45z"
                      />
                      <path
                        d="M2640 3705 c0 -20 -5 -25 -25 -25 -20 0 -25 -5 -25 -25 0 -25 0 -25
95 -25 l95 0 0 50 0 50 -70 0 c-68 0 -70 -1 -70 -25z"
                      />
                      <path
                        d="M2590 3515 c0 -20 5 -25 25 -25 18 0 25 -5 25 -20 0 -19 7 -20 90
-20 83 0 90 1 90 20 0 13 -7 20 -20 20 -15 0 -20 7 -20 25 0 25 0 25 -95 25
-95 0 -95 0 -95 -25z"
                      />
                      <path
                        d="M2680 3330 c0 -15 7 -20 25 -20 20 0 25 -5 25 -25 0 -20 5 -25 25
-25 24 0 25 -2 25 -70 0 -63 2 -70 20 -70 18 0 20 -7 20 -70 0 -68 1 -70 25
-70 23 0 25 -4 25 -45 0 -41 2 -45 25 -45 20 0 25 -5 25 -25 0 -18 5 -25 20
-25 15 0 20 -7 20 -25 0 -20 5 -25 25 -25 18 0 25 -5 25 -20 0 -17 7 -20 45
-20 41 0 45 -2 45 -25 0 -20 5 -25 25 -25 20 0 25 5 25 25 0 20 -5 25 -25 25
-18 0 -25 5 -25 20 0 13 -7 20 -20 20 -15 0 -20 7 -20 25 0 20 -5 25 -25 25
-20 0 -25 5 -25 25 0 20 -5 25 -25 25 -18 0 -25 5 -25 20 0 13 -7 20 -20 20
-17 0 -20 7 -20 50 0 47 -2 50 -25 50 -24 0 -25 2 -25 70 0 68 -1 70 -25 70
-24 0 -25 2 -25 70 0 63 -2 70 -20 70 -13 0 -20 7 -20 20 0 17 -7 20 -50 20
-43 0 -50 -3 -50 -20z"
                      />
                      <path
                        d="M3290 3235 c0 -20 5 -25 25 -25 23 0 25 -4 25 -45 l0 -45 45 0 c41 0
45 -2 45 -25 0 -20 5 -25 25 -25 18 0 25 -5 25 -20 0 -17 7 -20 45 -20 l45 0
0 45 c0 41 -2 45 -25 45 -20 0 -25 5 -25 25 0 23 -4 25 -45 25 -38 0 -45 3
-45 20 0 17 -7 20 -45 20 -41 0 -45 2 -45 25 0 20 -5 25 -25 25 -20 0 -25 -5
-25 -25z"
                      />
                      <path
                        d="M1420 3145 c0 -23 -4 -25 -45 -25 -41 0 -45 -2 -45 -25 0 -20 -5 -25
-25 -25 -23 0 -25 -4 -25 -45 0 -38 -3 -45 -20 -45 -18 0 -20 -7 -20 -70 0
-68 -1 -70 -25 -70 l-25 0 0 -185 0 -185 -25 0 c-20 0 -25 -5 -25 -25 0 -18
-5 -25 -20 -25 -19 0 -20 -7 -20 -165 0 -158 1 -165 20 -165 18 0 20 -7 20
-70 0 -68 1 -70 25 -70 23 0 25 -4 25 -45 0 -41 2 -45 25 -45 20 0 25 -5 25
-25 0 -18 5 -25 20 -25 17 0 20 -7 20 -45 0 -41 2 -45 25 -45 20 0 25 -5 25
-25 0 -20 5 -25 25 -25 18 0 25 -5 25 -20 0 -17 7 -20 45 -20 41 0 45 -2 45
-25 0 -20 5 -25 25 -25 20 0 25 -5 25 -25 0 -24 2 -25 70 -25 63 0 70 -2 70
-20 0 -18 7 -20 70 -20 68 0 70 -1 70 -25 l0 -25 230 0 230 0 0 25 c0 25 0 25
95 25 88 0 95 1 95 20 0 18 7 20 70 20 68 0 70 1 70 25 0 23 4 25 45 25 41 0
45 2 45 25 0 23 3 25 50 25 47 0 50 -2 50 -25 0 -20 -5 -25 -25 -25 -20 0 -25
-5 -25 -25 0 -23 -4 -25 -45 -25 -38 0 -45 -3 -45 -20 0 -17 -7 -20 -50 -20
-47 0 -50 -2 -50 -25 0 -18 -5 -25 -20 -25 -15 0 -20 -7 -20 -25 0 -23 -3 -25
-50 -25 -43 0 -50 -3 -50 -20 0 -13 -7 -20 -20 -20 -15 0 -20 -7 -20 -25 0
-23 -3 -25 -50 -25 -47 0 -50 -2 -50 -25 0 -18 -5 -25 -20 -25 -13 0 -20 -7
-20 -20 0 -17 -7 -20 -50 -20 -47 0 -50 -2 -50 -25 0 -18 -5 -25 -20 -25 -15
0 -20 -7 -20 -25 0 -20 -5 -25 -25 -25 -18 0 -25 -5 -25 -20 0 -17 7 -20 45
-20 38 0 45 3 45 20 0 20 7 20 890 20 l890 0 0 25 c0 24 2 25 70 25 68 0 70 1
70 25 0 23 4 25 45 25 38 0 45 3 45 20 0 17 7 20 45 20 41 0 45 2 45 25 0 20
5 25 25 25 20 0 25 5 25 25 0 23 4 25 45 25 38 0 45 3 45 20 0 15 7 20 25 20
23 0 25 3 25 50 0 47 2 50 25 50 18 0 25 5 25 20 0 13 7 20 20 20 17 0 20 7
20 50 0 47 2 50 25 50 24 0 25 2 25 70 0 68 1 70 25 70 l25 0 0 140 0 140 -25
0 c-24 0 -25 2 -25 70 0 68 -1 70 -25 70 -18 0 -25 5 -25 20 0 13 -7 20 -20
20 -17 0 -20 7 -20 50 l0 50 -50 0 c-43 0 -50 3 -50 20 0 13 -7 20 -20 20 -15
0 -20 7 -20 25 0 24 -2 25 -70 25 -68 0 -70 1 -70 25 0 25 0 25 -95 25 -95 0
-95 0 -95 -25 0 -25 0 -25 -95 -25 -95 0 -95 0 -95 -25 0 -23 -4 -25 -45 -25
-38 0 -45 -3 -45 -20 0 -17 -7 -20 -45 -20 -41 0 -45 -2 -45 -25 0 -20 -5 -25
-25 -25 -20 0 -25 -5 -25 -25 0 -20 -5 -25 -25 -25 -18 0 -25 -5 -25 -20 0
-13 -7 -20 -20 -20 -15 0 -20 -7 -20 -25 0 -20 -5 -25 -25 -25 -20 0 -25 -5
-25 -25 0 -20 -5 -25 -25 -25 -18 0 -25 -5 -25 -20 0 -17 -7 -20 -45 -20 -41
0 -45 -2 -45 -25 0 -20 -5 -25 -25 -25 -20 0 -25 -5 -25 -25 0 -18 -5 -25 -20
-25 -13 0 -20 -7 -20 -20 0 -19 -7 -20 -210 -20 -203 0 -210 1 -210 20 0 18
-7 20 -70 20 -68 0 -70 1 -70 25 0 23 -3 25 -50 25 -47 0 -50 2 -50 25 0 18
-5 25 -20 25 -13 0 -20 7 -20 20 0 15 -7 20 -25 20 -20 0 -25 5 -25 25 0 20
-5 25 -25 25 -20 0 -25 5 -25 25 0 18 -5 25 -20 25 -13 0 -20 7 -20 20 0 15
-7 20 -25 20 -20 0 -25 5 -25 25 0 20 -5 25 -25 25 -23 0 -25 4 -25 45 0 38
-3 45 -20 45 -17 0 -20 7 -20 50 0 47 -2 50 -25 50 -24 0 -25 2 -25 70 0 68
-1 70 -25 70 l-25 0 0 115 c0 108 -1 115 -20 115 -19 0 -20 -7 -20 -165 0
-158 1 -165 20 -165 18 0 20 -7 20 -70 0 -68 1 -70 25 -70 23 0 25 -4 25 -45
0 -41 2 -45 25 -45 23 0 25 -4 25 -45 0 -38 3 -45 20 -45 15 0 20 -7 20 -25 0
-20 5 -25 25 -25 20 0 25 -5 25 -25 0 -20 5 -25 25 -25 18 0 25 -5 25 -20 0
-13 7 -20 20 -20 15 0 20 -7 20 -25 0 -20 5 -25 25 -25 20 0 25 -5 25 -25 0
-23 4 -25 45 -25 38 0 45 -3 45 -20 0 -17 7 -20 50 -20 47 0 50 -2 50 -25 l0
-25 160 0 160 0 0 -25 c0 -20 5 -25 25 -25 20 0 25 5 25 25 0 23 4 25 45 25
41 0 45 -2 45 -25 0 -18 -5 -25 -20 -25 -13 0 -20 -7 -20 -20 0 -15 -7 -20
-25 -20 -20 0 -25 -5 -25 -25 0 -23 -4 -25 -45 -25 -41 0 -45 -2 -45 -25 0
-20 -5 -25 -25 -25 -18 0 -25 -5 -25 -20 0 -17 -7 -20 -45 -20 -38 0 -45 3
-45 20 0 17 -7 20 -50 20 -43 0 -50 -3 -50 -20 0 -18 -7 -20 -70 -20 -68 0
-70 -1 -70 -25 l0 -25 -115 0 -115 0 0 -25 0 -25 -210 0 -210 0 0 25 c0 25 0
25 -95 25 -95 0 -95 0 -95 25 0 23 -4 25 -45 25 -38 0 -45 3 -45 20 0 17 -7
20 -45 20 -41 0 -45 2 -45 25 0 20 -5 25 -25 25 -20 0 -25 5 -25 25 0 20 -5
25 -25 25 -18 0 -25 5 -25 20 0 13 -7 20 -20 20 -15 0 -20 7 -20 25 0 20 -5
25 -25 25 -20 0 -25 5 -25 25 0 20 -5 25 -25 25 -23 0 -25 4 -25 45 0 38 -3
45 -20 45 -17 0 -20 7 -20 45 0 41 -2 45 -25 45 -24 0 -25 2 -25 70 0 68 -1
70 -25 70 -24 0 -25 2 -25 70 0 68 1 70 25 70 23 0 25 -4 25 -45 0 -41 2 -45
25 -45 20 0 25 -5 25 -25 0 -18 5 -25 20 -25 13 0 20 -7 20 -20 0 -15 7 -20
25 -20 20 0 25 -5 25 -25 0 -20 5 -25 25 -25 20 0 25 -5 25 -25 l0 -25 185 0
185 0 0 25 c0 23 4 25 45 25 41 0 45 2 45 25 0 20 5 25 25 25 18 0 25 5 25 20
0 15 7 20 25 20 23 0 25 3 25 50 0 43 3 50 20 50 19 0 20 7 20 90 0 89 0 90
25 90 l25 0 0 140 0 140 -25 0 c-23 0 -25 3 -25 50 0 43 -3 50 -20 50 -13 0
-20 7 -20 20 0 15 -7 20 -25 20 -18 0 -25 -5 -25 -20 0 -15 -7 -20 -25 -20
-20 0 -25 -5 -25 -25 0 -18 -5 -25 -20 -25 -18 0 -20 7 -20 70 0 68 -1 70 -25
70 -20 0 -25 5 -25 25 0 20 -5 25 -25 25 -23 0 -25 4 -25 45 l0 45 -45 0 c-41
0 -45 2 -45 25 0 25 0 25 -95 25 -95 0 -95 0 -95 -25z m190 -95 c0 -15 7 -20
25 -20 20 0 25 -5 25 -25 0 -18 5 -25 20 -25 17 0 20 -7 20 -45 0 -41 2 -45
25 -45 25 0 25 0 25 -95 0 -95 0 -95 -25 -95 -20 0 -25 -5 -25 -25 0 -23 3
-25 50 -25 47 0 50 2 50 25 0 18 5 25 20 25 15 0 20 7 20 25 0 20 5 25 25 25
18 0 25 5 25 20 0 15 7 20 25 20 l25 0 0 -160 0 -160 -25 0 c-24 0 -25 -2 -25
-70 0 -68 -1 -70 -25 -70 -20 0 -25 -5 -25 -25 0 -18 -5 -25 -20 -25 -15 0
-20 -7 -20 -25 0 -23 -3 -25 -50 -25 -43 0 -50 -3 -50 -20 0 -19 -7 -20 -140
-20 -133 0 -140 1 -140 20 0 17 -7 20 -45 20 l-45 0 0 50 c0 47 -2 50 -25 50
l-25 0 0 280 0 280 25 0 c23 0 25 4 25 45 0 41 2 45 25 45 20 0 25 5 25 25 0
18 5 25 20 25 13 0 20 7 20 20 0 19 7 20 95 20 88 0 95 -1 95 -20z m2660 -745
c0 -23 4 -25 45 -25 l45 0 0 -45 c0 -41 2 -45 25 -45 20 0 25 -5 25 -25 0 -20
5 -25 25 -25 24 0 25 -2 25 -70 0 -63 2 -70 20 -70 18 0 20 -7 20 -70 0 -63
-2 -70 -20 -70 -19 0 -20 -7 -20 -95 0 -95 0 -95 -25 -95 -23 0 -25 -4 -25
-45 0 -41 -2 -45 -25 -45 -20 0 -25 -5 -25 -25 0 -18 -5 -25 -20 -25 -13 0
-20 -7 -20 -20 0 -15 -7 -20 -25 -20 -20 0 -25 -5 -25 -25 0 -20 -5 -25 -25
-25 -20 0 -25 -5 -25 -25 0 -18 -5 -25 -20 -25 -13 0 -20 -7 -20 -20 0 -17 -7
-20 -50 -20 -47 0 -50 -2 -50 -25 0 -23 -4 -25 -45 -25 -41 0 -45 -2 -45 -25
0 -24 -2 -25 -70 -25 -63 0 -70 -2 -70 -20 0 -20 -7 -20 -745 -20 -738 0 -745
0 -745 20 0 17 7 20 45 20 41 0 45 2 45 25 0 23 4 25 45 25 41 0 45 2 45 25 0
20 5 25 25 25 18 0 25 5 25 20 0 17 7 20 45 20 41 0 45 2 45 25 0 20 5 25 25
25 20 0 25 5 25 25 0 23 4 25 45 25 38 0 45 3 45 20 0 15 7 20 25 20 20 0 25
5 25 25 0 23 4 25 45 25 41 0 45 2 45 25 0 20 5 25 25 25 18 0 25 5 25 20 0
15 7 20 25 20 20 0 25 5 25 25 0 23 4 25 45 25 41 0 45 2 45 25 0 20 5 25 25
25 18 0 25 5 25 20 0 13 7 20 20 20 15 0 20 7 20 25 0 20 5 25 25 25 20 0 25
5 25 25 0 20 5 25 25 25 18 0 25 5 25 20 0 13 7 20 20 20 15 0 20 7 20 25 0
23 3 25 50 25 47 0 50 2 50 25 0 18 5 25 20 25 13 0 20 7 20 20 0 15 7 20 25
20 20 0 25 5 25 25 0 20 5 25 25 25 20 0 25 5 25 25 0 18 5 25 20 25 13 0 20
7 20 20 0 17 7 20 50 20 47 0 50 2 50 25 0 23 4 25 45 25 41 0 45 2 45 25 l0
25 210 0 210 0 0 -25z m-1960 -1120 c0 -20 -5 -25 -25 -25 -20 0 -25 5 -25 25
0 20 5 25 25 25 20 0 25 -5 25 -25z"
                      />
                      <path d="M2870 2140 l0 -50 45 0 45 0 0 50 0 50 -45 0 -45 0 0 -50z" />
                    </g>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Ganpathi Overseas</h3>
                  <p className="text-gray-400 text-sm">Printing Excellence</p>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed">
                Leading printing services provider in Lucknow with 20+ years of
                experience. We deliver quality, innovation, and reliability in
                every project.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">20+</div>
                  <div className="text-xs text-gray-400">Years</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">1K+</div>
                  <div className="text-xs text-gray-400">Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">50+</div>
                  <div className="text-xs text-gray-400">Team</div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold">Quick Links</h3>
              <ul className="space-y-4">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors flex items-center group"
                    >
                      <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold">Our Services</h3>
              <ul className="space-y-4">
                {services.map((service) => (
                  <li key={service.name}>
                    <Link
                      href={service.href}
                      className="text-gray-300 hover:text-white transition-colors flex items-center group"
                    >
                      <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold">Get In Touch</h3>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300">
                      9 Lakshampuri, Indira Nagar
                      <br />
                      Near Boothnath Metro Station
                      <br />
                      Lucknow, UP 226016.
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <a
                    href="tel:+911234567890"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    +91 965 191 1111
                  </a>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <a
                    href="mailto:info@ganpathioverseas.com"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    info@ganpathioverseas.com
                  </a>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <div className="text-gray-300">
                    <p>Mon-Sat: 9AM-6PM</p>
                    <p>Sun: Closed</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="font-semibold mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a
                    href="/coming-soon"
                    className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href="/coming-soon"
                    className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href="/coming-soon"
                    className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="/coming-soon"
                    className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              ©2025 Ganpathi Overseas. All rights reserved.
            </div>

            <div className="flex space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/sitemap"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Sitemap
              </Link>
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Award className="w-4 h-4" />
              <span>ISO 9001:2015 Certified</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
