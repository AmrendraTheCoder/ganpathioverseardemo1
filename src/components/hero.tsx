"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Printer,
  BookOpen,
  Phone,
  Sparkles,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 h-screen">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-yellow-400/5 to-blue-400/5 rounded-full blur-3xl" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400/30 rounded-full"
            initial={{
              x:
                Math.random() *
                (typeof window !== "undefined" ? window.innerWidth : 1200),
              y:
                Math.random() *
                (typeof window !== "undefined" ? window.innerHeight : 800),
            }}
            animate={{
              y: [null, -100, null],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-left max-w-xl"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex items-center gap-2 mb-6"
              >
                <Sparkles className="w-6 h-6 text-yellow-400" />
                <span className="text-yellow-400 font-medium tracking-wide uppercase text-sm">
                  Premium Printing Excellence
                </span>
              </motion.div>

              <h1 className="text-5xl sm:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
                <span className="block">Crafting</span>
                <span className="block bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 bg-clip-text text-transparent">
                  Perfection
                </span>
                <span className="block text-4xl sm:text-5xl text-gray-300 font-light">
                  in Print
                </span>
              </h1>

              <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                Transform your ideas into stunning reality with Ganpathi
                Overseas.
                <span className="text-yellow-400 font-medium">
                  25+ years
                </span>{" "}
                of printing mastery, cutting-edge technology, and unmatched
                quality.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/services"
                    className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-xl hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl"
                  >
                    Explore Services
                    <ArrowUpRight className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/contact"
                    className="group inline-flex items-center px-8 py-4 text-white bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300 text-lg font-semibold"
                  >
                    Get Quote
                    <Sparkles className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                  </Link>
                </motion.div>
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-gray-300">
                {[
                  { icon: Star, text: "Premium Quality" },
                  { icon: Check, text: "Fast Delivery" },
                  { icon: Check, text: "Best Prices" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <item.icon className="w-5 h-5 text-yellow-400" />
                    <span className="font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="relative hidden md:block"
            >
              <div className="relative">
                {/* Glowing background */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-blue-400/20 rounded-3xl blur-2xl" />

                {/* Main showcase */}
                <div className="relative bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      {
                        src: "https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=500&q=80",
                        alt: "Offset printing",
                        delay: 0,
                      },
                      {
                        src: "https://images.unsplash.com/photo-1611244419377-b0a760c19719?w=500&q=80",
                        alt: "UV printing",
                        delay: 0.1,
                      },
                      {
                        src: "https://images.unsplash.com/photo-1598537179958-687e6cc425d7?w=500&q=80",
                        alt: "Business cards",
                        delay: 0.2,
                      },
                      {
                        src: "https://images.unsplash.com/photo-1616070829624-a11213034646?w=500&q=80",
                        alt: "Large format",
                        delay: 0.3,
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 + item.delay }}
                        className="group relative aspect-square rounded-2xl overflow-hidden"
                      >
                        <Image
                          src={item.src}
                          alt={item.alt}
                          width={200}
                          height={200}
                          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Floating badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                  >
                    ✨ 5000+ Projects
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
